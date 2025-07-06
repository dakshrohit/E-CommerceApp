import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/Button.jsx";
import { Card, CardHeader, CardContent, CardFooter } from "../../components/ui/Card.jsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchMyProducts = async () => {
    try {
      const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:4000";
      const res = await fetch(`${base_url}/api/products/my-products`, {
        credentials: "include",
      });
      const data = await res.json();
      setProducts(data?.data || []);
    } catch (error) {
      toast.error("Failed to fetch your products");
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const handleDelete = async (productId) => {
    const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:4000";
    try {
      const res = await fetch(`${base_url}/api/products/delete/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        toast.success("Product deleted!");
        fetchMyProducts();
      } else {
        toast.error("Failed to delete product");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Products</h1>
        <Button onClick={() => navigate("/seller/add-product")}>
          ➕ Add New Product
        </Button>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-400">You haven't added any products yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product._id}>
              <img
                src={product.image}
                alt={product.title}
                className="h-48 w-full object-cover rounded-t"
              />
              <CardHeader>
                <h2 className="text-xl font-semibold">{product.title}</h2>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-2">
                  ₹{product.price} | Stock: {product.stock}
                </p>
                <p className="text-sm text-gray-400 line-clamp-2">
                  {product.description}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  onClick={() => navigate(`/seller/edit-product/${product._id}`)}
                  className="text-sm bg-blue-600 hover:bg-blue-700"
                >
                  ✏️ Edit
                </Button>
                <Button
                  onClick={() => handleDelete(product._id)}
                  className="text-sm bg-red-600 hover:bg-red-700"
                >
                  🗑️ Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
