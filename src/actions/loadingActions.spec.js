import * as types from './actionTypes';
import { startLoading, stopLoading } from './loadingActions';

describe('loadingActions', () => {
    it('should called startLoading properly', () => {
        // given
        const expectedAction = {
            type: types.LOADING_START
        };
        // when
        const action = startLoading();
        // then
        expect(action).toEqual(expectedAction);
    });

    it('should called stopLoading properly', () => {
        // given
        const expectedAction = {
            type: types.LOADING_STOP,
            err: null
        };
        // when
        const action = stopLoading();
        // then
        expect(action).toEqual(expectedAction);
    });
});