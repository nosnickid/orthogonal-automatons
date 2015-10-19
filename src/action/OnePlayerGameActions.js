/* eslint no-unused-vars: [2, { "argsIgnorePattern": "getState" }] */
import { createAction } from 'redux-actions';
import BoardActions from './BoardActions';

import { getGame } from '../reducer/GameState';
import { getBoard } from '../reducer/BoardState';
import { GAME_PHASE } from '../game/state';

export const GAME_NAME = '1p-game';
const BOARD_NAME = '1p-board';
const BOARD_DIM = 16;

const OnePlayerGameActions = {
    CREATE_GAME: createAction('CREATE_GAME', (id) => ({ id }) ),
    SET_GAME_BASE_BOARD: createAction('SET_GAME_BASE_BOARD', (gameId, boardId) => ({ gameId, boardId }) ),
    SET_TARGET: createAction('SET_TARGET', (gameId, target) => ({ gameId, target })),

    startNewGame: () => (dispatch, getState) => {
        dispatch(OnePlayerGameActions.CREATE_GAME(GAME_NAME));
        dispatch(BoardActions.CREATE_BOARD(BOARD_NAME, BOARD_DIM, BOARD_DIM));
        dispatch(BoardActions.POPULATE_TEST_BOARD(BOARD_NAME));
        dispatch(OnePlayerGameActions.SET_GAME_BASE_BOARD(GAME_NAME, BOARD_NAME));
    },

    selectTarget: (gameId) => (dispatch, getState) => {
        const game = getGame(gameId, getState());

        if (game.phase != GAME_PHASE.PRE_SELECT_TARGET) {
            throw new Error('Can only selectTarget in PRE_SELECT_TARGET phase');
        }

        const board = getBoard(game.boardId, getState());

        const target = board.targets[
            Math.floor(Math.random() * board.targets.count())
        ];

        dispatch(OnePlayerGameActions.SET_TARGET(gameId, target));
    }
};

export default Object.assign({}, BoardActions, OnePlayerGameActions);