import { createSlice } from '@reduxjs/toolkit';
import { productApi } from './productApi';

const initialState = {
    products: [],
    prod_loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(
                productApi.endpoints.getProducts.matchPending,
                (state) => {
                    state.prod_loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                productApi.endpoints.getProducts.matchFulfilled,
                (state, action) => {
                    state.prod_loading = false;
                    state.products = action.payload;
                }
            )
            .addMatcher(
                productApi.endpoints.getProducts.matchRejected,
                (state, action) => {
                    state.prod_loading = false;
                    state.error = action.error.message;
                }
            );
    },
});

export default productSlice.reducer;
