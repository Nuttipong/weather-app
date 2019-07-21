import React from 'react';
import { Loading } from './Loading';
import { shallow } from 'enzyme';

describe('Loading', () => {

    beforeEach(() => {
        jest.useFakeTimers();
    });

    it('should render without crashing', () => {
        // given
        const props = {
            loading: 0
        };
        // when
        const wrapper = shallow(<Loading {...props} />);
        // then
        expect(wrapper).toBeDefined();
        // and
        expect(wrapper).toMatchSnapshot();
    });

    it('should called componentDidMount properly', () => {
        // given
        const props = {
            loading: 0
        };
        // when
        shallow(<Loading {...props} />);
        // then
        expect(setInterval).toHaveBeenCalledTimes(1);
        // and
        expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);  
    });

    it('should called componentWillUnmount properly', () => {
        // given
        const props = {
            loading: 0
        };
        // when
        const wrapper = shallow(<Loading {...props} />);
        const instance = wrapper.instance();
        const componentWillUnmount = jest.spyOn(instance, 'componentWillUnmount');
        wrapper.unmount();
        // then
        expect(componentWillUnmount).toHaveBeenCalledTimes(1);
        // and
        expect(clearInterval).toHaveBeenCalledTimes(1);
        // and
        expect(clearInterval).toHaveBeenCalledWith(instance.intervalId);
    });

    it('should render with loading text properly', () => {
        // given
        const propMap = new Map([
            [0, 'Loading .'], 
            [1, 'Loading ..'],
            [2, 'Loading ...'],
            [3, 'Loading .']
        ]);
        for (const map of propMap) {
            // when
            const wrapper = shallow(<Loading loading={1} />);
            wrapper.setState({
                currentCount: map[0]
            });
            // then
            expect(wrapper.text()).toEqual(map[1]);
        }
    });

    it('should render with loading text onece the times reached properly', (done) => {
        // given
        const wrapper = shallow(<Loading loading={1} />);
        const instance = wrapper.instance();
        const currentCount = wrapper.state('currentCount');
        // when
        instance.timer();
        // then
        expect(wrapper.state('currentCount')).toEqual(currentCount + 1);
        // when
        wrapper.setState({
            currentCount: 2
        });
        // and 
        instance.timer();
        // then
        expect(wrapper.state('currentCount')).toEqual(0);
        done();
    });
});