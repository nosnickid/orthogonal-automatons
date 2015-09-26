import { createAction } from 'redux-actions';

const actions = {
     CREATE_BOARD: createAction('CREATE_BOARD',
        (id, width, height) => ({id, width, height})
    )
};

export default actions;