import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = import.meta.env.VITE_BACKENDURL;

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/api`,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getCart: builder.query({
            query: (userId) => `addtocart/${userId}`,
        }),
        addToCart: builder.mutation({
            query: ({ productId, userId }) => {
                if (userId) {
                    return {
                        url: 'addtocart',
                        method: 'POST',
                        body: { productId, userId },
                    };
                }
                return null;
            },
        }),
        removeFromCart: builder.mutation({
            query: ({ productId, userId }) => {
                if (userId) {
                    return {
                        url: `addtocart/${productId}`,
                        method: 'DELETE',
                    };
                }
                return null;
            },
        }),
    }),
});

export const { useGetCartQuery, useAddToCartMutation, useRemoveFromCartMutation } = cartApi;
