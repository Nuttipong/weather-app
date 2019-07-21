import initialState from './initialState';
import * as types from '../actions/actionTypes';

export function reducer(state = initialState.loading, action) {
    if (action.type === types.LOADING_START) {
        return state + 1;
    } else if (action.type === types.LOADING_STOP) {
        return state - 1;
    }

    return state;
}