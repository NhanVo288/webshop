import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

// Process Payment
export const processPayment = createAsyncThunk(
  "payment/processPayment",
  async (body, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/payments/process", body);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// Get Payment by OrderId
export const getPaymentByOrderId = createAsyncThunk(
  "payment/getByOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `/payments/order/${orderId}`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    payment: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(processPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(processPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payment = action.payload;
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getPaymentByOrderId.fulfilled, (state, action) => {
        state.payment = action.payload;
      });
  },
});

export default paymentSlice.reducer;