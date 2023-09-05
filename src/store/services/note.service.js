import { createAsyncThunk } from '@reduxjs/toolkit';
import { $authHost } from '.';

export const getNote = createAsyncThunk('note/getNote', async () => {
  const { data } = await $authHost.get('api/note');
  return data;
});

export const updateNote = createAsyncThunk(
  'note/updateNote',
  async ({ values }) => {
    try {
      const { data } = await $authHost.put('api/note', values);
      return data;
    } catch (error) {
      throw new Error(error.response.data.message[0].message);
    }
  }
);
