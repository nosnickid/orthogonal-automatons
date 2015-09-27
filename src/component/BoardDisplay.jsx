import React from 'react';
import { Coordinate } from '../game/entities.js';
import { Map } from 'immutable';

export default class extends React.Component {
    render() {
        const { board, hoverAutomaton } = this.props;
        
        let positionClasses = Map(
            board.automatons.map((automaton) => [automaton.position, 'automaton'])
        );

        if (hoverAutomaton) {
            positionClasses = positionClasses.set(hoverAutomaton.position, 'automaton active');

            window.console.log('all moves', board.getAvailableMoves().toJS());

            board.getAvailableMoves()
                .filter((move) => move.automaton.equals(hoverAutomaton))
                .forEach((move) => positionClasses = positionClasses.set(move.nextPosition, 'move'))
            ;
            window.console.log("classes", positionClasses.toJS());

        }


        let rows = [];
        for(let y = 0; y < board.dim.y; y++) {
            let cells = [];
            for(let x = 0; x < board.dim.x; x++) {
                const coord = Coordinate({x, y});
                const onMouseOver = () => this.props.onHoverAutomaton(board.automatons.find((a) => a.position.equals(coord)));
                const onMouseOut =  () => this.props.onHoverAutomaton(null);

                let className = positionClasses.get(Coordinate({x, y}));

                cells.push(
                    <span key={x} className={className}
                          onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
                    </span>
                );
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