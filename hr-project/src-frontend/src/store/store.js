import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import employeesReducer from './slices/employeesSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    employees: employeesReducer,
  },
});

export default store;
