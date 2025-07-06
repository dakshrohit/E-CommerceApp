import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { Navigate, useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const navigate = Navigate();
  const buyNowId = new URLSearchParams(location.search).get("buynow"); 
  const [product, setproduct] = useState(null);
  useEffect(() => {
    if (buyNowId) {
      fetch(`http://localhost:4000/products/${buyNowId}`) // Fetch product details for Buy Now from the server(backend)
        .then((res) => res.json())
        .then((data) => setproduct(data));
    }
  }, []);
  const { cartItems, totalItems, totalPrice } = useCart();
  const shippingCost = 0;
  const totalAmount = totalPrice + shippingCost;
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    country: "India",
    paymentMethod: "cod",
  });
  const handleplaceorder = async () => {



    //basic validation
    if (
      !formData.email ||
      !formData.fullName ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.zipCode ||
      !formData.phone
    ) {
      alert("Please fill all the fields");
      return;
    }
    const totalamounttobepaid=buyNowId && product ? product.price :totalAmount;
    const productsToOrder=buyNowId && product ? [
      {
        productId:product._id,
        quantity:1
      }
    ] : cartItems;

    if(formData.paymentMethod==="cash on delivery"){
      const orderPayload = {
      // This is the payload that will be sent to the server when the user places an order
      //sending data in a format, later we will extract this data and save in the db acc to the schema
      products:
        buyNowId && product
          ? [
              {
                productId: product.id,
                quantity: 1,
              },
            ]
          : cartItems,
      formData,
      totalAmount: buyNowId && product ? product.price : totalAmount,
      mode: buyNowId ? "BUY_NOW" : "CART",
    };

    try {
      const res = await fetch("http://localhost:4000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
        credentials: "include", // Include cookies for authentication
      });
      const data = await res.json();
      if (res.ok) {
        navigate("/success");
      } else {
        alert(data.message || "Failed to place order");
      }
    } catch (err) {
      console.error("Error placing order:", err);
    }


    }else{
      // If the payment method is not cash on delivery, we will create a payment link
      try{
        const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:4000";
        const res=await fetch(`${base_url}/api/payment/create`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          
          },
          credentials:"include",
          body:JSON.stringify({
            totalAmount: totalamounttobepaid,
            fullName:formData.fullName,
            email:formData.email,
            phone:formData.phone,
            products:productsToOrder,
          })
        });
        const data = await res.json();
        if(res.ok){
          // If the payment link is created successfully, redirect to the payment link
          const paymentLink = data.data.paymentLink;
          window.location.href= paymentLink; // Redirect to the payment link
        } else{
          alert(data.message || "Failed to create payment link")
        }

      } catch(err){
        alert("Something went wrong while creating payment link");
        console.error("Error creating payment link:", err);

      }

    }
    
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 py-8 w-full max-w-7xl mx-auto">
      {!buyNowId && cartItems.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-screen w-full">
          <div className="text-blue-500  text-lg">
            <p className="flex justify-center">Your cart is empty! </p>
            <p>Please add items to your cart before proceeding to checkout.</p>
          </div>
        </div>
      )}
      {/* LEFT: Cart Items */}
      {(buyNowId && product && (
        <div className="bg-[#1A1A1A] text-white p-4 rounded shadow-md">
          <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
          <img src={product.image} className="w-40 h-40 object-cover rounded" />
          <p>{product.description}</p>
          <p className="font-bold text-xl mt-2">₹{product.price}</p>
          <p>Qty: 1</p>
        </div>
      )) || (
        <div className="flex-1 flex flex-wrap gap-4 max-w-full">
          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.07 }}
                transition={{ duration: 0.1, type: "spring", stiffness: 80 }}
                className="w-full sm:w-[48%] bg-[#1A1A1A] text-[#E4E4E4] p-4 flex rounded-lg shadow-sm border border-[#2b2b2b]"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-22 h-22 object-cover rounded border border-[#2a2a2a]"
                  />
                  <div className="space-y-1">
                    <h2 className="font-semibold text-base">{item.title}</h2>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {item.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-sm font-bold text-blue-500">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* RIGHT: Address + Payment */}
      {(buyNowId || cartItems.length > 0) && (
        <div className="w-full lg:w-[450px] xl:w-[500px] space-y-6">
          {/* Contact Info */}
          <div className="bg-[#0D0D0D] text-[#E4E4E4] p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
            <input
              type="email"
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
              placeholder="Email"
              className="w-full px-4 py-2 rounded-md bg-[#1A1A1A] border border-[#2C2C2C] mb-2 focus:outline-none"
            />
          </div>

          {/* Shipping Info */}
          <div className="bg-[#0D0D0D] text-[#E4E4E4] p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                className="col-span-2 px-4 py-2 rounded-md bg-[#1A1A1A] border border-[#2C2C2C]"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    country: e.target.value,
                  });
                }}
              >
                <option>Country</option>
                <option>India</option>
                <option>USA</option>
              </select>
              <input
                type="text"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    fullName: e.target.value,
                  });
                }}
                placeholder="Full Name"
                className="col-span-2 px-4 py-2 rounded-md bg-[#1A1A1A] border border-[#2C2C2C]"
              />
              <input
                type="text"
                placeholder="Address"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    address: e.target.value,
                  });
                }}
                className="col-span-2 px-4 py-2 rounded-md bg-[#1A1A1A] border border-[#2C2C2C]"
              />
              <input
                type="text"
                placeholder="Apartment (Optional)"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    apartment: e.target.value,
                  });
                }}
                className="col-span-2 px-4 py-2 rounded-md bg-[#1A1A1A] border border-[#2C2C2C]"
              />
              <input
                type="text"
                placeholder="City"
                className="px-4 py-2 rounded-md bg-[#1A1A1A] border border-[#2C2C2C]"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    city: e.target.value,
                  });
                }}
              />
              <input
                type="text"
                placeholder="State"
                className="px-4 py-2 rounded-md bg-[#1A1A1A] border border-[#2C2C2C]"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    state: e.target.value,
                  });
                }}
              />
              <input
                type="text"
                placeholder="ZIP Code"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    zipCode: e.target.value,
                  });
                }}
                className="px-4 py-2 rounded-md bg-[#1A1A1A] border border-[#2C2C2C]"
              />
              <input
                type="text"
                placeholder="Phone No."
                className="px-4 py-2 rounded-md bg-[#1A1A1A] border border-[#2C2C2C]"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  });
                }}
              />
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-[#0D0D0D] text-[#E4E4E4] p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
            <div className="grid grid-cols-2 gap-4">
              {["Cash on Delivery", "UPI", "Card", "Net Banking"].map(
                (method) => (
                  <label
                    key={method}
                    className="flex items-center gap-2 bg-[#1A1A1A] p-3 rounded hover:bg-[#2C2C2C]"
                  >
                    <input
                      type="radio" // Radio button for selecting payment method and it is used to select one option from a set of options
                      name="payment"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          paymentMethod: e.target.value,
                        });
                      }}
                      checked={formData.paymentMethod === method.toLowerCase()}
                      value={method.toLowerCase()}
                      className="accent-blue-600"
                    />
                    <span>{method}</span>
                  </label>
                )
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-[#0D0D0D] text-[#E4E4E4] p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total Items</span>
                {buyNowId && product ? (
                  <span>{1}</span>
                ) : (
                  <span>{totalItems}</span>
                )}
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                {buyNowId && product ? (
                  <span>₹{product.price.toFixed(2)}</span>
                ) : (
                  <span>₹{totalPrice.toFixed(2)}</span>
                )}
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-500">Free</span>
              </div>
              <hr className="border-gray-700 my-2" />
              <div className="flex justify-between font-semibold text-base">
                <span>Total</span>
                {buyNowId && product ? (
                  <span>₹{product.price.toFixed(2)}</span>
                ) : (
                  <span>₹{totalAmount.toFixed(2)}</span>
                )}
              </div>
            </div>
            <button
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
              onClick={handleplaceorder}
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
