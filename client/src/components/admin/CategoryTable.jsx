import React, { useState } from "react";
import { deleteCategory } from "../../services/categoryService";
import toast from "react-hot-toast";
import { Edit, Trash2 } from "lucide-react";
import ConfirmModal from "./ConfirmModal";

const CategoryTable = ({ categories, refreshCategories, onEdit }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const openDeleteModal = (category) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedCategory) return;

    try {
      setLoading(true);

      await deleteCategory(selectedCategory._id);

      toast.success("Category deleted succesfully.");

      refreshCategories();

      setShowDeleteModal(false);
      setSelectedCategory(null);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete category.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (categories.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center text-gray-500">
        No Categories found.
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-2xl border bg-white">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Slug</th>
              <th className="px-6 py-4 text-left">Color</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr key={category._id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{category.name}</td>
                <td className="px-6 py-4 text-gray-600">{category.slug}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <n
                      className="h-5 w-5 rounded-full border"
                      style={{
                        backgroundColor: category.color,
                      }}
                    />
                    
                      {category.color}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      category.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {category.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onEdit(category)}
                      className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-100"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => openDeleteModal(category)}
                      className="rounded-lg p-2 text-red-600 transition hover:bg-red-100"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmModal
      isOpen={showDeleteModal}
      title={"Delete Category"}
      message={`Are you sure you want to delete`}
      loading={loading}
      onClose={()=> {
        setShowDeleteModal(false)
        setSelectedCategory(null)
      }}
      onConfirm={handleDelete}
      userName={selectedCategory?.name}
/>
    </>
  );
};

export default CategoryTable;
