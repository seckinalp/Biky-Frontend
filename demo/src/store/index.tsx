import { createSlice, configureStore } from '@reduxjs/toolkit';

export const tokenSlice = createSlice({
  name: 'auth_token',
  initialState: { token: "" },
  reducers: {
    change(state,action) {
      state.token = action.payload;
    }
  },
});

const store = configureStore({
  reducer: { token: tokenSlice.reducer},
});

export default store;