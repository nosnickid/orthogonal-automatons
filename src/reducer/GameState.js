import { Record, Map } from 'immutable';

import { GameState } from '../game/state.js';

const State = Record({
    games: Map()
});

const handlers = {
    CREATE_GAME: (domain, action) => domain.setIn(
        ['games', action.payload.gameId],
        GameState()
    ),
    SET_GAME_BASE_BOARD: (domain, action) => domain.setIn(
        ['games', action.payload.gameId, 'boardId'],
        action.payload.board
    ),
    SET_TARGET: (domain, action) => domain
        .setIn(['games', action.payload.gameId, 'selectedTarget'], action.payload.target)
        .setIn(['games', action.payload.gameId, 'phase'], GAME_PHASE.PLAYERS_SEARCHING)
};

function BoardState(domain, action) {
    if (domain === undefined) {
        domain = State();
    }

    if (handlers.hasOwnProperty(action.type)) {
        return handlers[action.type](domain, action);
    } else {
        return domain;
    }
}

export function getGame(gameId, state) {
    if (!state.BoardState.games.has(gameId)) {
        throw new Error('Unknown game: ' + gameId);
    }
    return state.BoardState.games.get(gameId);
}

export { BoardState };
export default BoardState;
