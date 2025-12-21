

// src/redux/carts/cartsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchaddtoCard } from '../../api/fetchAddtocard';
import { getGuestCart, setGuestCart } from '../../Pages/Cart/LSCartAddRemove';

const initialState = {
  carts: [],
  loading: false,
  error: null,
};

const Cartslice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      if(!product) return;
      const existingProduct = state.carts.find(item => item.product_id === product?.product_id);
      if (!existingProduct) {
        state.carts.push(product);
      }
      // Update guest localStorage
      const guestCart = getGuestCart();
        if (!guestCart.find(item => item.product_id === product?.product_id)) {
          guestCart.push(product);
          setGuestCart(guestCart);
        }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;  
      if(!productId) return;
      state.carts = state.carts.filter(item => item.product_id !== productId);
       // Update guest localStorage
      const guestCart = getGuestCart().filter(
        (item) => item.product_id !== productId
      );
      setGuestCart(guestCart);
    },
    setCart: (state, action) => {
      state.carts = action.payload; // Used for rehydrating Redux from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchaddtoCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchaddtoCard.fulfilled, (state, action) => {
        state.loading = false;
        state.carts = action.payload;
      })
      .addCase(fetchaddtoCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch carts';
      });
  },
});

export const { addToCart, removeFromCart, setCart } = Cartslice.actions;
export default Cartslice.reducer;







