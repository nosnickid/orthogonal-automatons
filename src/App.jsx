import React, { Component } from 'react';
import { connect } from 'react-redux';

import store from './GameStore';
import { CREATE_BOARD } from './action/actions';

import BoardList from './component/BoardList';
import { getAllBoards } from './reducer/BoardState';

store.dispatch(CREATE_BOARD('test', 12, 12));

class App extends Component {
    render() {
        return (
            <div>
                <h1>Orthogonal Automatons</h1>
                <BoardList boards={this.props.allBoards}/>
            </div>
        );
    }
}

function mapState(state) {
    return {
        allBoards: getAllBoards(state)
    }
}

export default connect(mapState)(App);