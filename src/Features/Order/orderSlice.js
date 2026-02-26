import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";



// Create Order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (body, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/orders", body);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// Get My Orders
export const getMyOrders = createAsyncThunk(
  "order/getMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/orders/user/me");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// Cancel Order
export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/orders/${id}/cancel`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const getOrderStatus = createAsyncThunk(
  'order/status',
  async (id,{rejectWithValue}) => {
    try {
      const res = await axiosInstance.get(`/orders/${id}/status-history`)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response?.data)
    }
  }
)


const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    orderStatus: [],
    currentOrder: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    clearOrderStatus: (state) =>{
      state.orderStatus = []
    }
  },
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET MY ORDERS
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })

      // CANCEL
      .addCase(cancelOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          (o) => o.id === action.payload.id
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })

      .addCase(getOrderStatus.fulfilled, (state,action) => {
        state.orderStatus = action.payload
      })
  },
});

export const { clearCurrentOrder, clearOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;