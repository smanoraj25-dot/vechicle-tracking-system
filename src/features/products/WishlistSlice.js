import { createSlice } from '@reduxjs/toolkit';
import { wishlistApi } from './wishlistApi';
import { getGuestWishlist, setGuestWishlist } from '../../Pages/wishlist/LSWishlistAddRemove';

const initialState = {
    wishlist: getGuestWishlist(),
    loading: false,
    error: null,
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            const product = action.payload;
            if (!product) return;
            const existingProduct = state.wishlist.find(item => item.product_id === product.product_id);
            if (!existingProduct) {
                state.wishlist.push(product);
            }
            setGuestWishlist(state.wishlist);
        },
        removeFromWishlist: (state, action) => {
            const productId = action.payload;
            if (!productId) return;
            state.wishlist = state.wishlist.filter(item => item.product_id !== productId.product_id);
            setGuestWishlist(state.wishlist);
        },
        setWishlist: (state, action) => {
            state.wishlist = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                wishlistApi.endpoints.getWishlist.matchPending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                wishlistApi.endpoints.getWishlist.matchFulfilled,
                (state, action) => {
                    state.loading = false;
                    state.wishlist = action.payload;
                }
            )
            .addMatcher(
                wishlistApi.endpoints.getWishlist.matchRejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload || 'Failed to fetch wishlist';
                }
            );
    },
});

export const { addToWishlist, removeFromWishlist, setWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
