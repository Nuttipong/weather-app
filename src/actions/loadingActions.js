import * as types from './actionTypes';

export const startLoading = () => {
    return { type: types.LOADING_START };
};

export const stopLoading = (err = null) => {
    return { type: types.LOADING_STOP, err };
};