import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: ["dfd"],
};

export const cartReducer = createSlice({
  name: "cartStore",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action?.payload);
      // imple perfect logic for cart
    },
    removeToCart: (state, action) => {
      // state.cartItems = action?.payload;
    },
    clearCart: (state, action) => {
      // state.cartItems = action?.payload;
    },
  },
});
export const { addToCart, removeToCart, clearCart } = cartReducer.actions;
export default cartReducer.reducer;
