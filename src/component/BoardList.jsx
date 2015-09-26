import React from 'react';

export default class extends React.Component {
    render() {
        const rows = this.props.boards.map((board) => {
            return (
                <tr>
                    <td>{board.id}</td>
                    <td>{board.dim.x} x {board.dim.y}</td>
                </tr>
            )
        });

        return (
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Board ID</th>
                        <th>Dimensions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}