import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../Features/Cart/cartSlice";
import wishListSlice from "../Features/Wishlist/wishListSlice";
import AuthSlice from './../Features/Auth/authSlice';
import productSlice from './../Features/Product/productSlice';
import userSlice from './../Features/User/userSlice';
import orderSlice from './../Features/Order/orderSlice';
import recommendationSlice from './../Features/Recommendation/recommendSlice';

const store = configureStore({
  reducer: {
    cart: cartSlice,
    wishlist: wishListSlice,
    auth: AuthSlice,
    product: productSlice,
    user: userSlice,
    order: orderSlice,
    recommend: recommendationSlice
  },
});

export default store;
