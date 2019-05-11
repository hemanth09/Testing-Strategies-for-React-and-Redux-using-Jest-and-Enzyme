import {actionTypes} from '../actions/index'
import successReducer from './successReducer'

it('returns initial state of false when no action is passed', () => {
    const newState = successReducer(undefined, {});
    expect(newState).toBe(false);
})

it('returns state of true upon receiving an action of type CORREECT_GUESS', () => {
    const newState = successReducer(undefined, {type: actionTypes.CORRECT_GUESS});
    expect(newState).toBe(true);
})