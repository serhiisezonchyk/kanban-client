import { createAsyncThunk } from '@reduxjs/toolkit';
import { $authHost } from '.';

export const getCategoriesFromGroup = createAsyncThunk(
  'categories/getCategoriesFromGroup',
  async (group_id) => {
    const { data } = await $authHost.get('api/category', {
      params: {
        group_id: group_id,
      },
    });
    return data;
  }
);

export const addCategory = createAsyncThunk(
  'categories/addCategory',
  async (values) => {
    try {
      const { data } = await $authHost.post('api/category', values);
      return data;
    } catch (error) {
      throw new Error(error.response.data.message[0].message);
    }
  }
);
export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async ({ id }) => {
    const { data } = await $authHost.delete('api/category/' + id);
    return data;
  }
);
export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({id,values}) => {
    try {
      const { data } = await $authHost.put('api/category/'+ id, values);
      return data;
    } catch (error) {
      throw new Error(error.response.data.message[0].message);
    }
  }
);
