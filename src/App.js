import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Header from "./Components/Header/Navbar";
import Footer from "./Components/Footer/Footer";
import ScrollToTop from "./Components/ScrollButton/ScrollToTop";
import Loader from "./Components/Loader/Loader.jsx";
import { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import Home from "./Pages/Home";
import { CheckAuth } from "./Features/Auth/auth.thunk.js";
import PublicRoute from "./Components/Routes/ProtectRoute.js";
const About = lazy(() => import("./Pages/About"));
const Shop = lazy(() => import("./Pages/Shop"));
const Contact = lazy(() => import("./Pages/Contact"));
const Blog = lazy(() => import("./Pages/Blog"));
const ProductDetails = lazy(() => import("./Pages/ProductDetails"));
const Authentication = lazy(() => import("./Pages/Authentication"));
const ResetPass = lazy(() =>
  import("./Components/Authentication/Reset/ResetPass")
);
const BlogDetails = lazy(() =>
  import("./Components/Blog/BlogDetails/BlogDetails")
);
const TermsConditions = lazy(() => import("./Pages/TermsConditions"));
const ShoppingCart = lazy(() =>
  import("./Components/ShoppingCart/ShoppingCart")
);
const NotFound = lazy(() => import("./Pages/NotFound"));

// const Popup = lazy(() => import("./Components/PopupBanner/Popup"));

const App = () => {
  const { user, isCheckingAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CheckAuth());
  }, [dispatch]);
  if (isCheckingAuth) return null;

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />

      {/* <Suspense fallback={null}>
        <Popup />
      </Suspense> */}

      <main
        style={{
          minHeight: "calc(100vh - 400px)",
        }}
      >
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />

            <Route path="/product" element={<ProductDetails />} />
            <Route path="/blog" element={<BlogDetails />} />
            <Route
              path="/loginSignup"
              element={
                <PublicRoute>
                  <Authentication />
                </PublicRoute>
              }
            />
            <Route path="/reset-password" element={<ResetPass />} />

            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/cart" element={<ShoppingCart />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
