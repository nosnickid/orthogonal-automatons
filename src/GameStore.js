import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { devTools } from 'redux-devtools';

import BoardState from './reducer/BoardState';

let app = combineReducers({
    BoardState
});

export default compose(applyMiddleware(thunk), devTools())(createStore)(app);
