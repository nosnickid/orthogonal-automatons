import { Record, Set, List, Range, is as immutableIs } from 'immutable';

let Coordinate = Record({
    x: null,
    y: null
});

let Automaton = Record({
    position: null,
    color: null
});

let Step = Record({
    automaton: null,
    from: null,
    to: null
});

let Move = Record({
    automaton: null,
    nextPosition: null
});

Object.assign(Step.prototype, {
    toString: function() {
        return `${this.from.x},${this.from.y}=>${this.to.x},${this.to.y}`;
    }
});

let Board = Record({
    id: null,
    seed: null,

    dim: null,

    automatons: List(),
    walls: List()
});

Object.assign(Board.prototype, {
    getBlockedSteps: function () {
        const maxX = this.dim.x - 1;
        const maxY = this.dim.y - 1;

        return Set().union(
            // Out the top/bottom
            Range(0, this.dim.x).flatMap((x) => {
                return [
                    encodeStep(x,    0, 0, -1),
                    encodeStep(x, maxY, 0,  1)
                ];
            }),
            // Out the left, right
            Range(0, this.dim.y).flatMap((y) => {
                return [
                    encodeStep(0,    y, -1, 0),
                    encodeStep(maxX, y,  1, 0)
                ];
            }),
            this.automatons.flatMap((automaton) => {
                const { x, y } = automaton.position;

                return [
                    encodeStep(x, y,  1,  0, automaton),
                    encodeStep(x, y, -1,  0, automaton),
                    encodeStep(x, y,  0,  1, automaton),
                    encodeStep(x, y,  0, -1, automaton)
                ]
            }).filter((entry) =>
                // ditch entries on existing perimeter walls.
                entry.from.x > -1 && entry.from.y > -1
                && entry.to.x <= maxX && entry.to.y <= maxY
            )
        )
    },
    getAvailableMoves: function () {
        let allBlockedSteps = this.getBlockedSteps();

        const directions = List([
            [ 1, 0 ],
            [ -1, 0 ],
            [ 0, 1 ],
            [ 0, -1 ]
        ]);

        return this.automatons.flatMap((automaton) => {
            const blockedSteps = allBlockedSteps.filter(
                (step) => step.automaton != automaton
            ).map((step) => step.set('automaton', undefined));

            return directions.map(([dx, dy]) => {
                let position = automaton.position;
                let step = encodeStep(position.x, position.y, dx, dy);

                while(!blockedSteps.has(step)) {
                    position = Coordinate({
                        x: position.x + dx,
                        y: position.y + dy
                    });
                    step = encodeStep(position.x, position.y, dx, dy);
                }

                if (!immutableIs(position, automaton.position)) {
                    return Move({
                        automaton, nextPosition: position
                    })
                } else {
                    return false;
                }
            });
        }).filter((move) => !!move);
    }
});

export function encodeStep(x, y, dx, dy, automaton) {
    if (dx < 0 || dy < 0) {
        return Step({
            from: Coordinate({x: x + dx, y: y + dy}),
            to: Coordinate({x: x, y: y}),
            automaton
        });
    } else {
        return Step({
            from: Coordinate({x: x, y: y}),
            to: Coordinate({x: x + dx, y: y + dy}),
            automaton
        });
    }
}


export {
    Coordinate, Automaton, Board, Step, Move
};