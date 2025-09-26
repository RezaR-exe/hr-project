import { createSlice } from '@reduxjs/toolkit';

const absencesSlice = createSlice({
  name: 'absences',
  initialState: {
    data: [],
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase('absences/submitAbsence/fulfilled', (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase('absences/submitAbsence/pending', (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase('absences/submitAbsence/rejected', (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default absencesSlice.reducer;
