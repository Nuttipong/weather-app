import { reducer } from './loadingReducer';
import initialState from './initialState';
import * as types from '../actions/actionTypes';

describe('loadingReducer', () => {
    it('should return the intial state properly', () => {
        // given
        const prevState = undefined;
        // and
        const type = 'NOT MATCH';
        // when
        const newState = reducer(prevState, { type });
        // then
        expect(newState).toEqual(initialState.loading);  
    });

    it('should handle ' + types.LOADING_START + ' properly', () => {
        // given
        const expectedState = 1;
        // and
        const action = {
            type: types.LOADING_START
        };
        // when
        const newState = reducer(initialState.loading, action);
        // then
        expect(newState).toEqual(expectedState);
    });

    it('should handle ' + types.LOADING_STOP + ' properly', () => {
        // given
        const expectedState = 0;
        // and
        const prevState = 1;
        // and
        const action = {
            type: types.LOADING_STOP
        };
        // when
        const newState = reducer(prevState, action);
        // then
        expect(newState).toEqual(expectedState);
    });
});