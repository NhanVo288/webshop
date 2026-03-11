import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from 'react-hot-toast'
import { logout } from "../Auth/auth.thunk";

/* ================= THUNKS ================= */

export const fetchMe = createAsyncThunk(
  "user/fetchMe",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/users/me');
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  },
);
export const updateAddress = createAsyncThunk(
  "user/updateAddress",
  async ({ addressId, data }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/users/me/addresses/${addressId}`,data);
      return res.data.data; // AddressResponse
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);
export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (body,{rejectWithValue}) => {
    try {
      const res = await axiosInstance.put('/users/me',body)
      return res.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data)
    }
  }
)
export const deleteAddress = createAsyncThunk(
  "user/deleteAddress",
  async (addressId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/users/me/addresses/${addressId}`);
      return addressId;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const fetchAddresses = createAsyncThunk(
  "user/fetchAddresses",
  async () => {
    const res = await axiosInstance.get('/users/me/addresses');
    return res.data.data;
  },
);

export const addAddress = createAsyncThunk(
  "user/addAddress",
  async (payload) => {
    const res = await axiosInstance.post('/users/me/addresses',payload);
    return res.data.data;
  },
);

/* ================= SLICE ================= */

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    addresses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* ===== USER ===== */
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      /* ===== ADDRESS ===== */
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.addresses = action.payload;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.addresses.push(action.payload);
      })
       .addCase(updateAddress.fulfilled, (state, action) => {
      const index = state.addresses.findIndex(
        (addr) => addr.id === action.payload.id
      );

      if (index !== -1) {
        state.addresses[index] = action.payload;
      }
    })

    .addCase(updateProfile.fulfilled, (state,action) => {
      state.user = action.payload
    })
    .addCase(deleteAddress.fulfilled, (state, action) => {
      state.addresses = state.addresses.filter(
        (addr) => addr.id !== action.payload
      );
    })
    .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.addresses = [];
        state.error = null;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
