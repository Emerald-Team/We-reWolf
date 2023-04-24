import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import gameReducer from './gameSlice'

const rootReducer = combineReducers({
  gameState: gameReducer,
  // add other reducers here if you have any
})

const store = configureStore({
  reducer: rootReducer
})

export default store
