import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

export const CheckAuth = createAsyncThunk(
    'auth/check',
    async () => {
        try {
            const res = await axiosInstance.get('/auth/check')
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const Login = createAsyncThunk(
    'auth/login',
    async (data) => {
        try {
            const res = await axiosInstance.post('auth/login',data)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const SignUp = createAsyncThunk(
    'auth/signup',
    async (data) => {
        try {
            const res = await axiosInstance.post('/auth/signup',data)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        try {
            await axiosInstance.post("/auth/logout")
            
        } catch (error) {
            console.log(error)
        }
    }
)