import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: {},
    error: null,
    isLoading: false,
    isUserLoggedIn: false,
  },
  reducers: {
    logoutUser: (state) => {
      state.isUserLoggedIn = false;
      state.data = [];
      console.log('User logged out');
    },
  },
  extraReducers: (builder) => {
    builder.addCase('user/fetchUser/fulfilled', (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isUserLoggedIn = true;
    });
    builder.addCase('user/fetchUser/pending', (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase('user/fetchUser/rejected', (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
