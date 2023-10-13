import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://6529716855b137ddc83ed707.mockapi.io/';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async newContact => {
    const response = await axios.post('/contacts', newContact);
    return response.data;
  }
);

export const deleteContact = createAsyncThunk('deleteContact', async id => {
  const response = await axios.delete(`/contacts/${id}`);
  return response.data;
});
