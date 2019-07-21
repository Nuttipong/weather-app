'use strict';

import * as types from './actionTypes';
import { mockStore } from '../test/utils/mockStore';
import * as weatherActions from './weatherActions';
import { TemperatureType } from '../constants/temperature';
import fakeData from '../test/mock/data.json';

const mockFetchWeatherFahrenheitBased = jest.fn();
jest.mock('../api/weatherApi');
import weatherApi from '../api/weatherApi';


describe('weatherActions', () => {

    beforeEach(() => {
        weatherApi.fetchWeatherFahrenheitBased = mockFetchWeatherFahrenheitBased;
    });

    afterEach(() => {
        weatherApi.fetchWeatherFahrenheitBased.mockClear();
    });

    it('should called loadWeather properly', (done) => {
        // given
        const store = mockStore();
        mockFetchWeatherFahrenheitBased.mockReturnValueOnce(Promise.resolve(fakeData));
        // when
        store.dispatch(weatherActions.loadWeather()).then(() => {
            const actions = store.getActions();
            // then
            expect(actions[0]).toEqual({ type: types.LOADING_START });
            expect(actions[1].type).toEqual(types.LOAD_WEATHER_SUCCESS);
            expect(actions[1].payload).toBeDefined();
            expect(actions[1].payload.fData).toBeArray();
            expect(actions[1].payload.cData).toBeArray();
            expect(actions[1].payload.city).toBeObject();
            done();
        });
    });

    it('should called loadWeather properly when error', (done) => {
        // given
        const store = mockStore();
        const fakeError = new Error('Fake error');
        mockFetchWeatherFahrenheitBased.mockRejectedValueOnce(fakeError);
        // when
        store.dispatch(weatherActions.loadWeather()).then(() => {
            const actions = store.getActions();
            // then
            expect(actions[0]).toEqual({ type: types.LOADING_START });
            expect(actions[1]).toEqual({ type: types.LOADING_STOP, err: fakeError });
            done();
        });
    });

    it('should called loadWeatherSuccess properly', () => {
        // given
        const payload = 'fake';
        const expectedAction = {
            type: types.LOAD_WEATHER_SUCCESS,
            payload
        };
        // when
        const action = weatherActions.loadWeatherSuccess(payload);
        // then
        expect(action).toEqual(expectedAction);
    });

    it('should called changeWeather properly', () => {
        // given
        const payload = {
            weatherType: TemperatureType.FAHRENHEIT,
            currentSelectedIndex: 1
        };
        const expectedAction = {
            type: types.CHANGE_WEATHER_SUCCESS,
            weatherType: TemperatureType.FAHRENHEIT,
            currentSelectedIndex: 1
        };
        // when
        const action = weatherActions.changeWeather(payload.weatherType, payload.currentSelectedIndex);
        // then
        expect(action).toEqual(expectedAction);
    });
});