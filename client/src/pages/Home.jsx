import React, { useEffect, useState } from "react";
import { getBlogs } from "../services/blogService";
import Loader from "../components/common/Loader";
import BlogCard from "../components/blog/BlogCard";
import SearchBar from "../components/blog/SearchBar";
import CategoryFilter from "../components/blog/CategoryFilter";
import Pagination from "../components/blog/Pagination";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await getBlogs({
        search,
        category,
        page: currentPage,
        limit: 2,
      });

      setBlogs(data.blogs);

      setTotalPages(data.totalPages);
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
  }, [search, category, currentPage]);

  useEffect(() => {
    setCurrentPage(1)
  }, [search, category])
  

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <h1 className="text-4xl font-bold mb-8">Latest Blogs</h1>

      <div className="mb-10 flex justify-center">
        <SearchBar search={search} setSearch={setSearch} />
        <CategoryFilter category={category} setCategory={setCategory} />
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Home;
