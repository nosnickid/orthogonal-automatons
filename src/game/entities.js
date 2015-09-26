import { Record, Set, List, Range } from 'immutable';

let Coordinate = Record({
    x: null,
    y: null
});

let Automaton = Record({
    position: null,
    color: null
});

let Step = Record({
    from: null,
    to: null
});

Object.assign(Step.prototype, {
    toString: function() {
        return `${this.from.x},${this.from.y}=>${this.to.x},${this.to.y}`;
    }
});

let Board = Record({
    id: null,

    dim: null,

    automatons: List(),
    walls: List()
});

Object.assign(Board.prototype, {
    getBlockedMoves: function () {
        const maxX = this.dim.x - 1;
        const maxY = this.dim.y - 1;

        return Set().union(
            // Out the top/bottom
            Range(0, this.dim.x).flatMap((x) => {
                return [
                    encodeStep(x, 0, x, -1),
                    encodeStep(x, maxY, x, maxY + 1)
                ];
            }),
            // Out the left, right
            Range(0, this.dim.y).flatMap((y) => {
                return [
                    encodeStep(0, y, -1, y),
                    encodeStep(maxX, y, maxX + 1, y)
                ];
            }),
            this.automatons.toSeq().flatMap((automaton) => {
                const { x, y } = automaton.position;

                return [
                    encodeStep(x, y, x + 1, y),
                    encodeStep(x, y, x - 1, y),
                    encodeStep(x, y, x, y + 1),
                    encodeStep(x, y, x, y - 1)
                ]
            })
        )
    },
    getAvailableMoves: function () {
        let blockedMoves = this.getBlockedMoves();

        let moves = List();
        this.automatons.forEach((automaton) => {

        });

        return moves;
    }
});

export function encodeStep(x1, y1, x2, y2) {
    return Step({
        from: Coordinate({x: x1, y: y1}),
        to: Coordinate({x: x2, y: y2})
    });
}


export {
    Coordinate, Automaton, Board, Step
};