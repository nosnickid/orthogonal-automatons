import { Record, Map } from 'immutable';

import { Board, Coordinate } from '../game/board';

const State = Record({
    boards: Map()
});

export function getAllBoards(state) {
    return state.BoardState.boards;
}

const handlers = {
    CREATE_BOARD: (domain, action) => {
        const { id, width, height } = action.payload;

        const dim = Coordinate({x: width, y: height});

        return domain.setIn(['boards', id], Board({
            id, dim
        }));
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
};
