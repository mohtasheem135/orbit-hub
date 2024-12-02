import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  userData: null,
  isLoggedIn: false,
  sessionExpiry: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userData = action.payload;
      state.isLoggedIn = true;
      state.sessionExpiry = Date.now() + 5 * 60 * 1000;
      console.log("User logged in:", action.payload);
      Cookies.set("userData", JSON.stringify(action.payload), {
        expires: 1 / 288,
      }); // 5 min expiration
      console.log("Cookie Set:", Cookies.get("userData"));
    },
    logout: (state) => {
      state.userData = null;
      state.isLoggedIn = false;
      state.sessionExpiry = null; // Clear session expiry
      console.log("User logged out");

      // Clear from localStorage and cookies
      // localStorage.removeItem("userData");
      Cookies.remove("userData");
    },
  },
});

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
