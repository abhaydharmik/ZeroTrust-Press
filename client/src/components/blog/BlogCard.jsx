import React from "react";
import {Link} from "react-router-dom"
import { ArrowRight, Heart, MessageCircle } from "lucide-react";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <img
        src={blog.image ? `http://localhost:5000/uploads/${blog.image}`: `https://placehold.co/600x400?text=No+Image` }
        alt={blog.title}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">

        <span className="inline-block text-xs font-semibold border border-black rounded-full px-3 py-1">{blog.category}</span>
        <h2 className="text-2xl font-bold mt-4 line-clamp-2">{blog.title}</h2>
        <p className="text-gray-600 mt-3 line-clamp-3">{blog.description}</p>

        <div className="mt-5 flex items-center justify-between text-sm text-gray-500">
          <div>
            <p className="font-medium text-black">{blog.author?.name}</p>
            <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
          </div>

          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <Heart size={18} />
              <span>{blog.likes.length}</span>
            </div>

            <div className="flex items-center gap-1">
              <MessageCircle size={18} />
              <span>{blog.comments.length}</span>
            </div>

          </div>
        </div>

        <Link to={`/blogs/${blog._id}`} className="mt-6 inline-flex items-center gap-2 font-semibold hover:gap-3 transition-all">
          Read More <ArrowRight size={18} />{" "}
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
