import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from '../../api/fetchProduct';

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
      .addCase(fetchProducts.pending, (state) => {
        state.prod_loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.prod_loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.prod_loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
