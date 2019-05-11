import React from 'react';
import {shallow} from 'enzyme';

import { findByTestAttr, checkProps } from '../../test/testUtils';
import Congrats from './Congrats';

const defaultProps = {
    success: false,
}
const setUp = (props={}) => {
    const setUpProps = {...defaultProps, ...props };
    return shallow(<Congrats {...setUpProps} />)
}

it('renders without errors', () => {
    const wrapper = setUp();
    const component = findByTestAttr(wrapper, 'component-congrats');
    expect(component.length).toBe(1);
});

it('renders no text when success props is false', () => {
    const wrapper = setUp({ success: false });
    const component = findByTestAttr(wrapper, 'component-congrats');
    expect(component.text()).toBe('');
});

it('renders non-empty congrats message when success prop is true', () => {
    const wrapper = setUp({ success: true });
    const message = findByTestAttr(wrapper, 'congrats-message');
    expect(message.text().length).not.toBe(0);
});

it('does not throw warnings with expected props', () => {
    const expectedProps = {success: false};
    const propError = checkProps(Congrats.propTypes, expectedProps, 'props', Congrats.name);
    expect(propError).toBeUndefined();
})