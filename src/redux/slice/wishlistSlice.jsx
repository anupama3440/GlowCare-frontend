import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [], 
    totalItems: 0, 
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addItemToWishlist: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find(wishlistItem => wishlistItem.id === item.id);

            if (!existingItem) {
                state.items.push(item); 
                state.totalItems += 1; 
            }
        },
        removeItemFromWishlist: (state, action) => {
            const itemId = action.payload;
            const existingItem = state.items.find(wishlistItem => wishlistItem.id === itemId);

            if (existingItem) {
                state.items = state.items.filter(wishlistItem => wishlistItem.id !== itemId);
                state.totalItems -= 1; 
            }
        },
        clearWishlist: (state) => {
            state.items = []; 
            state.totalItems = 0; 
        }
    }
});

export const { addItemToWishlist, removeItemFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
