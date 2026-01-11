import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import inventoryReducer from'./slice/inventorySlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    inventory: inventoryReducer
  },
});
