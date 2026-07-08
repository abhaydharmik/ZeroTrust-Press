import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../services/blogService";
import toast from "react-hot-toast";
import BlogForm from "../components/blog/BlogForm";

const CreateBlog = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    image: null,
  });

  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, category, content, image } = formData;

    if (
      !title.trim() ||
      !description.trim() ||
      !category ||
      !content.trim() ||
      !image
    ) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", title.trim());
      data.append("description", description.trim());
      data.append("category", category);
      data.append("content", content.trim());
      data.append("image", image);

      await createBlog(data);

      toast.success("Blog Created Successfully");
      setFormData({
        title: "",
        description: "",
        content: "",
        category: "",
        image: null,
      });

      setPreview(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      navigate("/my-blogs");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-5 py-12">
      <h1 className="text-4xl font-bold mb-10">Create New Blog</h1>

      <BlogForm
        formData={formData}
        setFormData={setFormData}
        preview={preview}
        setPreview={setPreview}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default CreateBlog;
