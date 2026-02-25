import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

export const trackInteraction = createAsyncThunk(
  "recommend/track",
  async (body, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/recommendations/track", body);
      return body
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);
export const fetchSimilar = createAsyncThunk(
  "recommend/similar",
  async ({ productId, limit = 5 }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `/recommendations/similar/${productId}?limit=${limit}`,
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);
export const fetchPopular = createAsyncThunk(
  "recommend/popular",
  async (limit, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `/recommendations/popular?limit=${limit}`,
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);
export const fetchRecommend = createAsyncThunk(
  "recommend/me",
  async (limit = 5, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/recommendations/me?limit=${limit}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

const recommendationSlice = createSlice({
  name: "recommendation",
  initialState: {
    popularProducts: [],
    similarProducts: [],
    recommendProducts: [],
    loadPolular: false,
    loadRecommend: false,
    loadSimilar: false,
  },
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchPopular.pending, (state) => {
        state.loadPolular = true;
      })
      .addCase(fetchPopular.fulfilled, (state, action) => {
        state.popularProducts = action.payload;
        state.loadPolular = false;
      })
      .addCase(fetchPopular.rejected, (state) => {
        state.loadPolular = false;
      })

      .addCase(fetchRecommend.pending, (state) => {
        state.loadRecommend = true;
      })
      .addCase(fetchRecommend.fulfilled, (state, action) => {
        state.recommendProducts = action.payload;
        state.loadRecommend = false;
      })
      .addCase(fetchRecommend.rejected, (state) => {
        state.loadRecommend = false;
      })

      .addCase(fetchSimilar.pending, (state) => {
        state.loadSimilar = true;
      })
      .addCase(fetchSimilar.fulfilled, (state, action) => {
        state.similarProducts = action.payload;
        state.loadSimilar = false;
      })
      .addCase(fetchSimilar.rejected, (state) => {
        state.loadSimilar = false;
      });
  },
});

export default recommendationSlice.reducer;
