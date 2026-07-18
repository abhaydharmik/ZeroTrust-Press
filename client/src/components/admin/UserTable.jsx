import React, { useState } from "react";
import { deleteUser, updateUserRole } from "../../services/adminService";
import toast from "react-hot-toast";
import RoleBadge from "./RoleBadge";
import { Trash2 } from "lucide-react";
import DeleteUserModal from "./DeleteUserModal";

const UserTable = ({ refreshUsers, users }) => {

  const [selectedUser, setSelectedUser] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleRoleChange = async (userId, role) => {
    try {
      await updateUserRole(userId, role);

      toast.success("Role updated successfully.");

      await refreshUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update role.");
    }
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user)
    setShowDeleteModal(true)
  }

  const handleDelete = async () => {
    if(!selectedUser) return

    try {
      setDeleteLoading(true)

      await deleteUser(selectedUser._id)

      toast.success("User deleted successfully.")

      await refreshUsers()

      setShowDeleteModal(false)
      setSelectedUser(null)
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user.")
    }finally{
      setDeleteLoading(false)
    }
  }

  if (users.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-10 text-center text-gray-500">
        No users found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border bg-white">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left">User</th>
            <th className="px-6 py-4 text-left">Email</th>
            <th className="px-6 py-4 text-left">Role</th>
            <th className="px-6 py-4 text-left">Joined</th>
            <th className="px-6 py-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const avatar = user.avatar
              ? user.avatar.startsWith("http")
                ? user.avatar
                : `http://localhost:5000/uploads/${user.avatar}`
              : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=000000&color=ffffff`;

            return (
              <tr key={user._id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={avatar}
                      alt={user.name}
                      className="w-11 h-11 rounded-full border object-cover"
                    />
                    <span className="font-medium">{user.name}</span>
                  </div>
                </td>

                <td className="px-6 py-4">{user.email}</td>

                <td className="px-6 py-4">
                  <div className="space-x-4 space-y-4">
                    <RoleBadge role={user.role} />
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                      className="rounded-lg border px-3 py-2 text-sm"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </td>

                <td className="px-6 py-4">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => openDeleteModal(user)}
                    className="rounded-lg p-2 text-red-600 hover:bg-red-100 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <DeleteUserModal isOpen={showDeleteModal}
      onClose={()=> {
        setShowDeleteModal(false)
        setSelectedUser(null)
      }}
      onConfirm={handleDelete}
      loading={deleteLoading}
      userName={selectedUser?.name}
      />
    </div>
  );
};

export default UserTable;
