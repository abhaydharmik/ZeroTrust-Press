import React from "react";

const TopAuthors = ({ authors = [] }) => {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold">Top Authors</h2>

      {authors.length === 0 ? (
        <div className="py-12 text-center text-gray-500">No authors found.</div>
      ) : (
        <div className="space-y-4">
          {authors.map((author, index) => {
            const avatar = author.avatar
              ? author.avatar.startsWith("http")
                ? author.avatar
                : `http://localhost:5000/uploads/${author.avatar}`
              : `https://ui-avatars.com/api/?name=${encodeURIComponent(author.name)}&background=000000&color=ffffff`;
            return (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-3 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={avatar}
                    alt={author.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium">{author.name}</h3>
                    <p className="text-sm text-gray-500">
                      {author.totalBlogs} Blog
                      {author.totalBlogs !== 1 && "s"}
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium">
                  #{index + 1}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TopAuthors;
