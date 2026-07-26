import React, { useEffect, useState } from "react";
import { getCategories } from "../../services/categoryService";
import toast from "react-hot-toast";

const CategoryFilter = ({ category, setCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const { data } = await getCategories();

      setCategories(data.categories.filter((category) => category.isActive));
    } catch (error) {
      toast.error("Failed to load categories.");
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-3">
      <button
        onClick={() => setCategory("")}
        className={`px-4 py-2 rounded-full border transition ${
          category === ""
            ? "bg-black text-white border-black"
            : "border-gray-300 hover:border-black"
        }`}
      >
        All
      </button>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => setCategory(item.slug)}
          className={`px-4 py-2 rounded-full border transition ${
            category === item.slug || (item === "All" && category === "")
              ? "bg-black text-white border-black "
              : "border-gray-300 hover:border-black"
          }`}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
