import { Record, Map } from 'immutable';

import { Board, Coordinate } from '../game/entities.js';
import { BoardPopulate } from '../game/BoardPopulate';

const State = Record({
    boards: Map()
});

const handlers = {
    CREATE_BOARD: (domain, action) => {
        const { id, width, height } = action.payload;

        const dim = Coordinate({x: width, y: height});

        return domain.setIn(['boards', id], Board({
            id, dim
        }));
    },
    POPULATE_TEST_BOARD: (domain, action) => {
        const id = action.payload;

        if (!domain.boards.has(id)) {
            throw new Error('Unknown board ' + id);
        }

        let board = domain.boards.get(id);

        const populator = new BoardPopulate();
        board = populator.populateCenterWall(board);
        board = populator.populateRandomBotPositions(board);
        board = populator.populateBotTargets(board);

        return domain.setIn(['boards', id], board);
    }
};

export default function BoardState(domain, action) {
    if (domain === undefined) {
        domain = State()
    }

    if (handlers.hasOwnProperty(action.type)) {
        return handlers[action.type](domain, action);
    } else {
        return domain;
    }
}

export function getAllBoards(state) {
    return state.BoardState.boards;
}

export function getBoard(boardId, state) {
    return state.BoardState.boards.get(boardId);
}
