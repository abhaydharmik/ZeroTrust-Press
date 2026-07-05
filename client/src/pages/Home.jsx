import React, { useEffect, useState } from "react";
import { getBlogs } from "../services/blogService";
import Loader from "../components/common/Loader";

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

      <div className="space-y-4">
        {blogs.map((blog) => (
          <div className="border border-gray-200 rounded-lg p-5">
            <h2 className="text-2xl font-semibold">{blog.title}</h2>
            <p className="text-gray-600 mt-2">{blog.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
