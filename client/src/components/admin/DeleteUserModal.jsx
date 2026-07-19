import { AlertTriangle, Loader2 } from "lucide-react";
import React from "react";

const DeleteUserModal = ({ isOpen, onClose, onConfirm, loading, userName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex flex-col items-center">
          <div className="mb-4 rounded-full bg-red-100 p-4">
            <AlertTriangle className="text-red-600" size={32} />
          </div>

          <h2 className="text-xl font-bold">Delete User</h2>

          <p className="mt-2 text-center text-gray-600">
            Are you sure you want to delete{" "}
            <span className="font-semibold">{userName}</span>?
          </p>

          <p className="mt-1 text-sm text-red-500">
            This action cannot be unique
          </p>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border px-5 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700 disabled:opacity-50"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
