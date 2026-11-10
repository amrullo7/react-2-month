import { configureStore } from '@reduxjs/toolkit'
import  counterSlice  from './counter'

export const store = configureStore({
  reducer: {
    counter:counterSlice
  }
})

// Infer the `RootState`, `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store