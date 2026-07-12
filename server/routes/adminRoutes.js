const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const adminMiddleware = require("../middleware/adminMiddleware");

const { getDashboardStats, getAllUsers, deleteUser, updateUserRole, getAllBlogs, deleteBlog } = require("../controllers/adminController");

router.get(
  "/dashboard",
  authMiddleware,
  adminMiddleware,
  getDashboardStats,
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Admin",
      admin: req.user,
    });
  },
);

router.get("/users", authMiddleware, adminMiddleware, getAllUsers)

router.delete("/users/:id", authMiddleware, adminMiddleware, deleteUser)

router.put("/users/:id/role", authMiddleware, adminMiddleware, updateUserRole)

router.get("/blogs/", authMiddleware, adminMiddleware, getAllBlogs)

router.delete("/blogs/:id", authMiddleware, adminMiddleware, deleteBlog)

module.exports = router;
