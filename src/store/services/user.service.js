import { createAsyncThunk } from '@reduxjs/toolkit';
import { $authHost, $host } from '.';
import jwt_decode from 'jwt-decode';

export const login = createAsyncThunk('auth/login', async (values) => {
  try {
    const { data } = await $host.post('api/user/login', values);
    const decoded = jwt_decode(data.token);
    return { user: decoded, token: data.token };
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const check = createAsyncThunk('auth/check', async () => {
  const { data } = await $authHost.get('api/user/auth');
  const decoded = jwt_decode(data.token);
  return { user: decoded, token: data.token };
});

export const create = createAsyncThunk('auth/create', async (values) => {
  try {
    const { data } = await $host.post('api/user/create', values);
    const decoded = jwt_decode(data.token);
    return { user: decoded, token: data.token };
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
