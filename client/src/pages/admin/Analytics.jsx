import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

import Loader from "../../components/common/Loader";
import AnalyticsCard from "../../components/admin/AnalyticsCard";
import CategoryPieChart from "../../components/admin/CategoryPieChart";
import MonthlyBlogsChart from "../../components/admin/MonthlyBlogsChart";
import TopAuthors from "../../components/admin/TopAuthors";
import PopularBlogs from "../../components/admin/PopularBlogs";
import RecentComments from "../../components/admin/RecentComments";

import { getAnalytics } from "../../services/analyticsService";

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      const { data } = await getAnalytics();

      setAnalytics(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load analytics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Analytics Dashboard</h1>

      <AnalyticsCard overview={analytics} />

      <div className="grid gap-6 lg:grid-cols-2">
        <CategoryPieChart data={analytics.blogByCategory} />
        <MonthlyBlogsChart data={analytics.monthlyBlogs} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <TopAuthors author={analytics.topAuthors} />
        <PopularBlogs blogs={analytics.popularBlogs} />
        <RecentComments comments={analytics.recentComments} />
      </div>
    </div>
  );
};

export default Analytics;
