import React from 'react';
import WeatherCard from './WeatherCard';
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

describe('WeatherCard', () => {
    it('should render without crashing', () => {
        // given
        const props = {
            city: '',
            tempAvgPerDay: 0,
            unit: '',
            date: '',
            onClickMoreDetail: jest.fn(),
            idx: 0
        };
        // when
        const wrapper = shallow(<WeatherCard {...props} />);
        // then
        expect(wrapper).toBeDefined();
        // and
        expect(wrapper).toMatchSnapshot();
    });

    it('should render with props properly', () => {
        // given
        const onClickMoreDetailMock = jest.fn();
        const props = {
            city: 'fake city',
            tempAvgPerDay: 70,
            unit: 'F',
            date: '08 JUN 1984',
            onClickMoreDetail: onClickMoreDetailMock,
            idx: 0
        };
        // when
        const wrapper = shallow(<WeatherCard {...props} />);
        // then
        expect(wrapper.find(Typography)).toHaveLength(3);
        // and
        expect(wrapper.find(Typography).first().text()).toEqual(props.city);
        // and
        expect(wrapper.find(Typography).at(1).text()).toEqual(`Temp: ${props.tempAvgPerDay}${props.unit}`);
        // and
        expect(wrapper.find(Typography).last().text()).toEqual(`Date: ${props.date}`);
        // when
        wrapper.find(Button).simulate('click');
        // then
        expect(onClickMoreDetailMock).toHaveBeenCalledTimes(1);
    });
});