import React, { Component } from 'react';
import { connect } from 'react-redux';

import store from './GameStore';
import { CREATE_BOARD, POPULATE_TEST_BOARD } from './action/actions';

import BoardList from './component/BoardList';
import { getAllBoards } from './reducer/BoardState';

store.dispatch(CREATE_BOARD('test', 12, 12));

class App extends Component {
    render() {
        return (
            <div>
                <h1>Orthogonal Automatons</h1>
                <BoardList {...this.props.boardList} />
            </div>
        );
    }
}

function mapState(state) {
    let props = {};

    props.boardList = {
        allBoards: getAllBoards(state)
    };

    return props;
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    const { dispatch } = dispatchProps;

    stateProps.boardList.onPopulateTestBoard = (id) => dispatch(POPULATE_TEST_BOARD(id));

    return Object.assign({}, stateProps, dispatchProps, ownProps);
}

export default connect(mapState, undefined, mergeProps)(App);