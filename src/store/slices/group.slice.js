import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import {
  addGroup,
  deleteGroup,
  getGroups,
  updateGroup,
} from '../services/group.service';

const initialState = {
  data: null,
  status: 'loading',
};

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGroups.pending, (state) => {
        state.data = null;
        state.status = 'loading';
      })
      .addCase(getGroups.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'loaded';
      })
      .addCase(getGroups.rejected, (state) => {
        state.data = null;
        state.status = 'error';
      })
      .addCase(addGroup.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.status = 'loaded';
      })
      .addCase(addGroup.rejected, (state, action) => {
        console.log(action.error.message);
        state.status = 'loaded';
      })
      .addCase(updateGroup.fulfilled, (state, action) => {
        const updatedGroup = action.payload;
        const groupIndex = state.data.findIndex(
          (group) => group.id === +updatedGroup.id
        );
        if (groupIndex !== -1) {
          state.data[groupIndex] = {
            ...state.data[groupIndex],
            ...updatedGroup.body,
          };
        }
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        const deletedGroupId = action.payload?.id;
        if (deletedGroupId) {
          const groupIndex = state.data?.findIndex(
            (group) => group.id === +deletedGroupId
          );
          if (groupIndex !== -1) {
            state.data?.splice(groupIndex, 1);
          }
        }
      });
  },
});
export const selectGroups = (state) => state.groups.data;
export const selectGroupsLoading = (state) =>
  state.groups.status === 'loading' || false;
export const { reducer: groupsReducer, actions: groupActions } = groupsSlice;
