import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";

export const Login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/login", data);
      return res.data;
    } catch (error) {
      toast.error("Sai email hoặc password");
      return rejectWithValue(error.response?.data);
    }
  },
);

export const SignUp = createAsyncThunk(
  "auth/signup",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/register", data);
      toast.success("Đăng ký thành công");
      return res.data;
    } catch (error) {
      toast.error("Đăng ký thất bại");
      return rejectWithValue(error.response?.data);
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    await axiosInstance.post("/auth/logout");
  } catch (error) {
    console.log(error);
  }
});
