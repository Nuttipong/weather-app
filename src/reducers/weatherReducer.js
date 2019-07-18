import * as types from '../actions/actionTypes';
import initialState from './initialState';

export function reducer(state = initialState.weather, action) {
    switch (action.type) {
        case types.LOAD_WEATHER_SUCCESS: {
            return Object.assign({}, state, action.payload);
        }

        case types.CHANGE_WEATHER_SUCCESS: {
            return Object.assign({}, state, {
                ...state,
                tempType: action.weatherType,
                currentSelectedIndex: action.currentSelectedIndex
            });
        }

        default: {
            return state;
        }
    }
}