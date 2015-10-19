import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//import { DebugPanel, DevTools, LogMonitor } from 'redux-devtools/lib/react';

import store from '../OnePlayerGameStore';

import OnePlayerGame from '../component/OnePlayerGame';
import { startNewGame } from '../action/OnePlayerGameActions';

store.dispatch(startNewGame());

ReactDOM.render(
    <div>
        <Provider store={store}>
            <OnePlayerGame />
        </Provider>

    </div>,
    document.getElementById('root')
);