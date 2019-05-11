import React, { Component } from 'react'
import {connect} from 'react-redux'

import { guessWord } from '../../actions'

export class UnconnectedInput extends Component {
    constructor(props) {
        super(props);

        this.inputBox = React.createRef();
    }

    submitGuessedWord = (e) => {
        e.preventDefault();
        const guessedWord = this.inputBox.current.value;
        if (guessWord && guessWord.length > 0) {
            this.props.guessWord(guessedWord);
        }
        this.inputBox.current.value = '';
    }
    render() {
        const contents = this.props.success
        ? null
        : (
            <form className="form-inline">
                <input
                    data-test="input-box"
                    ref={this.inputBox}
                    className="mb-2 mx-sm-3"
                    id="word-guess"
                    type="text"
                    placeholer="enter guess" />
                <button
                    data-test="submit-button"
                    onClick={this.submitGuessedWord}
                    className="btn btn-primary mb-2"
                    type="submit">
                    Submit
                </button>
            </form>
        );
        return (
            <div data-test="component-input">
                { contents }
            </div>
        )
    }
}

const mapStateToProps = ({success}) => {
    return { success }
}

export default connect(mapStateToProps, {guessWord})(UnconnectedInput);
