import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: !!localStorage.getItem("token"),
  admin: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.admin = action.payload;
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.admin = null;
      localStorage.removeItem("token"); // 🔥 clear token
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
