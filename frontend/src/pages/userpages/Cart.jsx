

import React from 'react'
import  { useContext } from "react";
import { CartContext } from "../../context/CartContext.jsx";
import { Button } from "../../components/ui/Button.jsx";


const Cart = () => {
  const { cartItems, dispatch } = useContext(CartContext);
   const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
    return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-[#1A1A1A] text-[#E4E4E4] p-4 rounded-md shadow"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-400">{item.description}</p>
                  <p className="text-sm mt-1">Qty: {item.quantity}</p>
                </div>
              </div>

              <div className="text-right space-y-2">
                <p className="text-lg font-semibold"> ₹{item.price * item.quantity}</p>
                <Button
                  onClick={() =>
                    dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
                  }
                  className="bg-[#2c2c2c] hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}

          <div className="text-right mt-6">
            <p className="text-xl font-bold">
              Total: <span className="text-blue-500"> <span className='text-[#a09f9f] '>₹</span>{totalPrice.toFixed(2)}</span>
            </p>
            <Button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
              Checkout
            </Button>
          </div>
        </div>
      )}
    </main>
  );
};



export default Cart
