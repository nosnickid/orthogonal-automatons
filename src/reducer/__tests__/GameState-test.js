jest.dontMock('../GameState');
jest.dontMock('../../game/state');
jest.dontMock('immutable');

describe('GameState', () => {
    var { BoardState } = require('../GameState');

    it('returns new game state', () => {
        const result = BoardState(undefined, { type: undefined });

        expect(result).toBeDefined();
        expect(result.games).toBeDefined();
        expect(result.games.count()).toBe(0);
    });
});