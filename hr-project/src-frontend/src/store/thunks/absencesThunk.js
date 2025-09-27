import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const submitAbsence = createAsyncThunk('absences/submitAbsence', async (payload) => {
  const response = await axios.post('http://localhost:8080/submitabsence', payload);
  return response.data;
});

const fetchAbsences = createAsyncThunk('absences/fetchAbsences', async (payload) => {
  const response = await axios.post('http://localhost:8080/fetchabsences', payload);
  return response.data;
});

const changeAbsenceStatus = createAsyncThunk('absences/changeAbsenceStatus', async (payload) => {
  const response = await axios.post('http://localhost:8080/changeabsencestatus', payload);
  return response.data;
});

export { submitAbsence, fetchAbsences, changeAbsenceStatus };
