import { Record } from 'immutable';

export const GAME_PHASE = {
    PRE_SELECT_TARGET: 1,
    PLAYERS_SEARCHING: 2,
    COUNTDOWN:         3
};

export const GameState = Record({
    boardId: null,
    phase: GAME_PHASE.PRE_SELECT_TARGET,
    selectedTarget: null
});
