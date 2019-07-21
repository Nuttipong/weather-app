import React from 'react';
import TempSwitch from './TempSwitch';
import { shallow } from 'enzyme';
import RadioGroup from '@material-ui/core/RadioGroup';

describe('TempSwitch', () => {
    it('should render without crashing', () => {
        // given
        const handleChangeMock = jest.fn();
        const props = {
            tempType: '',
            handleChange: handleChangeMock
        };
        // when
        const wrapper = shallow(<TempSwitch {...props} />);
        // then
        expect(wrapper).toBeDefined();
        // and
        expect(wrapper).toMatchSnapshot();
    });

    it('should render with props properly', () => {
        // given
        const handleChangeMock = jest.fn();
        const props = {
            tempType: '12345',
            handleChange: handleChangeMock
        };
        // when
        const wrapper = shallow(<TempSwitch {...props} />);
        // then
        expect(wrapper.find(RadioGroup)).toHaveLength(1);
        // and
        expect(wrapper.find(RadioGroup).prop('value')).toEqual(props.tempType);
        // and
        expect(wrapper.find(RadioGroup).prop('onChange')).toEqual(handleChangeMock);
        
        // when
        wrapper.find(RadioGroup).prop('onChange')();
        // and
        expect(handleChangeMock).toHaveBeenCalledTimes(1);
    });
});