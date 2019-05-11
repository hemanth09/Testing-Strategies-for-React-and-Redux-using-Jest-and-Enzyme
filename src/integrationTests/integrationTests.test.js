import { storeFactory } from '../test/testUtils'
import { guessWord } from '../actions/index'

describe('guessWord action dispatcher', () => {
    const secretWord = 'party';
    const unsucessfulGuess = 'train';
    describe('no guess words', () => {
        let store;
        const insitialState = { secretWord };
        beforeEach(() => {
            store = storeFactory(insitialState);
        })
        it('updates state correctly for unsucessful guess', () => {
            store.dispatch(guessWord(unsucessfulGuess));
            const newState = store.getState()
            const expectedState = {
                ...insitialState,
                success: false,
                guessedWords: [{
                    guessedWord: unsucessfulGuess,
                    letterMatchCount: 3, 
                }]
            }
            expect(newState).toEqual(expectedState);
        });
        it('updates state correctly for sucessful guess', () => {
            beforeEach(() => {
                store = storeFactory(insitialState);
            })
            store.dispatch(guessWord(secretWord));
            const newState = store.getState();
            const expectedState = {
                secretWord,
                success: true,
                guessedWords: [{
                    guessedWord: secretWord,
                    letterMatchCount: 5,
                }]
            };
            expect(newState).toEqual(expectedState);
        });
    });

    describe('some guess words', () => {
        const guessedWords = [{ guessedWord: 'agile', letterMatchCount: 1}];
        const initialState = { guessedWords, secretWord}
        let store;
        beforeEach(() => {
            store = storeFactory(initialState);
        })
        it('updates state correctly for unsucessful guess', () => {
            store.dispatch(guessWord(unsucessfulGuess));
            const newState = store.getState();
            const expectedState = {
                secretWord,
                success: false,
                guessedWords: [...guessedWords, { guessedWord: unsucessfulGuess, letterMatchCount: 3}]
            };
            expect(newState).toEqual(expectedState);
        });
        it('updates state correctly for sucessful guess', () => {
            store.dispatch(guessWord(secretWord));
            const newState = store.getState();
            const expectedState = {
                secretWord,
                success: true,
                guessedWords: [...guessedWords, { guessedWord: secretWord, letterMatchCount: 5}]
            };
            expect(newState).toEqual(expectedState);
        });
    });
})