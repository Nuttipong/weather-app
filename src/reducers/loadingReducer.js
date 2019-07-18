import initialState from './initialState';
import * as types from '../actions/actionTypes';

const actionTypeEndsInSuccess = (type) => {
    return type.substring(type.length - 8) == '_SUCCESS';
};

export function reducer(state = initialState.loading, action) {
    if (action.type === types.LOADING_START) {
        return state + 1;
    } else if (action.type === types.LOADING_STOP || actionTypeEndsInSuccess(action.type)) {
        return state - 1;
    }

    return state;
}