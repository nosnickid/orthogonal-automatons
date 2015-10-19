import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import BoardState from './reducer/BoardState';
import UiState from './reducer/UiState';

let app = combineReducers({
    BoardState,

    UiState
});

export default compose(applyMiddleware(thunk))(createStore)(app);
