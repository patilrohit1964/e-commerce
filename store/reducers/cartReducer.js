import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

export const cartReducer = createSlice({
  name: "cartStore",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let existingItem = state.cartItems.find(
        (item) =>
          item?.productId === action?.payload?.productId &&
          item?.variantId == action?.payload?.variantId
      );
      if (existingItem) {
        state.cartItems = state?.cartItems?.map((item) =>
          item?.productId === existingItem?.productId &&
          item?.variantId == action?.payload?.variantId
            ? { ...item, quantity: item?.quantity + 1 }
            : item
        );
        return;
      }
      state?.cartItems.push(action?.payload);
    },
    removeToCart: (state, action) => {
      state.cartItems = state?.cartItems?.filter(
        (item) => item?._id !== action?.payload
      );
    },
    clearCart: (state, action) => {
      state.cartItems = [];
    },
  },
});
export const { addToCart, removeToCart, clearCart } = cartReducer.actions;
export default cartReducer.reducer;
