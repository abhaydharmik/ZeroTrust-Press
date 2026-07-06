import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addComment, getBlogById, likeBlog } from "../services/blogService";
import Loader from "../components/common/Loader";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Calendar, Heart, MessageCircle, Send, User } from "lucide-react";
import BlogHeader from "../components/blog/BlogHeader";
import LikeButton from "../components/blog/LikeButton";
import CommentForm from "../components/blog/CommentForm";
import CommentCard from "../components/blog/CommentCard";

const BlogDetails = () => {
  const { id } = useParams();

  const { user } = useAuth();

  const [blog, setBlog] = useState(null);

  const [loading, setLoading] = useState(true);

  const [comment, setComment] = useState("");

  const [likeLoading, setLikeLoading] = useState(false);

  const [commentLoading, setCommentLoading] = useState(false);

  const fetchBlog = async () => {
    try {
      const { data } = await getBlogById(id);

      setBlog(data.blog);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch blog");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const handleLike = async () => {
    try {
      setLikeLoading(true);

      await likeBlog(blog._id);

      fetchBlog();
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLikeLoading(false);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      return toast.error("Please write a comment");
    }

    try {
      setCommentLoading(true);

      await addComment(blog._id, comment);

      toast.success("Comment Added");

      setComment("");

      fetchBlog();
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!blog) {
    return (
      <div className="text-center  py-24">
        <h1 className="text-4xl font-bold">Blog Not Found</h1>
      </div>
    );
  }

  const liked = user && blog.likes.some((like) => like === user._id);

  return (
    <div className="max-w-5xl mx-auto px-5 py-10">
      <img
        src={
          blog.image
            ? "http://localhost:5000/uploads/${blog.image"
            : "https://placehold.co/1200x600?text=No+Image"
        }
        alt={blog.title}
        className="w-full h-125 rounded-2xl object-cover"
      />

      <BlogHeader blog={blog} />

      {/* Actions */}

      <LikeButton
        blog={blog}
        liked={liked}
        likeLoading={likeLoading}
        handleLike={handleLike}
      />

      {/* Content */}

      <div className="mt-14 leading-9 whitespace-pre-wrap text-lg text-gray-700">
        {blog.content}
      </div>

      {/* Comments */}

      <div className="mt-20">
        <h2 className="text-3xl font-bold mb-8">
          Comments ({blog.comments.length})
        </h2>
        {user && (
          <CommentForm
            comment={comment}
            setComment={setComment}
            handleComment={handleComment}
            commentLoading={commentLoading}
          />
        )}

        {blog.comments.length === 0 ? (
          <div className="text-center py-10">
            <h3 className="text-2xl  font-semibold">No comments yet</h3>
            <p className="text-gray-500 mt-2">Be the first to comment</p>
          </div>
        ) : (
          <div className="space-y-6">
            {blog.comments.map((comment) => (
              <CommentCard key={comment._id} comment={comment} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
