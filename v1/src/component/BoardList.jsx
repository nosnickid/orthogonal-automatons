import React from 'react';
import { List } from 'immutable';

export default class BoardList extends React.Component {
    render() {
        const rows = this.props.allBoards.map((board) => {
            let moves = board.getAvailableMoves();
            let blocks = board.getBlockedSteps();

            const automatons = board.automatons;
            
            let boardRows = List([
                <tr key={board.id}>
                    <td>
                        <a onClick={() => this.props.onSelectBoard(board.id)}>{board.id}</a>
                    </td>
                    <td>{board.dim.x} x {board.dim.y}</td>
                    <td>
                        <ul className='list-unstyled'>
                            {automatons.map((automaton) =>
                                <li>{automaton.color} @ ({automaton.position.x}, {automaton.position.y})</li>
                            )}
                        </ul>
                    </td>
                    <td>
                        <ul className='list-unstyled'>
                            {board.targets.map((target) =>
                                <li>{target.automaton.color} @ ({target.position.x}, {target.position.y})</li>
                            )}
                        </ul>
                    </td>
                    <td>{moves.count()}</td>
                    <td>{blocks.count()}</td>
                    <td>
                        <button type='button' className='btn btn-info' onClick={() => this.props.onPopulateTestBoard(board.id)}>
                            Test populate
                        </button>
                    </td>
                </tr>
            ]);

            if (board.id == this.props.selectedBoardId) {
                boardRows = boardRows.push(
                    <tr key='selected'>
                        <td colSpan='6'>
                            somethibng something
                        </td>
                    </tr>
                );
            }

            return boardRows;
        }).flatten().toArray();

        return (
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Board ID</th>
                        <th>Dimensions</th>
                        <th>Automatons at</th>
                        <th>Targets At</th>
                        <th>Available Moves</th>
                        <th>Blocks</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}