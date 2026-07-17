import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (!totalPages || totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-between rounded-xl border bg-white px-6 py-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-2 rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-100 transition"
      >
        <ChevronLeft size={18} />
        Previous
      </button>

      <div className="flex items-center gap-2">
        {Array.from(
          {
            length: totalPages,
          },
          (_, index) => (
            <button key={index + 1} onClick={()=> onPageChange(index + 1)} className={`h-10 w-10 rounded-lg font-medium transition ${currentPage === index + 1 ? "bg-black text-white" : "border hover:bg-gray-100"}`}>{index + 1}</button>
          ),
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-100 transition"
      >
        Next
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
