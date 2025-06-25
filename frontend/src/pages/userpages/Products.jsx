import React,{ useState,useEffect,useContext } from 'react'
import {
  Card,

  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card.jsx";
import { Button } from '../../components/ui/Button.jsx';
import { CartContext } from '../../context/CartContext.jsx';
import { Link } from 'react-router-dom';
const Products = () => {
  
   const { dispatch } = useContext(CartContext);
 const [products, setProducts] = useState([]);
  useEffect(()=>{
     fetch("http://localhost:4000/products")
    .then(res => res.json())
    .then(data => {
      setProducts(data)

  });
  }, []);
  

  const handleAddToCart=(product)=>{
    dispatch({
      type:"ADD_TO_CART",
      payload: product
    });
  };
  return(
    <main>
      <main className="px-4 py-6 max-w-7xl mx-auto">
  <h1 className="text-2xl font-bold mb-6 text-center">Products</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {products.map(product => (
      
<Card key={product.id} className="hover:bg-[#252525] transition duration-300 ease-in-out">
  <Link to={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-40 object-cover rounded-t-md"
        />
         </Link>
        <CardHeader>
          <CardTitle className="font-bold tracking-tight">{product.title}</CardTitle>
          <CardDescription>{product.description}</CardDescription>
          {/* <CardAction>{product.action}</CardAction> */}
        </CardHeader>
        <CardContent>
          <p>{product.content}</p>
        </CardContent>
        <CardFooter className="flex justify-around items-center">
          <p className="font-semibold"> ₹{product.price}</p>
          <Button
              onClick={()=>handleAddToCart(product)}
              className="bg-[#222121] text-[#E4E4E4] hover:bg-[#2c2c2c] px-4 py-2 rounded-md text-sm transition">
              Add to Cart
            </Button>
        </CardFooter>
</Card>

    ))}
  </div>
</main>

    </main>
  )
}



export default Products
