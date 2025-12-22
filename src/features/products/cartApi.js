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
            async queryFn({ productId, userId }, _queryApi, _extraOptions, baseQuery) {
                if (!userId) {
                    return { data: {} };
                }
                const result = await baseQuery({
                    url: 'addtocart/add',
                    method: 'POST',
                    body: { productId, userId },
                });
                return result;
            },
        }),
        removeFromCart: builder.mutation({
            async queryFn({ productId, userId }, _queryApi, _extraOptions, baseQuery) {
                if (!userId) {
                    return { data: {} };
                }
                const result = await baseQuery({
                    url: `addtocart/remove`,
                    method: 'DELETE',
                    body: { productId, userId },
                });
                return result;
            },
        }),
    }),
});

export const { useGetCartQuery, useAddToCartMutation, useRemoveFromCartMutation } = cartApi;
