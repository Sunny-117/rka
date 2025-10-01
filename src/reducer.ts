import * as actionTypes from './actionTypes'
import { KeepAliveStatesType } from './context';

type Action = {
    type: string;
    payload: KeepAliveStatesType;
}

export function keepAliveReducer(state: Record<string, KeepAliveStatesType>, action: Action) {
    const { type, payload } = action;
    const { keepAliveId, reactElement, nodes } = payload;

    switch (type) {
        case actionTypes.CREATING:
            return {
                ...state,
                [keepAliveId]: {
                    keepAliveId,
                    reactElement,
                    status: type,
                    nodes: null
                }
            }
        case actionTypes.CREATED:
            return {
                ...state,
                [keepAliveId]: {
                    ...state[keepAliveId],
                    status: type,
                    nodes
                }
            }
        default:
            return state
    }
}