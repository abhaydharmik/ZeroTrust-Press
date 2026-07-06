import React from "react";
const CommentCard = ({ comment }) => {
  return (
    <div className="border rounded-xl p-5">
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold">{comment.user?.name || "User"}</h3>

          <p className="text-sm text-gray-500">
            {new Date(comment.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <p className="mt-4 text-gray-700 leading-7">{comment.text}</p>
    </div>
  );
};

export default CommentCard;
