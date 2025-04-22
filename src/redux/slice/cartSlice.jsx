import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], 
  totalItems: 0, 
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(cartItem => cartItem.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 }); 
      }
      state.totalItems += 1; 
    },
    removeItemFromCart: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find(cartItem => cartItem.id === itemId);

      if (existingItem) {
        state.totalItems -= existingItem.quantity; 
        state.items = state.items.filter(cartItem => cartItem.id !== itemId); 
      }
    },
    clearCart: (state) => {
      state.items = []; 
      state.totalItems = 0; 
    }
  }
});

export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
