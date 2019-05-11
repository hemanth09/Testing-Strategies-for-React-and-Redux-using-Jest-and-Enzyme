import React from 'react';
import {shallow} from 'enzyme'
import App, {UnconnectedApp} from './App';

import {findByTestAttr, storeFactory} from './test/testUtils'

const setUp = (state={}) => {
  const store = storeFactory(state);
  const wrapper = shallow(<App store={store} />).dive().dive()
  return wrapper;
}

describe('redux properties', () => {
  it('renders without crashing', () => {
    const wrapper = setUp();
    const component = findByTestAttr(wrapper, 'component-app');
    expect(component.length).toBe(1);
  });
  it('has access to `success` state', () => {
    const success = true;
    const wrapper = setUp({ success });
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });
  it('has access to `secretWord` state', () => {
    const secretWord = 'party';
    const wrapper = setUp({ secretWord });
    const secretWordProp = wrapper.instance().props.secretWord;
    expect(secretWordProp).toBe(secretWord);
  });
  it('has access to `guessedWords` state', () => {
    const guessedWords = [{ guessedWord: 'train', letterMatchCount: 3 }];
    const wrapper = setUp({ guessedWords });
    const guessedWordsProp = wrapper.instance().props.guessedWords;
    expect(guessedWordsProp).toEqual(guessedWords);
  });
  it('`getSecretWord` action creator is a function on the props', () => {
    const wrapper = setUp();
    const getSecretWordProp = wrapper.instance().props.getSecretWord;
    expect(getSecretWordProp).toBeInstanceOf(Function);
  });
});

it('getSecretWord runs on APP mount', () => {
    const getSecretWordMock = jest.fn();

    const props = {
      getSecretWord: getSecretWordMock,
      success: false,
      guessedWords: [],
    }
    //set up app component with getSecretWordMock as the get secretWord prop
    const wrapper = shallow(<UnconnectedApp {...props} />);

    // run lifecycle method  
    wrapper.instance().componentDidMount();

    //check to see if mock ran
    const getSecretWordCallCount = getSecretWordMock.mock.calls.length;

    expect(getSecretWordCallCount).toBe(1)
})