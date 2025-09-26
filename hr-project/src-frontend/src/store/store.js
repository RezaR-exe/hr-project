import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import employeesReducer from './slices/employeesSlice';
import feedbackReducer from './slices/feedbackSlice';
import absenceReducer from './slices/absencesSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    employees: employeesReducer,
    feedback: feedbackReducer,
    absences: absenceReducer,
  },
});

export default store;
