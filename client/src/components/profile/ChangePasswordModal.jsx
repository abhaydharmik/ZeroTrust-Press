import { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import toast from "react-hot-toast";

import { changePassword } from "../../services/userService";

const ChangePasswordModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrent, setShowCurrent] = useState(false);

  const [showNew, setShowNew] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = formData;

    // Validation

    if (!currentPassword || !newPassword || !confirmPassword) {
      return toast.error("Please fill all fields.");
    }

    if (newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    try {
      setLoading(true);

      const { data } = await changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });

      toast.success(data.message);

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      if (onSuccess) {
        onSuccess();
      }

      handleClose()
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to change password.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setShowCurrent(false);
    setShowNew(false);
    setShowConfirm(false);

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-2xl font-bold">Change Password</h2>

          <button
            onClick={handleClose}
            className="rounded-lg p-2 hover:bg-gray-100 transition"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {/* Current Password */}

          <div>
            <label className="block mb-2 font-semibold">Current Password</label>

            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="w-full rounded-xl border p-3 pr-12 outline-none focus:border-black"
                placeholder="Enter current password"
              />

              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* New Password */}

          <div>
            <label className="block mb-2 font-semibold">New Password</label>

            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full rounded-xl border p-3 pr-12 outline-none focus:border-black"
                placeholder="Enter new password"
              />

              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}

          <div>
            <label className="block mb-2 font-semibold">Confirm Password</label>

            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-xl border p-3 pr-12 outline-none focus:border-black"
                placeholder="Confirm new password"
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Footer */}

          <div className="flex justify-end gap-4 border-t pt-6">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border px-6 py-3 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-black px-6 py-3 text-white hover:bg-gray-800 transition disabled:opacity-50"
            >
              {loading ? "Updating..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
