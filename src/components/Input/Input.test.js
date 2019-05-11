import React from 'react'
import{ shallow } from 'enzyme'

import { findByTestAttr, storeFactory } from '../../test/testUtils'
import Input, {UnconnectedInput} from './Input'

const setUp = (initialState={}) => {
    const store = storeFactory(initialState);
    const wrapper = shallow(<Input store={store}/>).dive().dive();
    return wrapper;
}

describe('word has not been guessed', () => {
    let wrapper;
    beforeEach(() => {
        const initialState = {success: false}
        wrapper = setUp(initialState)
    })
    it('renders component without errors', () => {
        const component = findByTestAttr(wrapper, 'component-input')
        expect(component.length).toBe(1)
    });
    it('renders input box', () => {
        const inputBox = findByTestAttr(wrapper, 'input-box')
        expect(inputBox.length).toBe(1)
    });
    it('renders submit button', () => {
        const submitButton = findByTestAttr(wrapper, 'submit-button')
        expect(submitButton.length).toBe(1)
    });
});

describe('word has been guessed', () => {
    let wrapper;
    beforeEach(() => {
        const initialState = {success: true}
        wrapper = setUp(initialState);
    })
    it('renders component without errors', () => {
        const component = findByTestAttr(wrapper, 'component-input')
        expect(component.length).toBe(1)
    })
    it('does not renders input box', () => {
        const inputBox = findByTestAttr(wrapper, 'input-box')
        expect(inputBox.length).toBe(0)
    })
    it('does not renders submit button', () => {
        const submitButton = findByTestAttr(wrapper, 'submit-button')
        expect(submitButton.length).toBe(0)
    })
})

describe('redux props', () => {
    it('has success peice of state as props', () => {
        const success = true;
        const wrapper = setUp({success});
        const successProp = wrapper.instance().props.success;
        expect(successProp).toBe(success);
    })
})

describe('guessWord action creator call', () => {
    let guessWordMock;
    let wrapper;
    const guessedWord = 'train'
    beforeEach(() => {
        guessWordMock = jest.fn();
        const props = {
            guessWord: guessWordMock,
        }
        wrapper = shallow(<UnconnectedInput {...props} />)
        
        wrapper.instance().inputBox.current = { value: guessedWord }
        const button = findByTestAttr(wrapper, 'submit-button')
        button.simulate('click', {preventDefault() {}});
    })

    it('call guessWord when button is click', () => {
        const guessWordCallCount = guessWordMock.mock.calls.length
        expect(guessWordCallCount).toBe(1)
    })
    it('calls guessWord with input value as argument', () => {
        const guessWordArg = guessWordMock.mock.calls[0][0];
        expect(guessWordArg).toBe(guessedWord);
    })
    it('input box clears on submit', () => {
        expect(wrapper.instance().inputBox.current.value).toBe('');
    })
})