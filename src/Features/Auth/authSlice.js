import { createSlice } from "@reduxjs/toolkit";
import { CheckAuth, Login, logout, SignUp } from "./auth.thunk.js";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isCheckAuth: true,
    isLogingIn: false,
    isSigningUp: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(Login.pending, (state) => {
        state.isLogingIn = true;
      })
      .addCase(Login.fulfilled, (state, action) => {
        const { accessToken, refreshToken, userId } = action.payload?.data;
        state.user = action.payload?.data
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userId", userId);
        state.isLogingIn = false;
      })
      .addCase(Login.rejected, (state) => {
        state.isLogingIn = false;
      })

      .addCase(SignUp.pending, (state) => {
        state.isSigningUp = true;
      })
      .addCase(SignUp.fulfilled, (state, action) => {
        state.isSigningUp = false;
      })
      .addCase(SignUp.rejected, (state) => {
        state.isSigningUp = false;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
      });
  },
});

export default AuthSlice.reducer;
