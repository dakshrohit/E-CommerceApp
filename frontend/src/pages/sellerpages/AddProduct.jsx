// src/pages/seller/AddProduct.jsx
import React from "react";
import ProductForm from "./ManageProducts.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:4000";

  const handleAdd = async (product) => {
    try {
      const res = await fetch(`${base_url}/api/products/create`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Product added!");
        navigate("/seller/dashboard");
      } else {
        toast.error(data.message || "Failed to add product");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <ProductForm onSubmit={handleAdd} />
    </div>
  );
};

export default AddProduct;
