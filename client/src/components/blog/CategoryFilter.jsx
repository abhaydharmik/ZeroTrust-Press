import React from "react";

const CategoryFilter = ({ category, setCategory }) => {
  const categories = [
    "All",
    "React",
    "Node",
    "Express",
    "MongoDB",
    "Backend",
    "Frontend",
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {categories.map((item) => (
        <button
          key={item}
          onClick={()=> setCategory(item === "All" ? "" : item)}
          className={`px-4 py-2 rounded-full border transition ${
            category === item || (item === "All" && category === "")
              ? "bg-black text-white border-black "
              : "border-gray-300 hover:border-black"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
