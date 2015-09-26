import { Record, Set, List } from 'immutable';

export const Coordinate = Record({
    x: null,
    y: null
});

export const Robot = Record({
    position: null,
    color: null
});

export const Board = Record({
    id: null,

    dim: null,

    robots: List(),
    walls: List()
});




