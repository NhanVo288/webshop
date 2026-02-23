import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "./../../lib/axios";

export const createPayment = createAsyncThunk(
  "payment/process",
  async (body, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/payments/process",body);
      return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data)
    }
  },
);

export const paymentCallBack = createAsyncThunk(
    'payment/callback',
    async (body,{rejectWithValue}) => {
        try {
            const res = await axiosInstance.post('/payments/callback',body)
            return res.data
        } catch (error) {
            return rejectWithValue(error.response?.data)
        }
    }
)

export const getPaymentById = createAsyncThunk(
    'payment/get',
    async (id, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.get(`/payments/${id}`)
            return res.data
        } catch (error) {
            return rejectWithValue(error.response?.data)
        }
    }
)

const paymentSlice = createSlice({
    name: 'payment',
    
})
