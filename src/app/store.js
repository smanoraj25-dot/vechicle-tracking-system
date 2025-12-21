import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/ProductSlice';
import cartReducer from '../features/products/AddtoCardSlice';
import wishlistReducer from "../features/products/WishlistSlice";
import authReducer from "../features/users/authSlice.js";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    carts:cartReducer,
    wishlist:wishlistReducer,
    auth: authReducer,
    
  },
});
