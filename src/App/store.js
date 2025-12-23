import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../Features/Cart/cartSlice";
import wishListSlice from "../Features/Wishlist/wishListSlice";
import AuthSlice from './../Features/Auth/authSlice';

const store = configureStore({
  reducer: {
    cart: cartSlice,
    wishlist: wishListSlice,
    auth: AuthSlice,
  },
});

export default store;
