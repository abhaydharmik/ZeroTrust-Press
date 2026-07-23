import React, { useEffect, useState } from "react";


import { FileText, Shield, Tag, Users } from "lucide-react";

import Loader from "../../components/common/Loader";
import toast from "react-hot-toast";
import { getDashboardStats } from "../../services/adminService";
import StatCard from "../../components/admin/StatCard";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const { data } = await getDashboardStats();

      setDashboard(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!dashboard) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">Dashboard Unavailable</h2>

        <p className="text-gray-500 mt-3">Unable to fetch dashboard data.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="text-gray-500 mt-2">Overview of your platform.</p>
      </div>

      {/* Stat Cards */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Users"
          value={dashboard.stats.totalUsers}
          icon={<Users size={28} />}
        />
        <StatCard
          title="Blogs"
          value={dashboard.stats.totalBlogs}
          icon={<FileText size={28} />}
        />
        <StatCard
          title="Admins"
          value={dashboard.stats.totalAdmins}
          icon={<Shield size={28} />}
        />
        <StatCard
          title="Categories"
          value={dashboard.stats.totalCategories}
          icon={<Tag size={28} />}
        />
      </div>

      {/* Latest Users */}

      <div className="bg-white rounded-2xl border">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-bold">Latest Users</h2>
        </div>

        {dashboard.latestUsers.length === 0 ? (
          <div className="text-center p-8 text-gray-500">No users found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="px-6 py-4 text-left">User</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Role</th>
                  <th className="px-6 py-4 text-left">Joined</th>
                </tr>
              </thead>
              <tbody>
                {dashboard.latestUsers.map((user) => {
                  const avatar = user.avatar
                    ? user.avatar.startsWith("http")
                      ? user.avatar
                      : `http://localhost:5000/uploads/${user.avatar}`
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=000000&color=ffffff`;
                  return (
                    <tr className="border-b hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full border object-cover"
                          />
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4">{user.email}</td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-4 rounded-full text-sm font-medium ${user.role === "admin" ? "bg-black text-white" : "bg-gray-200 text-black"}`}
                        >
                          {user.role}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Latest Blog */}

      <div className="bg-white rounded-2xl border">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-bold">Latest Blogs</h2>
        </div>

        {dashboard.latestBlogs.length === 0 ? (
          <div className="p-8  text-center text-gray-500">No blogs found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="px-6 py-4 text-left">Blog</th>
                  <th className="px-6 py-4 text-left">Category</th>
                  <th className="px-6 py-4 text-left">Author</th>
                  <th className="px-6 py-4 text-left">Created</th>
                </tr>
              </thead>
              <tbody>
                {dashboard.latestBlogs.map((blog) => {
                  const image = blog.image
                    ? blog.image.startsWith("http")
                      ? blog.image
                      : `http://localhost:5000/uploads/${blog.image}`
                    : "https://placehold.co/100x70?text=No+Image";

                  return (
                    <tr
                      key={blog._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      {/* Blog */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={image}
                            alt={blog.title}
                            className="w-20 h-14 rounded-lg border object-cover"
                          />
                          <div>
                            <h3 className="font-semibold">{blog.title}</h3>
                            <p className="text-sm text-gray-500 line-clamp-1">
                              {blog.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-gray-200 px-3 py-1 text-sm">
                          {blog.category}
                        </span>
                      </td>

                      {/* Author */}
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium">{blog.author?.name}</p>
                          <p className="text-sm text-gray-500">
                            {blog.author?.email}
                          </p>
                        </div>
                      </td>

                      {/* Date */}

                      <td className="px-6 py-4">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
