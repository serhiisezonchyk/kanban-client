import { createSlice } from '@reduxjs/toolkit';
import {
  addTask,
  deleteTask,
  getTasksFromGroup,
  updateTask,
} from '../services/task.service';

const initialState = {
  data: null,
  status: 'loading',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasksFromGroup.pending, (state) => {
        state.data = null;
        state.status = 'loading';
      })
      .addCase(getTasksFromGroup.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'loaded';
      })
      .addCase(getTasksFromGroup.rejected, (state) => {
        state.data = null;
        state.status = 'error';
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.status = 'loaded';
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const taskIndex = state.data.findIndex(
          (task) => task.id === +updatedTask.id
        );
        if (taskIndex !== -1) {
          state.data[taskIndex] = {
            ...state.data[taskIndex],
            ...updatedTask.body,
          };
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const deletedTaskId = action.payload?.id;
        if (deletedTaskId) {
          const taskIndex = state.data?.findIndex(
            (task) => task.id === +deletedTaskId
          );
          if (taskIndex !== -1) {
            state.data?.splice(taskIndex, 1);
          }
        }
      });
  },
});
export const selectTasks = (state) => state.tasks.data;
export const selectTasksLoading = (state) =>
  state.tasks.status === 'loading' || false;
export const { reducer: tasksReducer, actions: tasksActions } = tasksSlice;
