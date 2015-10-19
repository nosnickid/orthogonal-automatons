import React, { Component } from 'react';
import { connect } from 'react-redux';

class OnePlayerGame extends Component {
    render() {
        return (
            <div>
                <h1>Orthogonal Automatons One Player</h1>
            </div>
        );
    }
}

function mapState(state) {
    let props = {};

    return props;
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    const { dispatch } = dispatchProps;

    return Object.assign({}, stateProps, dispatchProps, ownProps);
}

export default connect(mapState, undefined, mergeProps)(OnePlayerGame);