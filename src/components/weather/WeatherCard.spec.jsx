import React from 'react';
import { shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';

export function Cat() {
    return (
        <div>
            Cat
            <Dog />
        </div>
    );
}

export function Dog() {
    return (
        <div>Dog</div>
    );
}

export function Foo() {
    return (
        <div>Foo</div>
    );
}

describe('<WeatherCard />', () => {

    it('Foo', () => {
        const wrapper = shallow(<Foo />);
        expect(wrapper).toBeDefined();
    });

    it('Dog', () => {
        const wrapper = mount(<Dog />);
        expect(wrapper).toBeDefined();
    });

    it('Cat', () => {
        const wrapper = render(<Cat />);
        expect(wrapper).toBeDefined();
    });

    it('renders correctly', () => {
        const tree = renderer
          .create(<Cat />)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
});
