import React from 'react';
import { shallow } from 'enzyme';
import BarChart from './BarChart';
import HighchartsReact from 'highcharts-react-official';

describe('BarChart', () => {
    it('should render without crashing', () => {
        // given
        const props = {
            title: 'fake title',
            yAxis: 'fake yAxis title',
            categories: [1, 2, 3],
            data: [10, 20, 30]
        };

        // when
        const wrapper = shallow(<BarChart {...props} />);
        const highchartsComp = wrapper.find(HighchartsReact);

        // then
        expect(wrapper).toBeDefined();
        // and
        expect(highchartsComp.length).toBe(1);
        // and
        expect(highchartsComp.props()).toContainKeys(['highcharts', 'options']);
    });
});