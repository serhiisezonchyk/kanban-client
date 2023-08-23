import { createAsyncThunk } from '@reduxjs/toolkit';
import { $authHost } from '.';

export const getGroups = createAsyncThunk('groups/getGroups', async () => {
  const { data } = await $authHost.get('api/group');
  return data;
});

export const addGroup = createAsyncThunk('groups/addGroup', async (values) => {
  try {
    const { data } = await $authHost.post('api/group', values);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message[0].message);
  }
});

export const getGroup = async (id) => {
  const { data } = await $authHost.get('api/group/' + id);
  return data;
};

export const deleteGroup = createAsyncThunk(
  'groups/deleteGroup',
  async ({ id }) => {
    const { data } = await $authHost.delete('api/group/' + id);
    return data;
  }
);
export const updateGroup = createAsyncThunk(
  'api/updateGroup',
  async ({ id, values }) => {
    try {
      const { data } = await $authHost.put('api/group/' + id, values);
      return data;
    } catch (error) {
      throw new Error(error.response.data.message[0].message);
    }
  }
);
