import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
  const response = await axios.get('http://localhost:8080/importemployees');
  return response.data;
});

export { fetchEmployees };
