import React, { useState } from "react";
import { deleteBlog } from "../../services/adminService";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import ConfirmModal from "./ConfirmModal"

const BlogTable = ({ blogs, refreshBlogs }) => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const openDeleteModal = (blog) => {
    setSelectedBlog(blog);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedBlog) return;

    try {
      setDeleteLoading(true);
      await deleteBlog(selectedBlog._id);
      toast.success("Blog deleted successfully.");

      await refreshBlogs();

      setShowDeleteModal(false);
      setSelectedBlog(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete blog.");
    } finally {
      setDeleteLoading(false);
    }
  };

  if (blogs.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-10 text-center text-gray-500">
        No blogs found.
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-2xl border bg-white">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left">Image</th>
              <th className="px-6 py-4 text-left">Title</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-left">Author</th>
              <th className="px-6 py-4 text-left">Published</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs.map((blog) => {
              const image = blog.image
                ? blog.image.startsWith("http")
                  ? blog.image
                  : `http://localhost:5000/uploads/${blog.image}`
                : "https://placehold.co/80x60?text=No+Image";

              return (
                <tr key={blog._id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img
                      src={image}
                      alt={blog.title}
                      className="h-16 w-24 rounded-lg border object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium">{blog.title}</td>
                  <td className="px-6 py-4">{blog.category?.name}</td>
                  <td className="px-6 py-4">
                    {blog.author?.name || "Unknown"}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button onClick={() => openDeleteModal(blog)}
                      className="rounded-lg p-2 text-red-600 transition hover:bg-red-100">
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        title={"Delete Blog"}
        message={`Are you sure you want to delete`}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedBlog(null);
        }}
        onConfirm={handleDelete}
        loading={deleteLoading}
        userName={selectedBlog?.title}
      />
    </>
  );
};

export default BlogTable;
