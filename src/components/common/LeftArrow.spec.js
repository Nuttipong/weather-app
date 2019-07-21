import React from 'react';
import { shallow } from 'enzyme';
import { LeftArrow } from './LeftArrow';
import { MdKeyboardArrowLeft } from "react-icons/md";

describe('LeftArrow', () => {
    it('should render without crashing', () => {
        // given
        const props = {
            clickAble: false,
        };
        // when
        const wrapper = shallow(<LeftArrow {...props} />);
        // then
        expect(wrapper).toBeDefined();
        // and
        expect(wrapper).toMatchSnapshot();
    });

    it('should render with specific size default properly', () => {
        // given
        const expectedSize = 72;
        const props = {
            clickAble: false
        };
        // when
        const wrapper = shallow(<LeftArrow {...props} />);
        const comp = wrapper.find(MdKeyboardArrowLeft);
        // then
        expect(comp.prop('size')).toBe(expectedSize);
    });

    it('should render with specific size properly', () => {
        // given
        const expectedSize = 32;
        const props = {
            clickAble: false,
            size: 32
        };
        // when
        const wrapper = shallow(<LeftArrow {...props} />);
        const comp = wrapper.find(MdKeyboardArrowLeft);
        // then
        expect(comp.prop('size')).toBe(expectedSize);
    });

    it('should render arrow color properly when click able is true', () => {
        // given
        const expectedColor = "#3F51B5";
        const props = {
            clickAble: true
        };
        // when
        const wrapper = shallow(<LeftArrow {...props} />);
        const comp = wrapper.find(MdKeyboardArrowLeft);
        // then
        expect(comp.prop('color')).toBe(expectedColor);
    });

    it('should render arrow color properly when click able is false', () => {
        // given
        const expectedColor = "#6C6C6C";
        const props = {
            clickAble: false
        };
        // when
        const wrapper = shallow(<LeftArrow {...props} />);
        const comp = wrapper.find(MdKeyboardArrowLeft);
        // then
        expect(comp.prop('color')).toBe(expectedColor);
    });

    it('should emit onClick properly', () => {
        // given
        const props = {
            clickAble: true,
            onClick: jest.fn()
        };
        // when
        const wrapper = shallow(<LeftArrow {...props} />);
        // and
        wrapper.first().prop('onClick')();
        // then
        expect(props.onClick).toHaveBeenCalledTimes(1);
    });
});