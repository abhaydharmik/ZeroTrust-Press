import React, { useEffect, useState } from "react";
import { getBookmarks } from "../services/bookmarkService";
import toast from "react-hot-toast";
import Loader from "../components/common/Loader";
import BlogCard from "../components/blog/BlogCard";

const Bookmarks = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);

      const { data } = await getBookmarks();

      setBlogs(data.bookmarks);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load bookmarks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Saved Blogs</h1>

      {blogs.length === 0 ? (
        <div className="rounded-lg border p-10 text-center text-gray-500">
          No Bookmarked blogs found.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} isBookmarked={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
