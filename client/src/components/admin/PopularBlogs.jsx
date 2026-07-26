import { Heart, Trophy } from "lucide-react";

const PopularBlogs = ({ blogs = [] }) => {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold">
        <Trophy size={20} />
        Most Popular Blogs
      </h2>

      {blogs.length === 0 ? (
        <div className="py-12 text-center text-gray-500">
          No blogs found.
        </div>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog, index) => (
            <div
              key={blog._id || index}
              className="flex items-center justify-between border-b pb-3 last:border-b-0"
            >
              <div className="flex-1">
                <h3 className="line-clamp-2 font-medium">
                  {blog.title}
                </h3>

                <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                  <Heart
                    size={15}
                    className="text-red-500"
                    fill="currentColor"
                  />
                  {blog.likes} Likes
                </p>
              </div>

              <span className="ml-4 rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                #{index + 1}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularBlogs;