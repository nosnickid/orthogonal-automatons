import React from 'react';

export default class extends React.Component {
    render() {
        const rows = this.props.allBoards.map((board) => {
            let moves = this.props.getBoardMoves(board.id);

            const automatons = board.automatons;
            
            return (
                <tr key={board.id}>
                    <td>{board.id}</td>
                    <td>{board.dim.x} x {board.dim.y}</td>
                    <td>
                        <ul className="list-unstyled">
                            {automatons.map((automaton) =>
                                <li>{automaton.position.x}, {automaton.position.y}</li>
                            )}
                        </ul>
                    </td>
                    <td>
                        {moves.count()}
                    </td>
                    <td>
                        <button type="button" className="btn btn-info" onClick={() => this.props.onPopulateTestBoard(board.id)}>
                            Test populate
                        </button>
                    </td>
                </tr>
            )
        }).toArray();

        return (
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Board ID</th>
                        <th>Dimensions</th>
                        <th>Automatons at</th>
                        <th>Available Moves</th>
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