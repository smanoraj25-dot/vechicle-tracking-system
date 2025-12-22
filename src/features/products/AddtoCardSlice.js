import { createSlice } from '@reduxjs/toolkit';
import { cartApi } from './cartApi';
import { getGuestCart, setGuestCart } from '../../Pages/Cart/LSCartAddRemove';

const initialState = {
    carts: getGuestCart(),
    loading: false,
    error: null,
};

const Cartslice = createSlice({
    name: 'carts',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const productId = action.payload;
            if (!productId) return;
            const existingProduct = state.carts.find(item => item === productId);
            if (!existingProduct) {
                state.carts.push({product_id:productId});
            }
            setGuestCart(state.carts);
        },
        removeFromCart: (state, action) => {
            const productId = action.payload;
            if (!productId) return;
            state.carts = state.carts.filter(item => item.product_id !== productId);
            setGuestCart(state.carts);
        },
        setCart: (state, action) => {
            state.carts = action.payload; 
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                cartApi.endpoints.getCart.matchPending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                cartApi.endpoints.getCart.matchFulfilled,
                (state, action) => {
                    state.loading = false;
                    state.carts = action.payload;
                }
            )
            .addMatcher(
                cartApi.endpoints.getCart.matchRejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload || 'Failed to fetch carts';
                }
            );
    },
});

export const { addToCart, removeFromCart, setCart } = Cartslice.actions;
export default Cartslice.reducer;
