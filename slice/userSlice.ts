import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserResponse } from '../types/user';

interface UserState {
  currentUser: UserResponse | null;
  groupUsers: UserResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  groupUsers: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserResponse>) => {
      state.currentUser = action.payload;
    },
    setGroupUsers: (state, action: PayloadAction<UserResponse[]>) => {
      state.groupUsers = action.payload;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { 
  setCurrentUser, 
  setGroupUsers, 
  clearCurrentUser, 
  setLoading, 
  setError 
} = userSlice.actions;

export default userSlice.reducer;