import React, { useEffect, useState ,useContext} from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import { Button } from '../../components/ui/Button.jsx'
import toast from 'react-hot-toast'
const ProductDetails = () => {



  const {id}=useParams()
  const [product,setProduct]=useState(null);
  const { addToCart,removeFromCart, updateCartItem, clearCart,cartItems } = useCart();
  
// import { useCart } from "../../context/CartContext.jsx";
// import { Button } from "../../components/ui/Button.jsx";
// import { AnimatePresence, motion } from "motion/react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// const Cart = () => {
//   const { dispatch,
//         fetchCart,
//         syncCartAfterLogin,
//         addToCart,
//         removeFromCart,
//         updateCartItem,
//         clearCart} = useCart();
//   const totalPrice = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );
//   const navigate = useNavigate();
//   const handlecheckout = () => {
//     if(cartItems.length === 0) {
//       toast.error("Your cart is empty. Please add items to proceed.");
//       return; 
//     }
//     toast.success("Proceeding to checkout");
//     navigate("/checkout");
//   };
//   const handleincqty=(item)=>{
//     toast.success(`${item.title} quantity increased`);
//     return dispatch({
//       type: "INCREASE_QUANTITY",
//       payload: item.id,
//     });



//   }
//   return (
//     <main className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6 text-center">Your Cart</h1>

//       {cartItems.length === 0 ? (
//         <div className="flex flex-col items-center justify-center min-h-screen w-full">
//           <p className="text-center text-blue-500 text-lg font-semibold">
//             Your cart is empty.
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-6">
//           <AnimatePresence>
//             {cartItems.map((item) => (
//               <motion.div
//                 key={item.id}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 transition={{ duration: 0.3 }}
//                 className="flex items-center justify-between bg-[#1A1A1A] text-[#E4E4E4] p-4 rounded-md shadow"
//               >
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="w-20 h-20 object-cover rounded"
//                   />
//                   <div>
//                     <h2 className="font-semibold">{item.title}</h2>
//                     <p className="text-sm text-gray-400">{item.description}</p>
//                     <p className="text-xs pt-1 text-red-300">
//                       Qty: {item.quantity}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="text-right space-y-2">
//                   <p className="text-lg font-semibold">
//                     {" "}
//                     ₹{(item.price * item.quantity).toFixed(2)}
//                   </p>
//                   <Button
//                     // onClick={() => {
//                     //   toast.success(`${item.title} quantity increased`);

//                     //   return dispatch({
//                     //     type: "INCREASE_QUANTITY",
//                     //     payload: item.id,
//                     //   });
//                     // }}
//                     onClick={()=>handleincqty(item)}
//                     className="bg-[#2c2c2c] hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
//                   >
//                     +
//                   </Button>
//                   <Button
//                     disabled={item.quantity <= 1}
//                     onClick={() => {
//                       toast.success(`${item.title} quantity decreased`);
//                       return dispatch({
//                         type: "DECREASE_QUANTITY",
//                         payload: item.id,
//                       });
//                     }}
//                     className="bg-[#2c2c2c] ml-1 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
//                   >
//                     -
//                   </Button>
//                   <Button
//                     onClick={() => {
//                       toast.success(`${item.title} removed from cart`);
//                       return dispatch({
//                         type: "REMOVE_FROM_CART",
//                         payload: item.id,
//                       });
//                     }}
//                     className="bg-[#2c2c2c] hover:bg-red-600 text-white px-3 ml-2 py-1 rounded text-sm"
//                   >
//                     Remove
//                   </Button>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>

//           <div className="text-right mt-6">
//             <p className="text-xl font-bold">
//               Total:{" "}
//               <span className="text-blue-500">
//                 {" "}
//                 <span className="text-[#a09f9f] ">₹</span>
//                 {totalPrice.toFixed(2)}
//               </span>
//             </p>
//             <Button
//               onClick={() => {
//                 toast.success("Cart cleared");
//                 return dispatch({ type: "CLEAR_CART" });
//               }}
//               className="mt-2 bg-blue-600 mr-3 hover:bg-blue-700 text-white px-6 py-2 rounded"
//             >
//               Clear Cart
//             </Button>
//             <Button
//               className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
//               disabled={cartItems.length === 0}
//               onClick={() => handlecheckout()}
//             >
//               Checkout
//             </Button>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// };

// export default Cart;

  useEffect(()=>{
    const base_url=import.meta.env.VITE_BASE_URL || "http://localhost:4000";
    fetch(`${base_url}/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
      })
      .catch(err => console.error("Error fetching product:", err));

  },[id])

  if(!product){
    return <div className='text-center mt-8'>Loading...</div>
  }

  const isInCart=cartItems.find(item=>item.productId === product._id)

  const handleAddToCart = () => {
    addToCart({
      productId:product._id,
      name: product.title,
      price: product.price,
      image: product.image,
      quantity: 1, // Default quantity to 1
      
    })
    toast.success(`${product.title} has been added to your cart!`);


  }

  const handleIncQty=()=>{
    updateCartItem(
      product._id,
      isInCart.quantity +1
    )
    toast.success(`Quantity increased of ${product.title} by 1.`)
  }
  const handleremovecart=()=>{
    removeFromCart(product._id)
    toast.success(`${product.title} removed from the cart`)
    

  }
  


  // const handleAddToCart=()=>{
  //   dispatch({
  //     type:"ADD_TO_CART",
  //     payload: {
  //       ...product,
  //       id: product._id, // Ensure the product ID is set correctly
  //     }
  //   });
  //   // console.log("Product added to cart:", product);
  //   // alert(`${product.title} has been added to your cart!`)
  //   toast.success(`${product.title} has been added to your cart!`);
  // };

  return (
  <div className="max-w-4xl mx-auto p-6 bg-[#0D0D0D] text-[#E4E4E4] rounded-lg shadow-md border border-[#1a1a1a]">
    <img
      src={product.image}
      alt={product.title}
      className="w-full h-72 object-cover rounded-lg mb-6 border border-[#1a1a1a]"
    />
    <div className="space-y-3">
      <h2 className="text-3xl font-bold tracking-tight">{product.title}</h2>
      <p className="text-gray-400">{product.description}</p>
      <p className="text-lg text-gray-500">{product.content}</p>
<div className="flex items-center justify-between mt-6">
  <p className="text-xl font-semibold text-blue-600"> <span className='text-[#878686] '>₹</span>{product.price}</p>
  
</div>
<div className='flex justify-between mt-4'>
   {isInCart ? (
    <>
    <Button
    onClick={handleIncQty}
    className="bg-[#222121] text-[#E4E4E4] hover:bg-[#2c2c2c] px-4 py-2 rounded-md text-sm transition"
  >
    Add More
  </Button>
  <Button
    onClick={handleremovecart}
    className="bg-[#222121] text-[#E4E4E4] hover:bg-[#2c2c2c] px-4 py-2 rounded-md text-sm transition"
  >
    Remove From Cart
  </Button>
  </>
    
  
  
   ):(<Button
    onClick={handleAddToCart}
    className="bg-[#222121] text-[#E4E4E4] hover:bg-[#2c2c2c] px-4 py-2 rounded-md text-sm transition"
  >
    Add to Cart
  </Button>)}
      
  <Button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded ">
               Buy Now
              </Button>
  </div>
    </div>
  </div>
);



 
}

export default ProductDetails
