import { createAction } from 'redux-actions';

const actions = {
     CREATE_BOARD: createAction('CREATE_BOARD',
        (id, width, height) => ({id, width, height})
    ),
    POPULATE_TEST_BOARD: createAction('POPULATE_TEST_BOARD')
};

export default actions;