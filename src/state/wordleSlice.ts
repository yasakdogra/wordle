import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { WORDLIST } from "./Words";

import words from '../assets/words.txt?raw';
const WORDLIST = words.split("\n");

export type LocType = "correct" | "present" | "absent" | "unknown";
export type LetterType = {
    value: string;
    loc: LocType;
}

export type WordType = LetterType[];

interface WordleState {
	secret: string;
    current: string;
    guesses: WordType[];
    correct: string[];
    present: string[];
    absent: string[];
    finished?: boolean;
}

const initialState: WordleState = {
    secret: WORDLIST[Math.floor(Math.random() * WORDLIST.length)].toUpperCase(),
    current: "",
    guesses: [],
    correct: [],
    present: [],
    absent: [],
    finished: false
}

const wordleSlice = createSlice({
    name: "wordle",
    initialState,
    reducers: {
        newGame(state) {
            state.secret = WORDLIST[Math.floor(Math.random() * WORDLIST.length)].toUpperCase();
            state.current = "";
            state.guesses = [];
            state.correct = [];
            state.present = [];
            state.absent = [];
            state.finished = false;
        },
        addChar(state, action: PayloadAction<string>) {
            if (state.finished)
                return
            if(state.current.length < 5)
                state.current += action.payload;
        },
        delChar(state) {
            if(state.current.length > 0)
                state.current = state.current.slice(0, -1)
        },
        submitGuess(state) {
            if(state.finished)
                return
            if(state.guesses.length >=6)
                return
            if(state.current.length < 5)
                return
            if(!WORDLIST.includes(state.current))
                return
            let guess : WordType = [];
            for (let i = 0; i < 5; i++) {
                guess.push({ value: "", loc: "absent" })
            }

            state.current.split("").forEach((letter, index) => {
                guess[index].value = letter
                if (letter === state.secret[index]) {
                    guess[index].loc = "correct"
                    !state.correct.includes(letter) && state.correct.push(letter)
                } else if (state.secret.includes(letter)) {
                    guess[index].loc = "present"
                    !state.present.includes(letter) && state.present.push(letter)
                } else {
                    guess[index].loc = "absent"
                    !state.absent.includes(letter) && state.absent.push(letter)
                }
            })
            state.guesses.push(guess)
            if (state.current === state.secret || state.guesses.length === 6) {
                state.finished = true;
            }
            state.current = "";
        }
    }
});

export const { newGame, addChar, delChar, submitGuess } = wordleSlice.actions;
export default wordleSlice.reducer;
