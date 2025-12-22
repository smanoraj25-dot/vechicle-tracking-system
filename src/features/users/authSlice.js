import { createSlice } from '@reduxjs/toolkit';
import { authApi } from './authApi';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token') || null,
        isLogin: false,
        user: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isLogin = !!action.payload;
        },
        clearAuth: (state) => {
            state.user = null;
            state.isLogin = false;
            state.token = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
            })
            .addMatcher(authApi.endpoints.register.matchFulfilled, (state, action) => {
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
            })
            .addMatcher(authApi.endpoints.getUser.matchFulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isLogin = true;
            })
    },
});

export const { setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;
