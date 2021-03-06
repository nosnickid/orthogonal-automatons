jest.dontMock('../entities');
jest.dontMock('immutable');

describe('Board', () => {
    var { Board, Coordinate, Automaton, Step, Move, Target } = require('../entities');
    var { List, Set, is } = require('immutable');

    it('instantiates', () => Board());
    it('blocks perimeter walls', () => {
        let board = Board({ dim: Coordinate({x: 3, y: 3}) });
        let blocked = board.getBlockedSteps();

        expect(blocked.count()).toBe(12);

        let expected =
            '-1,0=>0,0|-1,1=>0,1|-1,2=>0,2|' +
            '0,-1=>0,0|0,2=>0,3|1,-1=>1,0|' +
            '1,2=>1,3|2,-1=>2,0|2,0=>3,0|' +
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

        let blocked = board.getBlockedSteps();

        expect(blocked.count()).toBe(16);

        let automatonSpecific = blocked.filter(
            (entry) => entry.from.equals(automaton.position) || entry.to.equals(automaton.position)
        );

        expect(automatonSpecific.count()).toBe(4);

        let expected = Set([
            Step({ from: Coordinate({x: 1, y: 1}), to: Coordinate({x: 2, y: 1}) }),
            Step({ to: Coordinate({x: 1, y: 1}), from: Coordinate({x: 0, y: 1}) }),
            Step({ from: Coordinate({x: 1, y: 1}), to: Coordinate({x: 1, y: 2}) }),
            Step({ to: Coordinate({x: 1, y: 1}), from: Coordinate({x: 1, y: 0}) })
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

        let blocked = board.getBlockedSteps();

        expect(blocked.count()).toBe(16 + 4 + 4);
    });

    it('blocks target positions', () => {
        let target = Target({
            position: Coordinate({ x: 1, y: 1 }),
            orientation: 0
        });

        let board = Board({
            dim: Coordinate({x: 3, y: 3}),
            targets: List([target])
        });

        let blocked = board.getBlockedSteps();

        expect(blocked.count()).toBe(14);

        let targetSpecific = blocked.filter(
            (entry) => entry.from.equals(target.position) || entry.to.equals(target.position)
        );

        expect(targetSpecific.count()).toBe(2);

        let expected = Set([
            Step({ from: Coordinate({x: 0, y: 1}), to: Coordinate({x: 1, y: 1}) }),
            Step({ from: Coordinate({x: 1, y: 0}), to: Coordinate({x: 1, y: 1}) })
        ]);

        expect(is(expected, targetSpecific)).toBe(true);
    });

    it('blocks target orientation 3', () => {
        let target = Target({
            position: Coordinate({ x: 1, y: 1 }),
            orientation: 3
        });

        let board = Board({
            dim: Coordinate({x: 3, y: 3}),
            targets: List([target])
        });

        let blocked = board.getBlockedSteps();

        expect(blocked.count()).toBe(14);

        let targetSpecific = blocked.filter(
            (entry) => entry.from.equals(target.position) || entry.to.equals(target.position)
        );

        expect(targetSpecific.count()).toBe(2);

        let expected = Set([
            Step({ from: Coordinate({x: 1, y: 1}), to: Coordinate({x: 1, y: 2}) }),
            Step({ from: Coordinate({x: 0, y: 1}), to: Coordinate({x: 1, y: 1}) })
        ]);


        expect(is(expected, targetSpecific)).toBe(true);
    });

    it('dedupes blocks', () => {
        let automatons = List([
            Automaton({position: Coordinate({ x: 0, y: 0 })})
        ]);

        let board = Board({
            dim: Coordinate({x: 3, y: 3}),
            automatons
        });

        let blocked = board.getBlockedSteps();

        // expect the 12 usuals, plus two each the non-corner automatons
        expect(blocked.count()).toBe(12 + 2);
    });

    it('generates all 4 direction moves', () => {
        const automaton = Automaton({position: Coordinate({ x: 2, y: 2 })});
        const automatons = List([automaton]);

        let board = Board({
            dim: Coordinate({x: 5, y: 5}),
            automatons
        });

        let moves = board.getAvailableMoves();

        expect(moves.count()).toBe(4);

        let expected = List([
            Move({automaton, nextPosition: Coordinate({x: 4, y: 2})}),
            Move({automaton, nextPosition: Coordinate({x: 0, y: 2})}),
            Move({automaton, nextPosition: Coordinate({x: 2, y: 4})}),
            Move({automaton, nextPosition: Coordinate({x: 2, y: 0})})
        ]);

        expect(is(expected, moves)).toBe(true);

    });

    it('bumps automatons into each other', () => {
        const automaton = Automaton({position: Coordinate({ x: 2, y: 2 })});
        const automatons = List([
            automaton,
            Automaton({position: Coordinate({ x: 0, y: 2 })})
        ]);

        let board = Board({
            dim: Coordinate({x: 5, y: 5}),
            automatons
        });

        let moves = board.getAvailableMoves();

        expect(moves.count()).toBe(7);

        let firstAutomatonMoves = moves.filter((move) => move.automaton.equals(automaton));

        expect (firstAutomatonMoves.count()).toBe(4);

        let expected = List([
            Move({automaton, nextPosition: Coordinate({x: 4, y: 2})}),
            Move({automaton, nextPosition: Coordinate({x: 1, y: 2})}),
            Move({automaton, nextPosition: Coordinate({x: 2, y: 4})}),
            Move({automaton, nextPosition: Coordinate({x: 2, y: 0})})
        ]);

        expect(is(expected, firstAutomatonMoves)).toBe(true);
    });

});

