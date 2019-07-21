import React from 'react';
import { WeatherScreen } from './WeatherScreen';
import { shallow, render } from 'enzyme';
import BarChart from '../common/BarChart';
import TempSwitch from './TempSwitch';
import WeatherInfo from './WeatherInfo';
import { bindActionCreators } from 'redux';
import * as weatherActions from '../../actions/weatherActions';
import { TemperatureType, TemperatureUnit } from '../../constants/temperature';

describe('WeatherScreen', () => {

    let loadWeatherFn = jest.fn();
    let changeWeatherFn = jest.fn();
    let weatherPropsMock = {
        city: getCity(),
        tempModel: getTempModel(TemperatureType.FAHRENHEIT),
        tempType: getTempType(),
        currentSelectedIndex: 0,
        actions: getActions()
    };

    let spyComponentDidMount = jest.spyOn(WeatherScreen.prototype, 'componentDidMount');
    let spyRenderGraph = jest.spyOn(WeatherScreen.prototype, 'renderGraph');
    let spyComponentDidUpdate = jest.spyOn(WeatherScreen.prototype, 'componentDidUpdate');
    let spyHandleChange = jest.spyOn(WeatherScreen.prototype, 'handleChange');
    let spyPrevClick = jest.spyOn(WeatherScreen.prototype, 'prevClick');
    let spyNextClick = jest.spyOn(WeatherScreen.prototype, 'nextClick');

    beforeEach(() => {
        loadWeatherFn.mockClear();
        spyComponentDidMount.mockClear();
        spyRenderGraph.mockClear();
        spyComponentDidUpdate.mockClear();
        spyHandleChange.mockClear();
        changeWeatherFn.mockClear();
        spyPrevClick.mockClear();
        spyNextClick.mockClear();
    });

    it('should render without crashing', () => {
        // given
        const props = Object.assign({}, weatherPropsMock);
        // when
        const wrapper = shallow(<WeatherScreen {...props} />);
        // then
        expect(wrapper).toBeDefined();
        // and
        expect(wrapper).toMatchSnapshot();
    });

    it('should contain components as expected', () => {
        // given
        const props = Object.assign({}, weatherPropsMock);
        // when
        const wrapper = shallow(<WeatherScreen {...props} />);
        // then
        expect(wrapper).toBeDefined();
        // and
        expect(wrapper.find(TempSwitch)).toHaveLength(1);
        // and
        expect(wrapper.find(WeatherInfo)).toHaveLength(1);
        // and
        expect(wrapper.find(BarChart)).toHaveLength(1);
    });

    it('should have default states of component as expected', () => {
        // given
        const props = weatherPropsMock;
        // when
        const wrapper = shallow(<WeatherScreen {...props} />);
        // then
        expect(wrapper.state()).toContainKeys([
            'startIndex',
            'pageSize',
            'graphModel',
            'currentSelectedIndex'
        ]);
    });

    it('should called getDerivedStateFromProps properly', () => {
        // given
        const prop = { currentSelectedIndex: 1 };
        const state = { currentSelectedIndex: 2};
        // when
        const actual = WeatherScreen.getDerivedStateFromProps(prop, state);
        // then
        expect(actual).toEqual({
            currentSelectedIndex: 2
        });
    });

    it('should called componentDidMount with have no model data properly', (done) => {
        // given
        loadWeatherFn.mockReturnValue(Promise.resolve(getFData()));
        const props = Object.assign({}, weatherPropsMock, {
            ...weatherPropsMock,
            currentSelectedIndex : 0,
            tempModel: []
        });
        // when
        shallow(<WeatherScreen {...props} />);
        // then
        expect(spyComponentDidMount).toHaveBeenCalledTimes(1);
        // and 
        expect(loadWeatherFn).toHaveBeenCalledTimes(1);
        done();
    });

    it('should called componentDidMount with have model data properly', () => {
        // given
        const props = Object.assign({}, weatherPropsMock, {
            ...weatherPropsMock,
            currentSelectedIndex : 1
        });
        // when
        shallow(<WeatherScreen {...props} />);
        // then
        expect(spyComponentDidMount).toHaveBeenCalledTimes(1);
        // and 
        expect(spyRenderGraph).toHaveBeenCalledTimes(1);
    });

    it('should called componentDidUpdate properly', () => {
        // given
        const props = Object.assign({}, weatherPropsMock, {
            ...weatherPropsMock,
            currentSelectedIndex : -1
        });
        // when
        const wrapper = shallow(<WeatherScreen {...props} />);
        // and
        wrapper.setProps({
            currentSelectedIndex: 0
        });
        // then
        expect(spyComponentDidUpdate).toHaveBeenCalled();
        // and 
        expect(spyRenderGraph).toHaveBeenLastCalledWith(getFData()[0], 0);
    });

    it('should called renderGraph properly', () => {
        // given
        const expectedState = { 
            startIndex: 0,
            pageSize: 3,
            graphModel: { 
                categories: [ '03:00 AM' ],
                data: [ { name: 'Temperature', data: [ 17.88 ] } ],
                date: '21 Jul 19' 
            },
            currentSelectedIndex: 1 
        };
        const props = Object.assign({}, weatherPropsMock);
        const wrapper = shallow(<WeatherScreen {...props} />);
        // when
        wrapper.instance().renderGraph(getFData()[0], 1);
        // then
        expect(wrapper.state()).toEqual(expectedState);
    });

    it('should called handleChange properly', () => {
        // given
        const props = Object.assign({}, weatherPropsMock);
        // and
        const event = {
            preventDefault() { },
            target: { value: 'fake-value' }
        };
        // and
        const wrapper = shallow(<WeatherScreen {...props} />);
        // when
        wrapper.find(TempSwitch).prop('handleChange')(event);
        // then
        expect(spyHandleChange).toHaveBeenCalledTimes(1);
        // and
        expect(changeWeatherFn).toHaveBeenLastCalledWith(event.target.value, wrapper.state('currentSelectedIndex'));
    });

    it('should called prevClick properly', () => {
        // given
        const props = Object.assign({}, weatherPropsMock);
        // and
        const event = {
            preventDefault() { }
        };
        // and
        const wrapper = shallow(<WeatherScreen {...props} />);
        // when
        wrapper.find(WeatherInfo).prop('prev')()(event);
        // then
        expect(spyPrevClick).toHaveBeenCalledTimes(1);
        // and
        expect(wrapper.state('startIndex')).toEqual(0);
    });

    it('should called prevClick as expected', () => {
        // given
        const props = Object.assign({}, weatherPropsMock);
        // and
        const event = {
            preventDefault() { }
        };
        // and
        const wrapper = shallow(<WeatherScreen {...props} />);
        // and
        wrapper.setState({
            startIndex: 5
        });
        // when
        wrapper.find(WeatherInfo).prop('prev')()(event);
        // then
        expect(spyPrevClick).toHaveBeenCalledTimes(1);
        // and
        expect(wrapper.state('startIndex')).toEqual(2);
    });

    it('should called nextClick properly', () => {
        // given
        const props = Object.assign({}, weatherPropsMock, {
            ...weatherPropsMock,
            tempModel: getFData()
        });
        // and
        const event = {
            preventDefault() { }
        };
        // and
        const wrapper = shallow(<WeatherScreen {...props} />);
        // when
        wrapper.find(WeatherInfo).prop('next')()(event);
        // then
        expect(spyNextClick).toHaveBeenCalledTimes(1);
        // and
        expect(wrapper.state('startIndex')).toEqual(3);
    });

    it('should called nextClick as expected', () => {
        // given
        const props = Object.assign({}, weatherPropsMock, {
            ...weatherPropsMock,
            tempModel: getFData()
        });
        // and
        const event = {
            preventDefault() { }
        };
        // and
        const wrapper = shallow(<WeatherScreen {...props} />);
        // and
        wrapper.setState({
            startIndex: 3
        });
        // when
        wrapper.find(WeatherInfo).prop('next')()(event);
        // then
        expect(spyNextClick).toHaveBeenCalledTimes(1);
        // and
        expect(wrapper.state('startIndex')).toEqual(3);
    });

    it('should called clickAble with next flag and return true properly', () => {
        // given
        const props = Object.assign({}, weatherPropsMock, {
            ...weatherPropsMock,
            tempModel: getFData()
        });
        // and
        const wrapper = shallow(<WeatherScreen {...props} />);
        // when
        const actual = wrapper.instance().clickAble('next');
        // then
        expect(actual).toBe(true);
    });

    it('should called clickAble with next flag and return false properly', () => {
        // given
        const props = Object.assign({}, weatherPropsMock, {
            ...weatherPropsMock,
            tempModel: getCData()
        });
        // and
        const wrapper = shallow(<WeatherScreen {...props} />);
        // when
        const actual = wrapper.instance().clickAble('next');
        // then
        expect(actual).toBe(false);
    });

    it('should called clickAble with prev flag and return true properly', () => {
        // given
        const props = Object.assign({}, weatherPropsMock);
        // and
        const wrapper = shallow(<WeatherScreen {...props} />);
        // and 
        wrapper.setState({
            startIndex: 1
        });
        // when
        const actual = wrapper.instance().clickAble('prev');
        // then
        expect(actual).toBe(true);
    });

    it('should called clickAble with prev flag and return false properly', () => {
        // given
        const props = Object.assign({}, weatherPropsMock);
        // and
        const wrapper = shallow(<WeatherScreen {...props} />);
        // when
        const actual = wrapper.instance().clickAble('prev');
        // then
        expect(actual).toBe(false);
    });

    function getCity() {
        return {
            id: 2867714,
            name: 'Munich',
            coord: {
                lat: 48.1371,
                lon: 11.5754
            },
            country: 'DE',
            population: 1260391,
            timezone: 7200
        };
    }

    function getActions() {
        return {
            loadWeather: loadWeatherFn,
            changeWeather: changeWeatherFn
        };
    }

    function getTempType() {
        return TemperatureType.FAHRENHEIT;
    }

    function getTempModel(type) {
        return type === TemperatureType.FAHRENHEIT ? getFData() : getCData();
    }

    function getCData() {
        return [
            {
                city: 'Munich',
                date: '21 Jul 19',
                dateSegment: [
                    {
                        dt_txt: '2019-07-21 03:00:00',
                        main: {
                            temp: 17.88888888888889,
                            temp_max: 17.88888888888889,
                            temp_min: 17.15
                        }
                    }
                ],
                idx: 0,
                tempAvgPerDay: '20',
                unit: 'C'
            }
        ];
    }

    function getFData() {
        return [
            {
                city: 'Munich',
                date: '21 Jul 19',
                dateSegment: [
                    {
                        dt_txt: '2019-07-21 03:00:00',
                        main: {
                            temp: 17.88,
                            temp_max: 17.88,
                            temp_min: 17.15
                        }
                    }
                ],
                idx: 0,
                tempAvgPerDay: '20',
                unit: 'F'
            },
            {
                city: 'Munich',
                date: '22 Jul 19',
                dateSegment: [
                    {
                        dt_txt: '2019-07-22 03:00:00',
                        main: {
                            temp: 17.88,
                            temp_max: 17.88,
                            temp_min: 17.15
                        }
                    }
                ],
                idx: 1,
                tempAvgPerDay: '21',
                unit: 'F'
            },
            {
                city: 'Munich',
                date: '23 Jul 19',
                dateSegment: [
                    {
                        dt_txt: '2019-07-23 03:00:00',
                        main: {
                            temp: 17.88,
                            temp_max: 17.88,
                            temp_min: 17.15
                        }
                    }
                ],
                idx: 2,
                tempAvgPerDay: '21',
                unit: 'F'
            },
            {
                city: 'Munich',
                date: '24 Jul 19',
                dateSegment: [
                    {
                        dt_txt: '2019-07-24 03:00:00',
                        main: {
                            temp: 17.88,
                            temp_max: 17.88,
                            temp_min: 17.15
                        }
                    }
                ],
                idx: 3,
                tempAvgPerDay: '21',
                unit: 'F'
            }
        ];
    }
});