import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch as rawUseDispatch, useSelector as rawUseSelector } from 'react-redux';
import commentReducer from '../slice/commentSlice';
import userReducer from '../slice/userSlice';


const INITIAL_STATE = {
  userName: 'Noguchi',
  temp: 36.0,
  isSymptom: false,
  symptoms: [],
  comments: {},
  inputComment: '',
}

export const store = configureStore({
  reducer: {
    comments: commentReducer,
    users: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
export const useDispatch = () => rawUseDispatch<AppDispatch>();
