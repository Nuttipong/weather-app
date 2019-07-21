import React from 'react';
import { shallow } from 'enzyme';
import LoadingScreen from './LoadingScreen';
import { mockStore } from '../../test/utils/mockStore';

describe('LoadingScreen', () => {

    it('should render without crashing', () => {
        // given
        const props = {
            loading: 0,
            actions: {},
            history: {}
        };
        // when
        const wrapper = shallow(<LoadingScreen {...props} />, { context: { store: mockStore() } });
        // then
        expect(wrapper).toBeDefined();
        // and
        expect(wrapper).toMatchSnapshot();
    });
});