import React, { useEffect } from "react";
import { Bookmark } from "lucide-react";
import { useState } from "react";
import { toggleBookmark } from "../../services/bookmarkService";
import toast from "react-hot-toast";

const BookmarkButton = ({ blogId, initialBookmarked = false }) => {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [loading, setLoading] = useState(false);

  const handleBookmark = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const { data } = await toggleBookmark(blogId);

      setBookmarked(data.bookmarked);

      toast.success(data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update bookmark.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setBookmarked(initialBookmarked);
  }, [initialBookmarked]);

  return (
    <button
      onClick={handleBookmark}
      disabled={loading}
      className="transition hover:scale-110"
    >
      <Bookmark
        size={22}
        fill={bookmarked ? "currentColor" : "none"}
        className={bookmarked ? "text-blue-600" : "text-gray-500"}
      />
    </button>
  );
};

export default BookmarkButton;
