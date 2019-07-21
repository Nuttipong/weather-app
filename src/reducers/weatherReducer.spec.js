import { reducer } from './weatherReducer';
import initialState from './initialState';
import * as types from '../actions/actionTypes';
import { TemperatureType } from '../constants/temperature';

describe('weatherReducer', () => {
    it('should return the intial state properly', () => {
        // given
        const prevState = undefined;
        // and
        const type = 'NOT MATCH';
        // when
        const newState = reducer(prevState, { type });
        // then
        expect(newState.city).toBeObject();
        // and
        expect(newState.tempType).toEqual(TemperatureType.FAHRENHEIT);
        // and
        expect(newState.fData).toBeArray();
        // and
        expect(newState.cData).toBeArray();
        // and
        expect(newState.currentSelectedIndex).toEqual(0);
    });

    it('should handle ' + types.LOAD_WEATHER_SUCCESS + ' properly', () => {
        // given
        const expectedState = {
            fData: [1, 2, 3, 4, 5],
            cData: [6, 7, 8, 9, 10],
            city: { name: 'Munich' },
            tempType: 'Fahrenheit',
            tempModel: [],
            currentSelectedIndex: 0
        };
        // and
        const action = {
            type: types.LOAD_WEATHER_SUCCESS,
            payload: { ...expectedState }
        };
        // when
        const newState = reducer(initialState.weather, action);
        // then
        expect(newState).toEqual(expectedState);
    });

    it('should handle ' + types.CHANGE_WEATHER_SUCCESS + ' properly', () => {
        // given
        const prevState = {
            tempType: 'Fahrenheit',
            currentSelectedIndex: 0
        };
        // and
        const action = {
            type: types.CHANGE_WEATHER_SUCCESS,
            weatherType: TemperatureType.CELCIUS,
            currentSelectedIndex: 5
        };
        // when
        const newState = reducer(prevState, action);
        // then
        expect(newState.tempType).toEqual(TemperatureType.CELCIUS);
        // and
        expect(newState.currentSelectedIndex).toEqual(action.currentSelectedIndex);
    });
});