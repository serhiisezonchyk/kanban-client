import {createAsyncThunk} from "@reduxjs/toolkit"
import { $authHost, $host } from '.'
import jwt_decode from "jwt-decode"

export const login = createAsyncThunk(
    "auth/login",
    async(values)=>{
        const {data} = await $host.post("api/user/login", values);
        const decoded = jwt_decode(data.token);
        return {user: decoded, token: data.token};
    }
)

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const check = createAsyncThunk("auth/check",async()=>{
    const {data} = await $authHost.get("api/user/auth");
    const decoded = jwt_decode(data.token);
    return {user: decoded, token: data.token};
})

export const create = createAsyncThunk(
    "auth/create",
    async(values)=>{
        const {data} = await $host.post("api/user/create", values);
        return data;
    }
)