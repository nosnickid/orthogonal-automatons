import { Record, Map, List } from 'immutable';

const State = Record({
    selectedBoardId: null,
    hoverAutomaton:  null
});

const handlers = {
    SELECT_BOARD: (domain, action) => {
        return domain.set('selectedBoardId', action.payload);
    },
    OH_HOVER_AUTOMATON: (domain, action) => {
        return domain.set('hoverAutomaton', action.payload);
    }
};

export default function BoardState(domain, action) {
    if (domain === undefined) {
        domain = State();
    }

    if (handlers.hasOwnProperty(action.type)) {
        return handlers[action.type](domain, action);
    } else {
        return domain;
    }
};
