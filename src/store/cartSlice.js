import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1; 
      } else {
        const tempProduct = { ...action.payload, quantity: 1 }; 
        state.cartItems.push(tempProduct); 
      }

      state.cartTotalQuantity += 1; 
      state.cartTotalAmount += action.payload.price; 
    },
    removeFromCart(state, action) {
      const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.cartTotalQuantity -= state.cartItems[itemIndex].quantity;
        state.cartTotalAmount -= state.cartItems[itemIndex].price * state.cartItems[itemIndex].quantity;
        state.cartItems.splice(itemIndex, 1);
      }
    },
    increaseQuantity(state, action) {
      const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1;
        state.cartTotalQuantity += 1; 
        state.cartTotalAmount += state.cartItems[itemIndex].price; 
      }
    },
    decreaseQuantity(state, action) {
      const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0 && state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1;
        state.cartTotalQuantity -= 1; 
        state.cartTotalAmount -= state.cartItems[itemIndex].price; 
      }
    },
    clearCart(state) {
      state.cartItems = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

