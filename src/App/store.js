import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../Features/Cart/cartSlice";
import wishListSlice from "../Features/Wishlist/wishListSlice";
import AuthSlice from './../Features/Auth/authSlice';
import productSlice from './../Features/Product/productSlice';
import userSlice from './../Features/User/userSlice';

const store = configureStore({
  reducer: {
    cart: cartSlice,
    wishlist: wishListSlice,
    auth: AuthSlice,
    product: productSlice,
    user: userSlice
  },
});

export default store;
