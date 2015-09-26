jest.dontMock('../entities');
jest.dontMock('immutable');

describe('Board', () => {
    var { Board, Coordinate, Automaton, Step } = require('../entities');
    var { List, Set, is } = require('immutable');

    it('instantiates', () => Board());
    it('blocks perimeter walls', () => {
        let board = Board({ dim: Coordinate({x: 3, y: 3}) });
        let blocked = board.getBlockedMoves();

        expect(blocked.count()).toBe(12);

        let expected =
            '0,0=>-1,0|0,0=>0,-1|0,1=>-1,1|' +
            '0,2=>-1,2|0,2=>0,3|1,0=>1,-1|' +
            '1,2=>1,3|2,0=>2,-1|2,0=>3,0|' +
            '2,1=>3,1|2,2=>2,3|2,2=>3,2'
        ;
        expect(blocked.toList().sort().join('|')).toEqual(expected);
    });
    it('blocks automaton positions', () => {
        let automaton = Automaton({
            position: Coordinate({ x: 1, y: 1 })
        });

        let board = Board({
            dim: Coordinate({x: 3, y: 3}),
            automatons: List([automaton])
        });

        let blocked = board.getBlockedMoves();

        expect(blocked.count()).toBe(16);

        let automatonSpecific = blocked.filter((entry) =>
            entry.from.x == 1 && entry.from.y == 1
        );

        expect(automatonSpecific.count()).toBe(4);

        let expected = Set([
            Step({ from: Coordinate({x: 1, y: 1}), to: Coordinate({x: 2, y: 1}) }),
            Step({ from: Coordinate({x: 1, y: 1}), to: Coordinate({x: 0, y: 1}) }),
            Step({ from: Coordinate({x: 1, y: 1}), to: Coordinate({x: 1, y: 2}) }),
            Step({ from: Coordinate({x: 1, y: 1}), to: Coordinate({x: 1, y: 0}) })
        ]);

        expect(is(expected, automatonSpecific)).toBe(true);
    });
    it('blocks all automaton positions', () => {
        let automatons = List([
            Automaton({position: Coordinate({ x: 1, y: 1 })}),
            Automaton({position: Coordinate({ x: 2, y: 2 })})
        ]);

        let board = Board({
            dim: Coordinate({x: 4, y: 4}),
            automatons
        });

        let blocked = board.getBlockedMoves();

        expect(blocked.count()).toBe(16 + 4 + 4);
    });
    it('dedupes blocks', () => {
        let automatons = List([
            Automaton({position: Coordinate({ x: 0, y: 0 })})
        ]);

        let board = Board({
            dim: Coordinate({x: 3, y: 3}),
            automatons
        });

        let blocked = board.getBlockedMoves();

        expect(blocked.count()).toBe(12 + 2);
    });

});

