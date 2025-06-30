import React, { useEffect, useState ,useContext} from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import { Button } from '../../components/ui/Button.jsx'
import toast from 'react-hot-toast'
const ProductDetails = () => {



  const {id}=useParams()
  const [product,setProduct]=useState(null);
  const { dispatch } = useCart();

  useEffect(()=>{
    fetch(`http://localhost:4000/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
      })
      .catch(err => console.error("Error fetching product:", err));

  },[id])

  if(!product){
    return <div className='text-center mt-8'>Loading...</div>
  }

  const handleAddToCart=()=>{
    dispatch({
      type:"ADD_TO_CART",
      payload: product
    });
    // console.log("Product added to cart:", product);
    // alert(`${product.title} has been added to your cart!`)
    toast.success(`${product.title} has been added to your cart!`);
  };

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
      <Button
    onClick={handleAddToCart}
    className="bg-[#222121] text-[#E4E4E4] hover:bg-[#2c2c2c] px-4 py-2 rounded-md text-sm transition"
  >
    Add to Cart
  </Button>
  <Button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded ">
               Buy Now
              </Button>
  </div>
    </div>
  </div>
);



 
}

export default ProductDetails
