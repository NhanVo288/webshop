import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProduct, getProductDetail } from "../../api/apiProduct";

export const fetchProducts = createAsyncThunk(
  "product/fetchList",
  async (params) => {
    const res = await getProduct(params);
    return res.data.items;
  }
);

export const fetchProductDetail = createAsyncThunk(
  "product/fetchDetail",
  async (id) => {
    const res = await getProductDetail(id);
    return res.data;
  }
);


const productSlice = createSlice({
    name: "Product",
    initialState: {
        list: [],
        detail: null,
        loading: false
    },
    reducers : {},
    extraReducers: b => {
        b
            .addCase(fetchProducts.pending, state => {
                state.loading = true
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.list = action.payload
                state.loading = false
            })
            .addCase(fetchProducts.rejected, state => {
                state.loading = false
            }) 
            
            .addCase(fetchProductDetail.fulfilled, (state,action) => {
                state.detail = action.payload
            })
    }
})

export default productSlice.reducer