import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { devTools } from 'redux-devtools';

import BoardState from './reducer/BoardState';
import UiState from './reducer/UiState';

let app = combineReducers({
    BoardState,

    UiState
});

export default compose(applyMiddleware(thunk, createLogger()))(createStore)(app);
