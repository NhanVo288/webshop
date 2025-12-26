import { createSlice } from "@reduxjs/toolkit";
import { CheckAuth, Login, logout, SignUp } from "./auth.thunk.js";

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isCheckAuth: true,
        isLogingIn: false,
        isSigningUp: false
    },
    reducers: {},
    extraReducers: builder => {
        builder 
            .addCase(CheckAuth.pending, state => {
                state.isCheckAuth = true
            })
            .addCase(CheckAuth.fulfilled, (state,action) => {
                state.user = action.payload
                state.isCheckAuth = false
            })
            .addCase(CheckAuth.rejected, state => {
                state.isCheckAuth = false
            })

            .addCase(Login.pending, state => {
                state.isLogingIn = true
            })
            .addCase(Login.fulfilled, (state, action) => {
                state.user = action.payload
                state.isLogingIn = false
            })
            .addCase(Login.rejected, state => {
                state.isLogingIn = false
            })

            .addCase(SignUp.pending, state => {
                state.isSigningUp = true
            })
            .addCase(SignUp.fulfilled, (state, action) => {
                state.user = action.payload
                state.isSigningUp = false
            })
            .addCase(SignUp.rejected, state => {
                state.isSigningUp = false
            })

            .addCase(logout.fulfilled, state => {
                state.user = null
            })
    }

})

export default AuthSlice.reducer