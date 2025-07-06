// src/components/seller/ProductForm.jsx
import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/Button.jsx";
import toast from "react-hot-toast";

const ProductForm = ({ onSubmit, initialData = {}, isEditing = false }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    image: "",
    stock: 0,
    price: 0,
    ...initialData,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.image || !form.stock || !form.price) {
      toast.error("All fields are required");
      return;
    }
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="input" />
      <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="input" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Short Description" className="input" />
      <textarea name="content" value={form.content} onChange={handleChange} placeholder="Detailed Content" className="input" />
      <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" type="number" className="input" />
      <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" className="input" />

      <Button type="submit">
        {isEditing ? "Update Product" : "Add Product"}
      </Button>
    </form>
  );
};

export default ProductForm;

