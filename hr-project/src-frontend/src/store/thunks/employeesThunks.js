import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
  const response = await axios.get('http://localhost:8080/importemployees');
  return response.data;
});

const fetchEmployeeFullData = createAsyncThunk(
  'employees/fetchEmployeeFullData',
  async (employeeData) => {
    const response = await axios.post('http://localhost:8080/employeedata', {
      employeeId: employeeData.employeeId,
      userType: employeeData.userType,
      currentlyLoggedEmployeeId: employeeData.currentlyLoggedEmployeeId,
    });
    return response.data;
  },
);

const editEmployeeData = createAsyncThunk(
  'employees/editEmployeeData',
  async ({ employeeData, requestedUserId, requestedUserType }) => {
    const response = await axios.post('http://localhost:8080/editemployeedata', {
      employeeData: employeeData,
      requestedUserId: requestedUserId,
      requestedUserType: requestedUserType,
    });
    return response.data;
  },
);

export { fetchEmployees, fetchEmployeeFullData, editEmployeeData };

// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
