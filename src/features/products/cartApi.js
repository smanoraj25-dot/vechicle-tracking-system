import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = import.meta.env.VITE_BACKENDURL;

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api` }),
    endpoints: (builder) => ({
        getCart: builder.query({
            query: () => 'cart',
        }),
        addToCart: builder.mutation({
            query: (product) => ({
                url: 'cart',
                method: 'POST',
                body: product,
            }),
        }),
        removeFromCart: builder.mutation({
            query: (productId) => ({
                url: `cart/${productId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetCartQuery, useAddToCartMutation, useRemoveFromCartMutation } = cartApi;
