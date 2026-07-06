import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../services/blogService";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";

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

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return toast.error("Please select an image file.");
    }

    if (file.size > 5 * 1024 * 1024) {
      return toast.error("Image must be less than 5MB.");
    }

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

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

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="max-w-5xl mx-auto px-5 py-12">
      <h1 className="text-4xl font-bold mb-10">Create New Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Image */}

        <div>
          <label className="font-semibold block mb-3">Cover Image</label>

          <label className="border-2 border-dashed rounded-xl h-64 flex flex-col justify-center cursor-pointer hover:border-black transition">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <div className="flex flex-col items-center">
                <Upload size={42} className="text-gray-500" />

                <p className="mt-3 text-gray-500">Click or drag image here</p>
              </div>
            )}

            <input
              type="file"
              ref={fileInputRef}
              hidden
              accept="image/*"
              onChange={handleImage}
            />
          </label>
          {formData.image && (
            <p className="mt-2 text-sm text-gray-500">{formData.image.name}</p>
          )}
        </div>

        {/* Title */}

        <div>
          <label className="font-semibold block mb-3">Title</label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-xl p-4 outline-none focus:border-black"
            placeholder="Enter Blog Title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold block mb-3">Description</label>

          <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-xl p-4 outline-none focus:border-black resize-none"
            placeholder="Short description"
          />
        </div>

        {/* Category */}
        <div>
          <label className="font-semibold block mb-3">Category</label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-xl p-4 outline-none focus:border-black"
          >
            <option value="">Select Category</option>
            <option value="React">React</option>
            <option value="Node">Node</option>
            <option value="Express">Express</option>
            <option value="MongoDB">MongoDB</option>
            <option value="Backend">Backend</option>
            <option value="Frontend">Frontend</option>
            <option value="JavaScript">JavaScript</option>
          </select>
        </div>

        {/* Content */}
        <div>
          <label className="font-semibold block mb-3">Content</label>

          <textarea
            rows={12}
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full border rounded-xl p-4 outline-none focus:border-black resize-none"
            placeholder="Write your blog...."
          ></textarea>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800  transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Publishing...." : "Publish Blog"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
