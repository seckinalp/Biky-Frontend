import { createSlice, configureStore } from '@reduxjs/toolkit';

// Define your auth slice
export const authSlice = createSlice({
  name: 'auth',
  initialState: { token: '', userID: '' },
  reducers: {
    setTokenAndUserId: (state, action) => {
      state.token = action.payload.token;
      state.userID = action.payload.userId;
    },
    clearTokenAndUserId: (state) => {
      state.token = '';
      state.userID = '';
    },
  },
});

export const { setTokenAndUserId, clearTokenAndUserId } = authSlice.actions;

// Define RootState type
export type RootState = {
  auth: ReturnType<typeof authSlice.reducer>;
};

// Configure the Redux store
const store = configureStore({
  reducer: { auth: authSlice.reducer },
});

export default store;
