const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const adminMiddleware = require("../middleware/adminMiddleware");

const { getDashboardStats } = require("../controllers/adminController");

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

module.exports = router;
