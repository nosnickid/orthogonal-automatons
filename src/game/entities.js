import { Record, Set, List, Range, is as immutableIs } from 'immutable';


let Coordinate = Record({
    x: null,
    y: null
});

let Automaton = Record({
    position: null,
    color: null
});

/**
 * A normalized encoding of a step.
 *
 * Used as steps an automaton is trying to make in a move,
 * or as a step that is blocked because of a wall / automaton.
 */
let Step = Record({
    from: null,
    to: null
});

/**
 * A new position that an automaton move to.
 */
let Move = Record({
    automaton: null,
    nextPosition: null
});

/**
 * A location that an automaton is trying to get to.
 */
let Target = Record({
    automaton: null,
    position: null,
    orientation: null
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
    walls: List(),
    targets: List()
});

Object.assign(Board.prototype, {
    getBlockedSteps: function () {
        const maxX = this.dim.x - 1;
        const maxY = this.dim.y - 1;

        const targetOrientationMap = [
            [ -1,  0 ],
            [  0, -1 ],
            [  1,  0 ],
            [  0,  1     ]
        ];

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
                    encodeStep(x, y,  1,  0),
                    encodeStep(x, y, -1,  0),
                    encodeStep(x, y,  0,  1),
                    encodeStep(x, y,  0, -1)
                ]
            }),
            this.walls,
            this.targets.flatMap((target) => {
                const d0 = targetOrientationMap[target.orientation];
                const d1 = targetOrientationMap[(target.orientation + 1) % targetOrientationMap.length];
                return [
                    encodeStep(target.position.x, target.position.y, d0[0], d0[1]),
                    encodeStep(target.position.x, target.position.y, d1[0], d1[1])
                ];
            })
        )
    },
    getAvailableMoves: function () {
        let allBlockedSteps = this.getBlockedSteps();

        const maxX = this.dim.x - 1;
        const maxY = this.dim.y - 1;

        return this.automatons.flatMap((automaton) => {
            const blockedSteps = allBlockedSteps.filter((step) =>
                // exclude self blocking moves
                (!immutableIs(step.from, automaton.position)
                && !immutableIs(step.to, automaton.position))
                // unless they're border moves.
                || (
                    step.from.x == -1 || step.from.y == -1
                    || step.to.x > maxX || step.to.y > maxY
                )
            );

            return StepDirections.map((d) => {
                let position = automaton.position;
                let step = encodeStep(position.x, position.y, d.x, d.y);

                while(!blockedSteps.has(step)) {
                    position = Coordinate({
                        x: position.x + d.x,
                        y: position.y + d.y
                    });
                    step = encodeStep(position.x, position.y, d.x, d.y);
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

/**
 * Encode steps in an 'always increasing position' manner, to make comparison
 * simple.
 */
export function encodeStep(x, y, dx, dy) {
    if (dx < 0 || dy < 0) {
        return Step({
            from: Coordinate({x: x + dx, y: y + dy}),
            to: Coordinate({x: x, y: y}),
        });
    } else {
        return Step({
            from: Coordinate({x: x, y: y}),
            to: Coordinate({x: x + dx, y: y + dy}),
        });
    }
}

const StepDirections = List([
    Coordinate({x: 1, y: 0}),
    Coordinate({x: -1, y: 0}),
    Coordinate({x: 0, y: 1}),
    Coordinate({x: 0, y: -1})
]);

export {
    Coordinate, Automaton, Board, Step, Move, Target,

    StepDirections
};