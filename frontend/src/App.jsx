import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/userpages/Home.jsx";
import Products from "./pages/userpages/Products.jsx";
import Cart from "./pages/userpages/Cart.jsx";
import Checkout from "./pages/userpages/Checkout.jsx";
import AuthPage from "./pages/userpages/AuthPage.jsx";
import Register from "./pages/userpages/Register.jsx";
import Profile from "./pages/userpages/Profile.jsx";
import Orders from "./pages/userpages/Orders.jsx";
import ProductDetails from "./pages/userpages/ProductDetails.jsx";
import Navbar from "./components/Navbar.jsx";
import SuccessPage from "./pages/userpages/SuccessPage.jsx";
import { Toaster } from "react-hot-toast";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/cart"
          element={
            // <ProtectedRoute>
              <Cart />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            // <ProtectedRoute>
              <Checkout />
            /* </ProtectedRoute> */
          }
        />
        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <SuccessPage />
            </ProtectedRoute>
          }
        />

        <Route path="/auth" element={<AuthPage />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
