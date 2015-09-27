import { createAction } from 'redux-actions';

const actions = {
     CREATE_BOARD: createAction('CREATE_BOARD',
        (id, width, height) => ({id, width, height})
    ),
    POPULATE_TEST_BOARD: createAction('POPULATE_TEST_BOARD'),

    SELECT_BOARD: createAction('SELECT_BOARD'),

    OH_HOVER_AUTOMATON: createAction('OH_HOVER_AUTOMATON')
};

export default actions;