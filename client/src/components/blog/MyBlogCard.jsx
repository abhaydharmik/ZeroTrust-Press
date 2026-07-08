import React from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Heart,
  MessageCircle,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";

const MyBlogCard = ({ blog, onDelete }) => {
  return (
    <div className="border rounded-2xl overflow-hidden hover:shadow-lg transition">
      {/* Image */}

      <img
        src={
          blog.image
            ? `http://localhost:5000/uploads/${blog.image}`
            : "https://placehold.co/600x400?text=No+Image"
        }
        alt={blog.title}
        className="w-full h-52 object-cover"
      />

      <div className="p-5">
        {/* Category */}

        <span className="border rounded-full px-3 py-1 text-xs font-medium">
          {blog.category}
        </span>

        {/* Title */}

        <h2 className="text-2xl font-bold mt-4 line-clamp-2">{blog.title}</h2>

        {/* Description */}

        <p className="text-gray-500 mt-3 line-clamp-3">{blog.description}</p>

        {/* Date */}

        <div className="flex items-center gap-2 text-gray-500 mt-5">
          <Calendar size={16} />

          {new Date(blog.createdAt).toLocaleDateString()}
        </div>

        {/* Stats */}

        <div className="flex gap-6 mt-5">
          <div className="flex items-center gap-2">
            <Heart size={18} />

            {blog.likes.length}
          </div>

          <div className="flex items-center gap-2">
            <MessageCircle size={18} />

            {blog.comments.length}
          </div>
        </div>

        {/* Buttons */}

        <div className="grid grid-cols-3 gap-3 mt-8">
          <Link
            to={`/blog/${blog._id}`}
            className="border rounded-lg py-2 flex justify-center items-center hover:bg-black hover:text-white transition"
          >
            <Eye size={18} />
          </Link>

          <Link
            to={`/edit-blog/${blog._id}`}
            className="border rounded-lg py-2 flex justify-center items-center hover:bg-black hover:text-white transition"
          >
            <Pencil size={18} />
          </Link>

          <button
            onClick={onDelete}
            className="border rounded-lg py-2 flex justify-center items-center hover:bg-red-600 hover:text-white hover:border-red-600 transition"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyBlogCard;
