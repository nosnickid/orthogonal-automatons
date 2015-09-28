import React from 'react';
import { Provider } from 'react-redux';
import store from './GameStore';
import { DebugPanel, DevTools, LogMonitor } from 'redux-devtools/lib/react';

import App from './App';

React.render(
    <div>
        <Provider store={store}>
            {() => <App  />}
        </Provider>

    </div>,
    document.getElementById('root')
);
