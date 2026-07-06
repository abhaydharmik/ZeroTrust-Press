import React from "react";
import { Heart, MessageCircle } from "lucide-react";

const LikeButton = ({ blog, liked, likeLoading, handleLike }) => {
  return (
    <div className="flex items-center gap-8 mt-8">
      <button
        onClick={handleLike}
        disabled={likeLoading}
        className={`flex items-center gap-2 px-5 py-3 rounded-full border transition-all
        ${liked ? "bg-black text-white" : "hover:bg-black hover:text-white"}`}
      >
        <Heart size={20} />

        {blog.likes.length}
      </button>

      <div className="flex items-center gap-2">
        <MessageCircle size={20} />

        {blog.comments.length}
      </div>
    </div>
  );
};

export default LikeButton;
