import { createSlice } from '@reduxjs/toolkit';
import { authApi } from './authApi';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogin: false,
        user: null,
        loading: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isLogin = true;
            state.loading = false;
        },
        clearUser: (state) => {
            state.user = null;
            state.isLogin = false;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                authApi.endpoints.login.matchPending,
                (state) => {
                    state.loading = true;
                }
            )
            .addMatcher(
                authApi.endpoints.login.matchFulfilled,
                (state, action) => {
                    state.user = action.payload;
                    state.isLogin = true;
                    state.loading = false;
                }
            )
            .addMatcher(
                authApi.endpoints.login.matchRejected,
                (state) => {
                    state.loading = false;
                }
            )
            .addMatcher(
                authApi.endpoints.logout.matchFulfilled,
                (state) => {
                    state.user = null;
                    state.isLogin = false;
                }
            );
    },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
