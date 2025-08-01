const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  auth: null,
};

export const authReducer = createSlice({
  name: "authStore",
  initialState,
  reducers: {
    login: (state, action) => {
      state.auth = action.payload;
    },
    logout: (state) => {
      state.auth = null;
    },
  },
});

export const { login, logout } = authReducer.actions;
export default authReducer.reducer;
