import { Record, Map, List } from 'immutable';

import { Board, Coordinate, Automaton } from '../game/entities.js';

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
    },
    POPULATE_TEST_BOARD: (domain, action) => {
        const id = action.payload;

        if (!domain.boards.has(id)) {
            throw new Error("Unknown board " + id);
        }

        const board = domain.boards.get(id);

        const colors = ['red', 'green', 'blue', 'yellow'];

        let automatons = [];
        for (var i = 0; i < 4; i++) {
            let position = Coordinate({
                x: Math.floor(Math.random() * board.dim.x),
                y: Math.floor(Math.random() * board.dim.y)
            });
            automatons.push(Automaton({
                position, color: colors[i % colors.length]
            }));
        }

        return domain
            .setIn(['boards', id, 'automatons'], List(automatons))
            ;
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
