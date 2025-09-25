import { createSlice } from '@reduxjs/toolkit';
import { submitFeedback } from '../thunks/feedbackThunk';

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    data: [],
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitFeedback.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(submitFeedback.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(submitFeedback.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default feedbackSlice.reducer;
