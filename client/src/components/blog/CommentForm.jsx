import React from "react";
import { Send } from "lucide-react";

const CommentForm = ({
  comment,
  setComment,
  handleComment,
  commentLoading,
}) => {
  return (
    <form onSubmit={handleComment} className="mb-10">
      <textarea
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your comment..."
        className="w-full border rounded-xl p-4 resize-none outline-none focus:border-black"
      />

      <button className="mt-4 bg-black text-white px-6 py-3 rounded-xl flex items-center gap-2">
        <Send size={18} />

        {commentLoading ? "Posting..." : "Add Comment"}
      </button>
    </form>
  );
};

export default CommentForm;
