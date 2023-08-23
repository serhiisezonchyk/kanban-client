import { createAsyncThunk } from '@reduxjs/toolkit';
import { $authHost } from '.';

export const getTasksFromGroup = createAsyncThunk(
  'tasks/getTasksFromGroup',
  async (group_id) => {
    const { data } = await $authHost.get('api/task', {
      params: {
        group_id: group_id,
      },
    });
    return data;
  }
);

export const getOneTask = async (id) => {
  try {
    const { data } = await $authHost.get('api/task/'+ id);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message[0].message);
  }
};

export const addTask = createAsyncThunk('tasks/addTask', async (values) => {
  try {
    const { data } = await $authHost.post('api/task', values);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message[0].message);
  }
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({id,values}) => {
    try {
      const { data } = await $authHost.put('api/task/'+ id, values);
      return data;
    } catch (error) {
      throw new Error(error.response.data.message[0].message);
    }
  });
  
  export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async ({ id }) => {
      const { data } = await $authHost.delete('api/task/' + id);
      return data;
    }
  );