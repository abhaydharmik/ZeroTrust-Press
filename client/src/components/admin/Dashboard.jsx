import React, { useEffect, useState } from "react";

import { getDashboardStats } from "../../services/adminService";

import { FileText, Shield, Tag, Users } from "lucide-react";

import Loader from "../common/Loader";
import toast from "react-hot-toast";

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
    </div>
  );
};

export default Dashboard;
