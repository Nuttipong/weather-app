import * as types from './actionTypes';
import { startLoading, stopLoading } from './loadingActions';
import weatherService from '../services/weatherService';

export function loadWeather() {
    return (dispatch) => {
        dispatch(startLoading());
        return weatherService.fetchWeather().then((payload) => {
            dispatch(loadWeatherSuccess(payload));
        }).catch((err) => {
            dispatch(stopLoading(err));
            throw err;
        });
    };
}

export function loadWeatherSuccess(payload) {
    return { type: types.LOAD_WEATHER_SUCCESS, payload };
}

export function changeWeather(weatherType) {
    return { type: types.CHANGE_WEATHER_SUCCESS, weatherType };
}