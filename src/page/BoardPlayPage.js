import React from 'react';
import { Provider } from 'react-redux';
import { DebugPanel, DevTools, LogMonitor } from 'redux-devtools/lib/react';

import store from '../GameStore';

import BoardPlay from '../component/BoardPlay';

React.render(
    <div>
        <Provider store={store}>
            {() => <BoardPlay />}
        </Provider>

    </div>,
    document.getElementById('root')
);
