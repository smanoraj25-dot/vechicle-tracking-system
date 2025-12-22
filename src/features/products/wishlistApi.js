import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = import.meta.env.VITE_BACKENDURL;

export const wishlistApi = createApi({
    reducerPath: 'wishlistApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/api/wishlist`,
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
            query: (userId) => `${userId}`,
        }),
        addToWishlist: builder.mutation({
            query: ({ productId, userId }) => {
                if (userId) {
                    return {
                        url: 'add',
                        method: 'POST',
                        body: { productId, userId },
                    };
                }
                return null;
            },
        }),
        removeFromWishlist: builder.mutation({
            query: ({ productId, userId }) => {
                if (userId) {
                    return {
                        url: 'remove',
                        method: 'DELETE',
                        body: { productId, userId },
                    };
                }
                return null;
            },
        }),
    }),
});

export const { useGetWishlistQuery, useAddToWishlistMutation, useRemoveFromWishlistMutation } = wishlistApi;
