import { createStore, applyMiddleware, combineReducers } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import BoardState from './reducer/BoardState';

let app = combineReducers({
    BoardState
});

const logger = createLogger();

export default applyMiddleware(thunk, logger)(createStore)(app);
