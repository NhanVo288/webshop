import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";

export const getMyOrders = createAsyncThunk(
  "order/getMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/orders/user/me");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const getAllOrders = createAsyncThunk(
  "order/getAllOrders",
  async ({ page = 0, size = 10 }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/orders", {
        params: { page, size },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const getOrderById = createAsyncThunk(
  "order/getOrderById",
  async (orderId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/orders/${orderId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (body, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/orders", body);
      toast.success("Đặt hàng thành công");
      return res.data;
    } catch (err) {
      toast.error("Đặt hàng thất bại");
      return rejectWithValue(err.response?.data);
    }
  },
);

export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/orders/${orderId}/cancel`);
      toast.success("Huỷ đơn hàng thành công");
      return res.data;
    } catch (err) {
      toast.error("Huỷ đơn hàng thất bại");
      return rejectWithValue(err.response?.data);
    }
  },
);

export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ orderId, status, notes }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/orders/${orderId}/status`, {
        status,
        notes,
      });
      toast.success("Cập nhật trạng thái thành công");
      return res.data;
    } catch (err) {
      toast.error("Cập nhật trạng thái thất bại");
      return rejectWithValue(err.response?.data);
    }
  },
);

export const getOrderStatusHistory = createAsyncThunk(
  "order/getOrderStatusHistory",
  async (orderId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/orders/${orderId}/status-history`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  },
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: null,
    orderDetail: null,
    orderHistory: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearOrderDetail: (state) => {
      state.orderDetail = null;
      state.orderHistory = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ===== GET MY ORDERS ===== */
      .addCase(getMyOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      /* ===== GET ALL ORDERS (ADMIN) ===== */
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      /* ===== GET ORDER DETAIL ===== */
      .addCase(getOrderById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetail = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      /* ===== CREATE ORDER ===== */
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetail = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      /* ===== CANCEL ORDER ===== */
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.orderDetail = action.payload;
      })

      /* ===== UPDATE STATUS ===== */
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.orderDetail = action.payload;
      })

      /* ===== STATUS HISTORY ===== */
      .addCase(getOrderStatusHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderStatusHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderHistory = action.payload;
      })
      .addCase(getOrderStatusHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderDetail } = orderSlice.actions;
export default orderSlice.reducer;
