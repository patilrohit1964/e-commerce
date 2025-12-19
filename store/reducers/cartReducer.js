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
          item?.productId == action?.payload?.productId &&
          item?.variantId == action?.payload?.variantId
      );
      if (existingItem) {
        state.cartItems = state?.cartItems?.map((item) =>
          item?.productId == existingItem?.productId &&
          item?.variantId == action?.payload?.variantId
            ? { ...item, quantity: item?.quantity + 1 }
            : item
        );
        return;
      }
      state?.cartItems.push(action?.payload);
    },
    increaseQuantity: (state, action) => {
      const existingItem = state?.cartItems.find(
        (item) =>
          item?.productId == action?.payload?.productId &&
          item?.variantId == action?.payload?.variantId
      );
      if (existingItem) {
        state.cartItems[existingItem].quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const existingItem = state?.cartItems.findIndex(
        (item) =>
          item?.productId === action?.payload?.productId &&
          item?.variantId === action?.payload?.variantId
      );
      console.log('existingItem',existingItem);
      if (existingItem) {
        state.cartItems[existingItem].quantity += 1;
      }
    },
    removeToCart: (state, action) => {
      state.cartItems = state?.cartItems?.filter(
        (item) =>
          item?.productId !== action?.payload?.productId &&
          item?.variantId !== action?.payload?.variantId
      );
    },
    clearCart: (state, action) => {
      state.cartItems = [];
    },
  },
});
export const {
  addToCart,
  removeToCart,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
} = cartReducer.actions;
export default cartReducer.reducer;
