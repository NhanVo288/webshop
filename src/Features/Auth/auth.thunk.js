import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";

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
            toast.success('Đăng nhập thành công')
            return res.data
        } catch (error) {
            console.log(error)
            toast.error('Sai email hoặc password')
        }
    }
)

export const SignUp = createAsyncThunk(
    'auth/signup',
    async (data) => {
        try {
            const res = await axiosInstance.post('/auth/signup',data)
            toast.success('Đăng ký thành công')
            return res.data
        } catch (error) {
            console.log(error)
            toast.error('Đăng ký thất bại')

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