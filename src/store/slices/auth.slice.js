import { createSlice } from '@reduxjs/toolkit';
import { check, create, login } from '../services/user.service';

const initialState = {
    token: null,
    status: "loading",
};

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout: (state)=>{
            state.token = null;
            state.status = 'loading';
        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(login.pending,(state)=>{
            state.token = null;
            state.statuse = 'loading';
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.token = action.payload;
            state.status = 'loaded';
        })
        .addCase(login.rejected,(state)=>{
            state.token = null;
            state.status = 'error';
        })
        .addCase(check.pending,(state)=>{
            state.token = null;
            state.status = 'loading';
        })
        .addCase(check.fulfilled,(state,action)=>{
            state.token = action.payload.token;
            state.status = 'loaded';
        })
        .addCase(check.rejected,(state)=>{
            state.token = null;
            state.status = 'error';
        })
        .addCase(create.pending,(state)=>{
            state.token = null;
            state.status = 'loading';
        })
        .addCase(create.fulfilled,(state,action)=>{
            state.token = action.payload.token;
            state.status = 'loaded';
        })
        .addCase(create.rejected,(state)=>{
            state.token = null;
            state.status = 'error';
        })
    }
})

export const {reducer: authReduces, actions: authActions} = authSlice;