import { Search, X } from "lucide-react";
import React from "react";

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="relative w-full max-w-xl">
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
      />
      <input
        type="text"
        placeholder="Search blogs...."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-12 outline-none focus:border-black transition"
      />

      {search && (
        <button
          onClick={() => setSearch("")}
          className="absolute right-4 top-1/2 -translate-y-1/2"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
