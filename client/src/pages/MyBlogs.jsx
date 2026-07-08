import React, { useEffect, useMemo, useState } from "react";
import Loader from "../components/common/Loader";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import StatsCard from "../components/dashboard/StatsCard";
import MyBlogCard from "../components/blog/MyBlogCard";
import DeleteModal from "../components/blog/DeleteModal";

import { deleteBlog, getMyBlogs } from "../services/blogService";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedBlog, setSelectedBlog] = useState(null);

  const [deleteLoading, setDeleteLoading] = useState(false);

  // Fetch Blogs

  const fetchBlogs = async () => {
    try {
      const { data } = await getMyBlogs();

      setBlogs(data.blogs);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Search

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const keyword = search.trim().toLowerCase();

      return (
        blog.title.toLowerCase().includes(keyword) ||
        blog.description.toLowerCase().includes(keyword)
      );
    });
  }, [blogs, search]);

  //   Stats

  const totalBlogs = blogs.length;

  const totalLikes = blogs.reduce((acc, blog) => acc + blog.likes.length, 0);

  const totalComments = blogs.reduce(
    (acc, blog) => acc + blog.comments.length,
    0,
  );

  // Delete

  const handleDelete = async () => {
    if (!selectedBlog) return;

    try {
      setDeleteLoading(true);

      await deleteBlog(selectedBlog._id);

      toast.success("Blog Deleted");

      setBlogs((prev) => prev.filter((blog) => blog._id !== selectedBlog._id));

      setSelectedBlog(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <h1 className="text-4xl font-bold">My Blogs</h1>
          <p className="text-gray-500 mt-2">Manage all your blogs.</p>
        </div>
        <Link
          to={"/create-blog"}
          className="bg-black text-white px-6 py-3 rounded-xl"
        >
          Create Blog
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
        <StatsCard title="Total Blogs" value={totalBlogs} />
        <StatsCard title="Total Likes" value={totalLikes} />
        <StatsCard title="Comments" value={totalComments} />
      </div>

      <div className="mt-10">
        <input
          type="text"
          placeholder="Search by title or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-xl p-4 outline-none focus:border-black"
        />
      </div>

      {/* Empty */}
      {filteredBlogs.length === 0 ? (
        <div className="text-center py-24">
          <h2 className="text-3xl font-bold">No Blogs Found</h2>
          <p>Create your first Blog</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {filteredBlogs.map((blog) => (
            <MyBlogCard
              key={blog._id}
              blog={blog}
              onDelete={() => setSelectedBlog(blog)}
            />
          ))}
        </div>
      )}

      {/* Delete Modal */}

      <DeleteModal
        isOpen={!!selectedBlog}
        onClose={() => setSelectedBlog(null)}
        onConfirm={handleDelete}
        loading={deleteLoading}
      />
    </div>
  );
};

export default MyBlogs;
