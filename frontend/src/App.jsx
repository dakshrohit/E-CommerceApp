import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/userpages/Home.jsx';
import Products from './pages/userpages/Products.jsx';
import Cart from './pages/userpages/Cart.jsx';
import Checkout from './pages/userpages/Checkout.jsx';
import Login from './pages/userpages/Login.jsx';
import Register from './pages/userpages/Register.jsx';
import Profile from './pages/userpages/Profile.jsx';
import Orders from './pages/userpages/Orders.jsx';
import ProductDetails from './pages/userpages/ProductDetails.jsx';
import Navbar from './components/Navbar.jsx';
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products/:id" element={<ProductDetails />} />
       
      </Routes>
    </BrowserRouter>
  )
}

export default App
