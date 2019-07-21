import React from 'react';
import WeatherCardList from './WeatherCardList';
import { shallow } from 'enzyme';
import WeatherCard from './WeatherCard';

describe('WeatherCardList', () => {
    it('should render without crashing', () => {
        // given
        const props = {
            model: [{
                city: 'Munich',
                tempAvgPerDay: 10,
                unit: 'F',
                date: '08 JUN 1984',
                idx: 0
            },
            {
                city: 'Munich',
                tempAvgPerDay: 20,
                unit: 'F',
                date: '09 JUN 1984',
                idx: 1
            },
            {
                city: 'Munich',
                tempAvgPerDay: 30,
                unit: 'F',
                date: '10 JUN 1984',
                idx: 2
            },
            {
                city: 'Munich',
                tempAvgPerDay: 40,
                unit: 'F',
                date: '11 JUN 1984',
                idx: 3
            },
            {
                city: 'Munich',
                tempAvgPerDay: 50,
                unit: 'F',
                date: '12 JUN 1984',
                idx: 4
            }],
            pageSize: 3,
            startIndex: 0,
            onClickMoreDetail: jest.fn(),
        };
        // when
        const wrapper = shallow(<WeatherCardList {...props} />);
        // then
        expect(wrapper).toBeDefined();
        // and
        expect(wrapper).toMatchSnapshot();
    });

    it('should render with props properly', () => {
        // given
        const onClickMoreDetailMock = jest.fn();
        const props = {
            model: [
            {
                city: 'Munich',
                tempAvgPerDay: 10,
                unit: 'F',
                date: '08 JUN 1984',
                idx: 0
            },
            {
                city: 'Munich',
                tempAvgPerDay: 20,
                unit: 'F',
                date: '09 JUN 1984',
                idx: 1
            },
            {
                city: 'Munich',
                tempAvgPerDay: 30,
                unit: 'F',
                date: '10 JUN 1984',
                idx: 2
            },
            {
                city: 'Munich',
                tempAvgPerDay: 40,
                unit: 'F',
                date: '11 JUN 1984',
                idx: 3
            },
            {
                city: 'Munich',
                tempAvgPerDay: 50,
                unit: 'F',
                date: '12 JUN 1984',
                idx: 4
            }],
            pageSize: 3,
            startIndex: 0,
            onClickMoreDetail: onClickMoreDetailMock,
        };
        // when
        const wrapper = shallow(<WeatherCardList {...props} />);
        // then
        expect(wrapper.find(WeatherCard)).toHaveLength(3);
        // when
        wrapper.find(WeatherCard).at(0).prop('onClickMoreDetail')();
        // then
        expect(onClickMoreDetailMock).toHaveBeenCalledTimes(1);
    });
});