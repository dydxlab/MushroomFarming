import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'

import farmingReducer from '../features/farming_minigame/farmingSlice';

const currentVersion = '0.1.1'

let persistedState = localStorage.getItem('reduxState') 
                       ? JSON.parse(localStorage.getItem('reduxState') || '{}')
                       : {}
if(persistedState && persistedState.farming && persistedState.farming.version !== currentVersion){
  persistedState = {}
}
if(persistedState && persistedState.gameState && persistedState.gameState.status && persistedState.gameState.status === 'started'){
   persistedState.gameState.status = 'ready'
}
export const store = configureStore({
  reducer: {
    farming: farmingReducer
  },
  preloadedState: persistedState
},);

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
