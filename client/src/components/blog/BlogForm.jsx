import { Upload } from "lucide-react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const categories = [
  "React",
  "Node",
  "Express",
  "MongoDB",
  "Backend",
  "Frontend",
  "JavaScript",
];

const BlogForm = ({
  formData,
  setFormData,
  preview,
  setPreview,
  handleSubmit,
  loading,
  isEdit = false,
}) => {
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
      toast.error("Please select an image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be below 5MB.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Cover Image */}

      <div>
        <label className="block mb-3 font-semibold">Cover Image</label>

        <label className="h-72 border-2 border-dashed rounded-2xl flex items-center justify-center cursor-pointer hover:border-black transition overflow-hidden">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center">
              <Upload size={45} className="mx-auto text-gray-500" />
              <p className="mt-3 text-gray-500">Click to upload image</p>
            </div>
          )}

          <input type="file" hidden accept="image/*" onChange={handleImage} />
        </label>

        {formData.image && (
          <p className="mt-2 text-sm text-gray-500">{formData.image.name}</p>
        )}
      </div>

      {/* Title */}

      <div>
        <label className="block mb-2 font-semibold">Title</label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter blog title"
          className="w-full border rounded-xl p-4 outline-none focus:border-black "
        />
      </div>

      {/* Description */}

      <div>
        <label className="block mb-2 font-semibold">Description</label>

        <textarea
          rows={3}
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Short Description"
          className="w-full border rounded-xl p-4 resize-none outline-none focus:border-black"
        />
      </div>

      {/* Category */}

      <div>
        <label className="block mb-2 font-semibold">Category</label>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded-xl p-4 outline-none focus:border-black"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Content */}

      <div>
        <label className="block mb-2 font-semibold">Content</label>
        <textarea
          rows={14}
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Write your blog"
          className="w-full border rounded-xl p-4 resize-none outline-none focus:border-black"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 disabled:opacity-50
      "
      >
        {loading
          ? isEdit
            ? "Updating...."
            : "Publishing...."
          : isEdit
            ? "Update Blog"
            : "Publish Blog"}
      </button>
    </form>
  );
};

export default BlogForm;
