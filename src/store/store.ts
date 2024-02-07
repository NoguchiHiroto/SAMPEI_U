import { configureStore } from "@reduxjs/toolkit";
import tempReducer from './../slices/tempSlice';
import { TypedUseSelectorHook } from "react-redux";
import { useSelector as rawUseSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    temp: tempReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;