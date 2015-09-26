import React from 'react';
import { Provider } from 'react-redux';
import store from './GameStore';

import App from './App';

React.render(
    <Provider store={store}>
        {() => <App  />}
    </Provider>,
    document.getElementById('root')
);
