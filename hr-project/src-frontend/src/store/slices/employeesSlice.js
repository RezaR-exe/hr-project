import { createSlice } from '@reduxjs/toolkit';

const employeesSlice = createSlice({
  name: 'employees',
  initialState: {
    data: [],
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase('employees/fetchEmployees/fulfilled', (state, action) => {
      state.data = action.payload;
    });
    builder.addCase('employees/fetchEmployees/pending', (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase('employees/fetchEmployees/rejected', (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default employeesSlice.reducer;
