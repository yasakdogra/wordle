import { configureStore } from '@reduxjs/toolkit'
import wordleReducer from  './wordleSlice'



export const store = configureStore({
  reducer: {
    wordle: wordleReducer
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
