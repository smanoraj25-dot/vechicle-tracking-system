import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = import.meta.env.VITE_BACKENDURL;

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/api/users`,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token || localStorage.getItem('token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation({
            query: (userInfo) => ({
               url: 'register',
               method: 'POST',
               body: userInfo,
           }),
       }),
       sendVerificationCode: builder.mutation({
            query: (data) => ({
               url: 'sendverification',
               method: 'POST',
               body: data,
           }),
       }),
       verifyCode: builder.mutation({
            query: (data) => ({
               url: 'verify',
               method: 'POST',
               body: data,
           }),
       }),
        logout: builder.mutation({
            query: () => ({
                url: 'logout',
                method: 'POST',
            }),
        }),
        getUser: builder.query({
            query: () => 'validate-token',
            method: 'POST',
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useSendVerificationCodeMutation,
    useVerifyCodeMutation,
    useLogoutMutation,
    useLazyGetUserQuery,
} = authApi;
