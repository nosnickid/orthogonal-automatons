jest.dontMock('../entities');
jest.dontMock('immutable');

describe('Board', () => {
    var { Board, Coordinate } = require('../entities');

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
});

