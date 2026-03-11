// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   items: [],
//   totalAmount: 0,
// };

// const MAX_QUANTITY = 20;

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart(state, action) {
//       const product = action.payload;
//       const existingItem = state.items.find(
//         (item) => item.productID === product.productID
//       );
//       if (existingItem) {
//         if (existingItem.quantity < MAX_QUANTITY) {
//           existingItem.quantity += 1;
//           state.totalAmount += product.productPrice;
//         }
//       } else {
//         state.items.push({ ...product, quantity: 1 });
//         state.totalAmount += product.productPrice;
//       }
//     },
//     updateQuantity(state, action) {
//       const { productID, quantity } = action.payload;
//       const itemToUpdate = state.items.find(
//         (item) => item.productID === productID
//       );
//       if (itemToUpdate) {
//         const difference = quantity - itemToUpdate.quantity;
//         if (quantity <= MAX_QUANTITY) {
//           itemToUpdate.quantity = quantity;
//           state.totalAmount += difference * itemToUpdate.productPrice;
//         } else {
//           itemToUpdate.quantity = MAX_QUANTITY;
//           state.totalAmount +=
//             (MAX_QUANTITY - itemToUpdate.quantity) * itemToUpdate.productPrice;
//         }
//       }
//     },
//     removeFromCart(state, action) {
//       const productId = action.payload;
//       const itemToRemove = state.items.find(
//         (item) => item.productID === productId
//       );
//       if (itemToRemove) {
//         state.totalAmount -= itemToRemove.productPrice * itemToRemove.quantity;
//         state.items = state.items.filter(
//           (item) => item.productID !== productId
//         );
//       }
//     },
//   },
// });

// export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

// export const selectCartItems = (state) => state.cart.items;
// export const selectCartTotalAmount = (state) => state.cart.totalAmount;

// export default cartSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";

export const getCart = createAsyncThunk(
  "cart/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/carts/me");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const addToCart = createAsyncThunk(
  "cart/add",
  async (body, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/carts/items", body);
      toast.success("Đã thêm sản phẩm vào giỏ hàng");
      return res.data;
    } catch (error) {
      toast.error("Thêm sản phẩm thất bại");
      return rejectWithValue(error.response?.data);
    }
  },
);

export const updateQuantity = createAsyncThunk(
  "cart/update",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/carts/items/${id}`, { quantity });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const deleteItem = createAsyncThunk(
  "cart/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/carts/items/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const deleteAllItems = createAsyncThunk(
  "cart/deleteAll",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.delete("/carts/clear");
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const getCartInfo = createAsyncThunk(
  "cart/cartInfo",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`products/${id}/cart-info`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
)

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    isLoading: false,
    cartInfo: null,
    items: [],
    totalItems: 0,
    totalAmount: 0,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalItems = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ===== GET CART ===== */
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
        state.totalAmount = action.payload.totalAmount || 0;
        state.totalItems = action.payload.totalItems || 0;
        state.isLoading = false;
      })
      .addCase(getCart.rejected, (state) => {
        state.isLoading = false;
      })

      /* ===== ADD TO CART ===== */
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalAmount = action.payload.totalAmount;
        state.totalItems = action.payload.totalItems;
      })

      /* ===== UPDATE QUANTITY ===== */
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalAmount = action.payload.totalAmount;
        state.totalItems = action.payload.totalItems;
      })

      /* ===== DELETE ONE ITEM ===== */
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.totalItems = state.items.reduce(
          (sum, item) => sum + item.quantity,
          0,
        );
        state.totalAmount = state.items.reduce(
          (sum, item) => sum + item.subtotal,
          0,
        );
      })

      /* ===== CLEAR CART ===== */
      .addCase(deleteAllItems.fulfilled, (state) => {
        state.items = [];
        state.totalItems = 0;
        state.totalAmount = 0;
      })

      .addCase(getCartInfo.fulfilled, (state,action) => {
        state.cartInfo = action.payload
      })
  },
});
export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
