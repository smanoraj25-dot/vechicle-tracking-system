import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = import.meta.env.VITE_BACKENDURL;

export const wishlistApi = createApi({
    reducerPath: 'wishlistApi',
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
        getWishlist: builder.query({
            query: (userId) => `wishlist/${userId}`,
        }),
        addToWishlist: builder.mutation({
            query: (product) => ({
                url: 'wishlist',
                method: 'POST',
                body: product,
            }),
        }),
        removeFromWishlist: builder.mutation({
            query: (productId) => ({
                url: `wishlist/${productId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetWishlistQuery, useAddToWishlistMutation, useRemoveFromWishlistMutation } = wishlistApi;
