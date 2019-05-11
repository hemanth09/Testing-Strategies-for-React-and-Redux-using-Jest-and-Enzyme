import React, {Component} from 'react';
import {connect} from 'react-redux'

import './App.css';

import Congrats from './components/Congrats/Congrats'
import GuessedWords from './components/GuessedWords/GuessedWords'
import Input from './components/Input/Input'
import { getSecretWord } from './actions'

export class UnconnectedApp extends Component {
  componentDidMount() {
    this.props.getSecretWord();
  }
  render() {
    const { success, guessedWords } = this.props;
    return (
      <div className="App" data-test="component-app">
        <h1>Find the 5 letter secret word!</h1>
        <Congrats success={success} />
        <Input />
        <GuessedWords guessedWords={guessedWords} />
      </div>
    );
  }
}

const mapSateToProps = (state) => {
  const { success, guessedWords, secretWord } = state;
  return { success, guessedWords, secretWord };
}
export default connect(mapSateToProps, {getSecretWord})(UnconnectedApp);
