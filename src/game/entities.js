import { Record, Set, List, Range } from 'immutable';

let Coordinate = Record({
    x: null,
    y: null
});

let Automaton = Record({
    position: null,
    color: null
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
    return `${x1},${y1}=>${x2},${y2}`;
}


export {
    Coordinate, Automaton, Board
};