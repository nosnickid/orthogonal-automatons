import React from 'react';
import { Coordinate, StepDirections, encodeStep } from '../game/entities.js';
import { Map } from 'immutable';

export default class BoardDisplay extends React.Component {
    render() {
        const { board, hoverAutomaton } = this.props;

        const blockedSteps = board.getBlockedSteps();
        
        let positionClasses = Map(
            board.automatons.map((automaton) => [automaton.position, 'automaton'])
        );

        const targetClasses = [ 'snowflake', 'heart', 'leaf', 'glass', 'compass' ];
        const automatonTargetCount = { };

        let positionIcons = Map(
            board.targets.map((target) => {
                if (!automatonTargetCount[target.automaton.color]) automatonTargetCount[target.automaton.color] = 0;
                const icon = targetClasses[automatonTargetCount[target.automaton.color]++];

                return [ target.position,  'glyphicon glyphicon-' + icon]
            })
        );

        if (hoverAutomaton) {
            positionClasses = positionClasses.set(hoverAutomaton.position, 'automaton active');

            board.getAvailableMoves()
                .filter((move) => move.automaton.equals(hoverAutomaton))
                .forEach((move) => positionClasses = positionClasses.set(move.nextPosition, 'move'))
            ;
        }

        positionClasses = positionClasses.withMutations((classes) => {
            classes
                .set(Coordinate({x: 7, y: 7}), 'red')
                .set(Coordinate({x: 8, y: 7}), 'red')
                .set(Coordinate({x: 7, y: 8}), 'red')
                .set(Coordinate({x: 8, y: 8}), 'red')
            ;
        });

        // these correspond to StepDirections.
        const stepClasses = [ 'r', 'l', 'd', 'u' ];

        let rows = [];
        for(let y = 0; y < board.dim.y; y++) {
            let cells = [];
            for(let x = 0; x < board.dim.x; x++) {
                const coord = Coordinate({x, y});
                const onMouseOver = () => this.props.onHoverAutomaton(board.automatons.find((a) => a.position.equals(coord)));
                const onMouseOut =  () => this.props.onHoverAutomaton(null);
                let className = positionClasses.get(coord);
                if (className == undefined) className = '';

                StepDirections.forEach((direction, i) => {
                    let step = encodeStep(x, y, direction.x, direction.y);
                    if (blockedSteps.has(step)) {
                        className += ' wall-' + stepClasses[i];
                    }
                });

                cells.push(
                    <span key={x} className={'tile ' + className}
                          onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
                        {positionIcons.has(coord) ?
                        <span className={positionIcons.get(coord)}></span>
                        :null}
                    </span>
                );
            }
            rows.push(<div key={y} className="board-row">{cells}</div>)
        }

        return (
            <div className="row">
                <div className="col-xs-push-2- col-xs-6">
                    <div className="gfx-board">
                        {rows}
                    </div>
                </div>
            </div>
        );
    }
}