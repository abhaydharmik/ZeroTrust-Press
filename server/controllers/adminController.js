const User = require("../models/User");
const Blog = require("../models/Blog");

const getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalBlogs,
      totalAdmins,
      latestUsers,
      latestBlogs,
      categories,
    ] = await Promise.all([
      User.countDocuments(),

      Blog.countDocuments(),

      User.countDocuments({
        role: "admin",
      }),

      User.find().select("-password").sort({
        createdAt: 1
      }).limit(5),

      Blog.find()
        .populate("author", "name email")
        .sort({ createdAt: -1 })
        .limit(5),

      Blog.distinct("category"),
    ]);

    res.status(200).json({
        success: true,
        stats: {
            totalUsers,
            totalBlogs,
            totalAdmins,
            totalCategories: categories.length,
        },
        latestUsers,
        latestBlogs,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
        success: false,
        message: "Failed to load dashboard",
    })
  }
};

module.exports = {
    getDashboardStats,
}