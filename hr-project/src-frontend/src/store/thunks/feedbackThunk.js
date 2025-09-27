import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const submitFeedback = createAsyncThunk('feedback/submitFeedback', async (payload) => {
  const response = await axios.post('http://localhost:8080/submitfeedback', payload);
  return response.data;
});

const rephraseFeedback = createAsyncThunk('feedback/rephraseFeedback', async (payload) => {
  const response = await axios.post('http://localhost:8080/paraphrase', payload);
  return response.data;
});

export { submitFeedback, rephraseFeedback };
