import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/ProductSlice';
import cartReducer from '../features/products/AddtoCardSlice';
import wishlistReducer from '../features/products/WishlistSlice';
import authReducer from '../features/users/authSlice.js';
import { productApi } from '../features/products/productApi';
import { cartApi } from '../features/products/cartApi';
import { wishlistApi } from '../features/products/wishlistApi';
import { authApi } from '../features/users/authApi';
import { orderApi } from '../features/products/orderApi';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        carts: cartReducer,
        wishlist: wishlistReducer,
        auth: authReducer,
        [productApi.reducerPath]: productApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
        [wishlistApi.reducerPath]: wishlistApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            productApi.middleware,
            cartApi.middleware,
            wishlistApi.middleware,
            authApi.middleware,
            orderApi.middleware
        ),
});
