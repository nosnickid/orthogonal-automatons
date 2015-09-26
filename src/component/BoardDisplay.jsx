import React from 'react';
import { Coordinate } from '../game/entities.js';

export default class extends React.Component {
    render() {
        const automatonPositions = this.props.board.automatons.map((automaton) => automaton.position).toSet();

        let rows = [];
        for(let y = 0; y < this.props.board.dim.y; y++) {
            let cells = [];
            for(let x = 0; x < this.props.board.dim.x; x++) {
                const coord = Coordinate({x, y});
                let className = automatonPositions.has(coord) ? 'active' : '';
                cells.push(<span key={x} className={className}></span>);
            }
            rows.push(<div key={y} className="row">{cells}</div>)
        }

        return (
            <div className="row">
                <div className="col-xs-push-2 col-xs-6">
                    <div className="board">
                        {rows}
                    </div>
                </div>
            </div>
        );
    }
}