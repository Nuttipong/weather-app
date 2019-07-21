import React from 'react';
import WeatherInfo from './WeatherInfo';
import { shallow } from 'enzyme';
import { LeftArrow } from '../common/LeftArrow';
import { RightArrow } from '../common/RightArrow';
import WeatherCardList from './WeatherCardList';

describe('WeatherInfo', () => {
    it('should render without crashing', () => {
        // given
        const props = {
            prevClickAble: false,
            nextClickAble: true,
            tempModel: [],
            prev: jest.fn(),
            next: jest.fn(),
            startIndex: 0,
            pageSize: 3,
            onClickMoreDetail: jest.fn()
        };
        // when
        const wrapper = shallow(<WeatherInfo {...props} />);
        // then
        expect(wrapper).toBeDefined();
        // and
        expect(wrapper).toMatchSnapshot();
    });

    it('should contain sub components properly', () => {
        // given
        const props = {
            prevClickAble: false,
            nextClickAble: true,
            tempModel: [],
            prev: jest.fn(),
            next: jest.fn(),
            startIndex: 0,
            pageSize: 3,
            onClickMoreDetail: jest.fn()
        };
        // when
        const wrapper = shallow(<WeatherInfo {...props} />);
        // then
        expect(wrapper.find(LeftArrow)).toHaveLength(1);
        // and
        expect(wrapper.find(RightArrow)).toHaveLength(1);
        // and
        expect(wrapper.find(WeatherCardList)).toHaveLength(1);
    });

    it('should click able on lett arrow component properly', () => {
        // given
        const prevMock = jest.fn();
        const props = {
            prevClickAble: true,
            nextClickAble: false,
            tempModel: [],
            prev: prevMock,
            next: jest.fn(),
            startIndex: 0,
            pageSize: 3,
            onClickMoreDetail: jest.fn()
        };
        // when
        const wrapper = shallow(<WeatherInfo {...props} />);
        // then
        expect(wrapper.find(LeftArrow)).toHaveLength(1);
        
        // when
        wrapper.find(LeftArrow).simulate('click');
        // then
        expect(prevMock).toHaveBeenCalledTimes(1);
        // nand
        expect(wrapper.find(LeftArrow).prop('size')).toEqual(72);
    });

    it('should click able on right arrow component properly', () => {
        // given
        const nextMock = jest.fn();
        const props = {
            prevClickAble: false,
            nextClickAble: true,
            tempModel: [],
            prev: jest.fn(),
            next: nextMock,
            startIndex: 0,
            pageSize: 3,
            onClickMoreDetail: jest.fn()
        };
        // when
        const wrapper = shallow(<WeatherInfo {...props} />);
        // then
        expect(wrapper.find(RightArrow)).toHaveLength(1);
        
        // when
        wrapper.find(RightArrow).simulate('click');
        // then
        expect(nextMock).toHaveBeenCalledTimes(1);
        // nand
        expect(wrapper.find(RightArrow).prop('size')).toEqual(72);
    });
});