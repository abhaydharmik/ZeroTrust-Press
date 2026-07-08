import React from "react";

const DeleteModal = ({ isOpen, onClose, onConfirm, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl w-100 p-6">
        <h2 className="text-2xl font-bold">Delete Blog</h2>

        <p className="text-gray-500 mt-3">
          Are you sure you want to delete this blog?
        </p>

        <div className="flex justify-end gap-3 mt-8">
          <button onClick={onClose} className="border px-5 py-2 rounded-lg">
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="bg-black text-white px-5 py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
