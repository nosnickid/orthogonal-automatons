import React, { Component } from 'react';
import { connect } from 'react-redux';

import store from './GameStore';
import { CREATE_BOARD, POPULATE_TEST_BOARD, SELECT_BOARD, OH_HOVER_AUTOMATON } from './action/actions';

import BoardList from './component/BoardList';
import BoardDisplay from './component/BoardDisplay';

import { getAllBoards } from './reducer/BoardState';

store.dispatch(CREATE_BOARD('test', 12, 12));

class App extends Component {
    render() {
        return (
            <div>
                <h1>Orthogonal Automatons</h1>
                <BoardList {...this.props.boardList} />
                <BoardDisplay {...this.props.boardDisplay} />
            </div>
        );
    }
}

function mapState(state) {
    let props = {};

    props.boardList = {
        allBoards: getAllBoards(state),
        selectedBoardId: state.UiState.selectedBoardId
    };

    props.boardDisplay = {
        board: getAllBoards(state).get('test'),
        hoverAutomaton: state.UiState.hoverAutomaton
    };

    return props;
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    const { dispatch } = dispatchProps;

    Object.assign(stateProps.boardList, {
        onPopulateTestBoard: (id) => dispatch(POPULATE_TEST_BOARD(id)),
        onSelectBoard: (id) => dispatch(SELECT_BOARD(id))
    });

    Object.assign(stateProps.boardDisplay, {
        onHoverAutomaton: (automaton) => dispatch(OH_HOVER_AUTOMATON(automaton))
    });

    return Object.assign({}, stateProps, dispatchProps, ownProps);
}

export default connect(mapState, undefined, mergeProps)(App);