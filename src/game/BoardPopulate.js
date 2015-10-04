import MersenneTwister from 'mersennetwister';
import { List } from 'immutable';

import { Board, Coordinate, Automaton, encodeStep } from '../game/entities.js';

export class BoardPopulate {
    populateCenterWall(board) {

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

        return board.set('walls', List(walls));
    }

    populateRandomBotPositions(board) {
        const mt = new MersenneTwister(Math.random() * 65535);

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

        return board.set('automatons', List(automatons));
    }
}