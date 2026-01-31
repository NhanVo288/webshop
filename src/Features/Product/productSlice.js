import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getProduct,
  getProductDetail,
  searchProduct,
} from "../../api/apiProduct";

//  Fetch danh sách sản phẩm (có phân trang)
export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (params) => {
    const res = await getProduct(params);
    return res.data;
  },
);

export const searchProducts = createAsyncThunk(
  "products/search",
  async (query) => {
    const res = await searchProduct(query);
    return res.data;
  },
);

//  Fetch chi tiết sản phẩm
export const fetchProductDetail = createAsyncThunk(
  "product/fetchDetail",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getProductDetail(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const productSlice = createSlice({
  name: "Product",
  initialState: {
    list: [],
    seachItems: [],
    pagination: {
      totalElements: 0,
      totalPages: 0,
      pageNumber: 0,
    },
    detail: null,
    loading: false,
    searchLoading: false,
    error: null, // Thêm lỗi để dễ debug
  },
  reducers: {
    clearDetail: (state) => {
      state.detail = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.content;
        state.pagination = {
          totalElements: action.payload.totalElements,
          totalPages: action.payload.totalPages,
          pageNumber: action.payload.number,
        };
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(searchProducts.pending, (state) => {
        state.searchLoading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.seachItems = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.searchLoading = false;
        state.error = action.payload;
      })

      // Xử lý fetch chi tiết
      .addCase(fetchProductDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload;
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDetail } = productSlice.actions;
export default productSlice.reducer;
