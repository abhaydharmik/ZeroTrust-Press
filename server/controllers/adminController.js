const User = require("../models/User");
const Blog = require("../models/Blog");
const Category = require("../models/Category");

const getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalBlogs,
      totalAdmins,
      latestUsers,
      latestBlogs,
      totalCategories,
    ] = await Promise.all([
      User.countDocuments(),

      Blog.countDocuments(),

      User.countDocuments({
        role: "admin",
      }),

      User.find()
        .select("-password")
        .sort({
          createdAt: -1,
        })
        .limit(5),

      Blog.find()
        .populate("author", "name email")
        .populate("category", "name slug color")
        .sort({ createdAt: -1 })
        .limit(5),

      Category.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalBlogs,
        totalAdmins,
        totalCategories,
      },
      latestUsers,
      latestBlogs,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search?.trim() || "";

    const skip = (page - 1) * limit;

    // Search Filter
    const filter = search
      ? {
          $or: [
            {
              name: {
                $regex: search,
                $options: "i",
              },
            },
            {
              email: {
                $regex: search,
                $options: "i",
              },
            },
          ],
        }
      : {};

    const [users, totalUsers] = await Promise.all([
      User.find(filter)
        .select("-password")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      User.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,

      users,

      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit),
        totalUsers,
        limit,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch users.",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Cannot delete an admin account.",
      });
    }

    await Blog.deleteMany({
      author: user._id,
    });

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete user.",
    });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role.",
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot change your own role.",
      });
    }

    user.role = role;

    await user.save();

    res.status(200).json({
      success: true,
      message: "User role updated successfully.",
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update user role.",
    });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search?.trim() || "";

    const skip = (page - 1) * limit;

    const filter = search
      ? {
          $or: [
            {
              title: {
                $regex: search,
                $options: "i",
              },
            },
            {
              description: {
                $regex: search,
                $options: "i",
              },
            },
          ],
        }
      : {};

    const [blogs, totalBlogs] = await Promise.all([
      Blog.find(filter)
        .populate("author", "name email avatar")
        .populate("category", "name slug color")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      Blog.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      blogs,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalBlogs / limit),
        totalBlogs,
        limit,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch blogs.",
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    await blog.deleteOne();

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete blog.",
    });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  updateUserRole,
  getAllBlogs,
  deleteBlog,
};
