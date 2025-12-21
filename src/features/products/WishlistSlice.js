// src/redux/wishlist/wishlistSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchWishlist } from '../../api/fetchwishlist';
import { getGuestWishlist, setGuestWishlist } from '../../Pages/wishlist/LSWishlistAddRemove';

const initialState = {
  wishlist: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      if(!product) return;
      const existingProduct = state.wishlist.find(item => item.product_id === product.product_id);
      if (!existingProduct) {
        state.wishlist.push(product);
      }

      const guestWishlist = getGuestWishlist();
        if (!guestWishlist.find(item => item.product_id === product.product_id)) {
          guestWishlist.push(product);
          setGuestWishlist(guestWishlist);
        }   
    },
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      if(!productId) return;
      state.wishlist = state.wishlist.filter(item => item.product_id !== productId.product_id);

      // Remove from guest localStorage
      const guestWishlist = getGuestWishlist().filter(item => item.product_id !== productId.product_id);
      setGuestWishlist(guestWishlist);
    },
     setWishlist: (state, action) => {
      state.wishlist = action.payload; // for rehydrating Redux
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch wishlist';
      });
  },
});

export const { addToWishlist, removeFromWishlist,setWishlist  } = wishlistSlice.actions;
export default wishlistSlice.reducer;
