import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchUser = createAsyncThunk('user/fetchUser', async (userObject) => {
  const response = await axios.post('http://localhost:8080/login', {
    userObject,
  });
  return response.data;
});

export { fetchUser };
