import { Record, Set, List } from 'immutable';

export const Coordinate = Record({
    x: null,
    y: null
});

export const Automaton = Record({
    position: null,
    color: null
});

export const Board = Record({
    id: null,

    dim: null,

    automatons: List(),
    walls: List()
});




