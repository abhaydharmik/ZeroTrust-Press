import React from "react";
import { Calendar, User } from "lucide-react";

const BlogHeader = ({ blog }) => {
  return (
    <>
      {/* Category */}
      <span className="inline-block border border-black rounded-full px-4 py-2 text-sm font-medium mt-8">
        {blog.category?.name}
      </span>

      {/* Title */}
      <h1 className="text-5xl font-bold mt-6 leading-tight">{blog.title}</h1>

      {/* Description */}
      <p className="mt-5 text-xl text-gray-600">{blog.description}</p>

      {/* Author */}
      <div className="flex flex-wrap items-center justify-between border-y py-6 mt-10">
        <div className="flex items-center gap-3">
          <User />

          <div>
            <h3 className="font-semibold">{blog.author?.name}</h3>

            <p className="text-sm text-gray-500">{blog.author?.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-500">
          <Calendar size={18} />

          {new Date(blog.createdAt).toLocaleDateString()}
        </div>
      </div>
    </>
  );
};

export default BlogHeader;
