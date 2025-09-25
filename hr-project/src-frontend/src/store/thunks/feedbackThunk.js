import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const submitFeedback = createAsyncThunk('feedback/submitFeedback', async (payload) => {
  const response = await axios.post('http://localhost:8080/submitfeedback', payload);
  return response.data;
});

export { submitFeedback };
