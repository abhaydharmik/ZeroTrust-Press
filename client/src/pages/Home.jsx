import React, { useEffect, useState } from "react";
import { getBlogs } from "../services/blogService";
import Loader from "../components/common/Loader";
import BlogCard from "../components/blog/BlogCard";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const { data } = await getBlogs();

      setBlogs(data.blogs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <h1 className="text-4xl font-bold mb-8">Latest Blogs</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Home;
