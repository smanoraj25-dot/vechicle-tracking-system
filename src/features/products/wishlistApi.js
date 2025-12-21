import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = import.meta.env.VITE_BACKENDURL;

export const wishlistApi = createApi({
    reducerPath: 'wishlistApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api` }),
    endpoints: (builder) => ({
        getWishlist: builder.query({
            query: () => 'wishlist',
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
