import React from 'react';
import { shallow } from 'enzyme';
import { LoadingScreen } from './LoadingScreen';

describe('LoadingScreen', () => {

    let historyMock = { push: jest.fn() };
    let loadWeatherFn = jest.fn();
    let spyComponentDidMount = jest.spyOn(LoadingScreen.prototype, 'componentDidMount');

    beforeEach(() => {
        spyComponentDidMount.mockClear();
        loadWeatherFn.mockClear();
    });

    it('should render without crashing', (done) => {
        // given
        loadWeatherFn.mockReturnValue(Promise.resolve([]));
        const props = {
            loading: 0,
            actions: { loadWeather: loadWeatherFn },
            history: historyMock
        };
        // when
        const wrapper = shallow(<LoadingScreen {...props} />);
        // then
        expect(wrapper).toBeDefined();
        // and
        expect(wrapper).toMatchSnapshot();
        done();
    });

    it('should called componentDidMount properly', (done) => {
        // given
        loadWeatherFn.mockReturnValue(Promise.resolve([]));
        const props = {
            loading: 0,
            actions: { loadWeather: loadWeatherFn },
            history: historyMock
        };
        // when
        shallow(<LoadingScreen {...props} />);
        // then
        expect(spyComponentDidMount).toHaveBeenCalledTimes(1);
        // and
        expect(loadWeatherFn).toHaveBeenCalledTimes(1);
        // and
        expect(historyMock.push).toHaveBeenCalledTimes(1);
        done();
    });
});