import React from 'react';
import { Provider } from 'react-redux';

import store from '../GameStore';

import BoardPlay from '../component/BoardPlay';

React.render(
    <div>
        <Provider store={store}>
            <BoardPlay />
        </Provider>

    </div>,
    document.getElementById('root')
);
