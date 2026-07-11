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

      User.find()
        .select("-password")
        .sort({
          createdAt: 1,
        })
        .limit(5),

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
    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    // Search Filter
    const filter = {
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
    };

    const [users, totalUsers] = await Promise.all([
      User.find(filter)
        .select("-password")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

        User.countDocuments(filter)
    ]);

    res.status(200).json({
        success: true,

        users,

        pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalUsers / limit),
            totalUsers,
            limit,
        }
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
        success: false,
        message: "Failed to fetch users.",
    })
  }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found.",
            })
        }

        if(user.role === "admin"){
            return res.status(200).json({
                success: false,
                message: "Cannot delete an admin account.",
            })
        }

        await user.deleteOne()

        res.status(200).json({
            success: true,
            message: "User deleted successfully.",
        })

    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: "Failed to delete user.",
        })
    }
}

module.exports = {
  getDashboardStats,
  getAllUsers,
  deleteUser,
};
