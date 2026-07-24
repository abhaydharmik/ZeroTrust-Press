import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createCategory, updateCategory } from "../../services/categoryService";

const initialState = {
  name: "",
  description: "",
  color: "#000000",
  isActive: true,
};

const CategoryModal = ({ isOpen, onClose, category, refreshCategories }) => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        description: category.description || "",
        color: category.color || "#000000",
        isActive: category.isActive,
      });
    } else {
      setFormData(initialState);
    }
  }, [category, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return toast.error("Category name is required.");
    }

    try {
      setLoading(true);

      if (category) {
        await updateCategory(category._id, formData);

        toast.success("Category updated successfully.");
      } else {
        await createCategory(formData);

        toast.success("Category created successfully.");
      }

      await refreshCategories();

      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6">
        <h2 className="mb-6 text-2xl font-bold">
          {category ? "Edit Category" : "Add Category"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
            />
          </div>
          <div>
            <label className="mb-2 block font-medium">Description</label>
            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Color</label>
            <input
              type="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="h-12 w-full rounded-lg border"
            />
          </div>

          <label >
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="mr-2"
            />
            Active Category
          </label>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="rounded-lg border px-5 py-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-black px-5 py-2 text-white disabled:opacity-50"
            >
              {loading ? "Saving...." : category ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
