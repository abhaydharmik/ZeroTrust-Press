import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getCategories } from "../../services/categoryService";
import Loader from "../../components/common/Loader";
import { Plus } from "lucide-react";
import CategoryTable from "../../components/admin/CategoryTable";
import CategoryModal from "../../components/admin/CategoryModal";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const { data } = await getCategories();

      setCategories(data.categories);
    } catch (error) {
      toast.error(
        error.response?.data?.message || " Failed to load categories.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Categories</h1>

        <button className="flex items-center gap-2 rounded-lg bg-black px-5 py-3 text-white transition hover:bg-gray-800">
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {/* Category Table */}
      <CategoryTable
        categories={categories}
        refreshCategories={fetchCategories}
        onEdit={(category) => {
          setSelectedCategory(category);
          setShowModal(true);
        }}
      />

      {/* Modal */}

      <CategoryModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedCategory(null);
        }}
        category={selectedCategory}
        refreshCategories={fetchCategories}
      />
    </div>
  );
};

export default Categories;
