import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import employeesReducer from './slices/employeesSlice';
import feedbackReducer from './slices/feedbackSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    employees: employeesReducer,
    feedback: feedbackReducer,
  },
});

export default store;
