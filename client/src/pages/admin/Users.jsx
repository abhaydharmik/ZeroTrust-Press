import React, { useEffect, useState } from "react";
import { getUsers } from "../../services/adminService";
import toast from "react-hot-toast";
import Loader from "../../components/common/Loader";
import UserTable from "../../components/admin/UserTable";
import Pagination from "../../components/admin/Pagination";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const fetchUsers = async () => {
    try {
      const { data } = await getUsers(page, 10, search);

      setUsers(data.users);
      setPagination(data.pagination);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
    }, 400);

    return () => clearTimeout(timer);
  }, [page, search]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Users</h1>

        <input
          type="text"
          placeholder="Search users....."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border rounded-xl px-4 py-3 w-72 outline-none focus:border-black"
        />
      </div>

      {/* User Table */}

      <UserTable users={users} refreshUsers={fetchUsers} />

      {/* Pagination */}

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default Users;
