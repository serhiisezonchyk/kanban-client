import { createSlice } from '@reduxjs/toolkit';
import { getNote, updateNote } from '../services/note.service';

const initialState = {
  data: null,
  status: 'loading',
};

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNote.pending, (state) => {
        state.data = null;
        state.status = 'loading';
      })
      .addCase(getNote.fulfilled, (state, action) => {
        state.data = action.payload.text;
        state.status = 'loaded';
      })
      .addCase(getNote.rejected, (state) => {
        state.data = null;
        state.status = 'error';
      })

      .addCase(updateNote.fulfilled, (state, action) => {
        state.data = action.payload.body.text;
      });
  },
});
export const selectNote = (state) => state.note.data;
export const selectNoteLoading = (state) =>
  state.note.status === 'loading' || false;
export const { reducer: noteReducer, actions: noteActions } = noteSlice;
