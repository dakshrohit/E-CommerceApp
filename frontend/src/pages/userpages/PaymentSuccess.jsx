import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const PaymentSuccess = () => {
  const {
    cart,
    shippingAddress,
    totalAmount,
    mode,
    clearCart,
  } = useCart();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const placeOrder = async () => {
      try {
        const res = await axios.post("/api/orders", {
          products: cart,
          shippingAddress,
          totalAmount,
          mode: mode || "CART",
          paymentMethod: "Online",
        });

        if (res.status === 201) {
          toast.success("Order placed successfully!");
          clearCart();
        } else {
          toast.error("Failed to place order");
          navigate("/cart");
        }
      } catch (err) {
        console.error("Order placement failed:", err);
        toast.error("Something went wrong while placing order");
        navigate("/cart");
      } finally {
        setLoading(false);
      }
    };

    placeOrder();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
        <p className="text-lg animate-pulse">Placing your order...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white px-4">
      <div className="text-center space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-green-400">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-400">
          Thank you for shopping with us. We have received your order and will begin processing it soon.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/orders"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
          >
            View Orders
          </Link>
          <Link
            to="/"
            className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded transition"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
