import React, { useEffect, useState } from "react";
import { getBlogs } from "../services/blogService";
import Loader from "../components/common/Loader";
import BlogCard from "../components/blog/BlogCard";
import SearchBar from "../components/blog/SearchBar";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await getBlogs({ search });

      setBlogs(data.blogs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBlogs();
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <h1 className="text-4xl font-bold mb-8">Latest Blogs</h1>

      <div className="mb-10 flex justify-center">
        <SearchBar search={search} setSearch={setSearch} />
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-3xl font-bold">No Blogs Found</h2>

          <p className="text-gray-500 mt-2">Try another search keyword.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
