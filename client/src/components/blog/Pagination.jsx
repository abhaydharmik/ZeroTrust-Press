import React from "react";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
        className="border px-4 py-2 rounded disabled:opacity-40"
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index + 1)}
          className={`w-10 h-10 rounded ${currentPage === index + 1 ? "bg-black text-white" : "border"}`}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className="border px-4 py-2 rounded disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
