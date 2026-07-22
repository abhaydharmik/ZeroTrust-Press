import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import BlogForm from "../components/blog/BlogForm";

import { getBlogById, updateBlog } from "../services/blogService";

import Loader from "../components/common/Loader";
import { getCategories } from "../services/categoryService";

const EditBlog = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);

  const [pageLoading, setPageLoading] = useState(true);

  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    content: "",
    image: null,
  });

  // Fetch Blog

  const fetchBlog = async () => {
    try {
      const { data } = await getBlogById(id);

      const blog = data.blog;

      setFormData({
        title: blog.title,
        description: blog.description,
        category: blog.category?._id || "",
        content: blog.content,
        image: null,
      });

      if (blog.image) {
        setPreview(`http://localhost:5000/uploads/${blog.image}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load blog");

      navigate("/my-blogs");
    } finally {
      setPageLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await getCategories();

      setCategories(data.categories.filter((category) => category.isActive));
    } catch (error) {
      toast.error("Failed to load categories.");
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Update Blog
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, category, content, image } = formData;

    if (!title.trim() || !description.trim() || !category || !content.trim()) {
      return toast.error("Please fill all required fields.");
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", title.trim());
      data.append("description", description.trim());
      data.append("category", category);
      data.append("content", content.trim());

      // Upload only if user selected new image
      if (image) {
        data.append("image", image);
      }

      await updateBlog(id, data);

      toast.success("Blog updated successfully");

      navigate("/my-blogs");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-5xl mx-auto px-5 py-12">
      <h1 className="text-4xl font-bold mb-10">Edit Blog</h1>

      <BlogForm
        formData={formData}
        setFormData={setFormData}
        preview={preview}
        setPreview={setPreview}
        handleSubmit={handleSubmit}
        loading={loading}
        isEdit={true}
        categories={categories}
      />
    </div>
  );
};

export default EditBlog;
