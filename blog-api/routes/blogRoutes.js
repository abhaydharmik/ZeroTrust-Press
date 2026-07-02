const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddlware");
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  likeBlog,
  addComment,
  deleteComment,
  getMyBlogs,
  getDashboardStats,
} = require("../controllers/blogController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, upload.single("image"), createBlog);

router.get("/", getAllBlogs);
router.get("/my-blogs", authMiddleware, getMyBlogs);
router.get("/dashboard", authMiddleware, getDashboardStats);
router.get("/:id", getBlogById);

router.put("/:id", authMiddleware, upload.single("image"), updateBlog);

router.delete("/:id", authMiddleware, deleteBlog);

router.put("/:id/like", authMiddleware, likeBlog);

router.post("/:id/comment", authMiddleware, addComment);

router.delete("/:id/comment/:commentId", authMiddleware, deleteComment);

module.exports = router;