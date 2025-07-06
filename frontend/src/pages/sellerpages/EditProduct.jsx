import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "./ManageProducts.jsx";
import toast from "react-hot-toast";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:4000";
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    fetch(`${base_url}/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setInitialData(data.data))
      .catch(() => toast.error("Failed to load product"));
  }, [id]);

  const handleUpdate = async (updatedProduct) => {
    try {
      const res = await fetch(`${base_url}/api/products/update/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Product updated!");
        navigate("/seller/dashboard");
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      {initialData ? (
        <ProductForm onSubmit={handleUpdate} initialData={initialData} isEditing />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditProduct;
