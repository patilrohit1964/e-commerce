import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

export const cartReducer = createSlice({
  name: "cartStore",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems = action?.payload;
    },
    removeToCart: (state, action) => {
      state.cartItems = action?.payload;
    },
    clearCart: (state, action) => {
      state.cartItems = action?.payload;
    },
  },
});
const { addToCart, removeToCart, clearCart } = cartReducer.actions;
export default cartReducer.reducer;
