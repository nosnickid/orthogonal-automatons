import { Record, Map, List } from 'immutable';
import MersenneTwister from 'mersennetwister';

import { Board, Coordinate, Automaton, encodeStep } from '../game/entities.js';

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
        const mt = new MersenneTwister(Math.random() * 65535);

        if (!domain.boards.has(id)) {
            throw new Error("Unknown board " + id);
        }

        const board = domain.boards.get(id);

        const colors = ['red', 'green', 'blue', 'yellow'];

        let automatons = [];
        for (let i = 0; i < 4; i++) {
            let position = Coordinate({
                x: Math.floor(mt.random() * board.dim.x),
                y: Math.floor(mt.random() * board.dim.y)
            });
            automatons.push(Automaton({
                position, color: colors[i % colors.length]
            }));
        }

        const x2 = (board.dim.x / 2) - 1;
        const y2 = (board.dim.y / 2) - 1;
        let walls = [
            encodeStep(x2,     y2,  0, -1),
            encodeStep(x2 + 1, y2,  0, -1),

            encodeStep(x2, y2,     -1,  0),
            encodeStep(x2, y2 + 1, -1,  0),

            encodeStep(x2,     y2 + 1,  0, 1),
            encodeStep(x2 + 1, y2 + 1,  0, 1),

            encodeStep(x2 + 1, y2,      1,  0),
            encodeStep(x2 + 1, y2 + 1,  1,  0)
        ];

        return domain
            .setIn(['boards', id, 'automatons'], List(automatons))
            .setIn(['boards', id, 'walls'], List(walls))
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
