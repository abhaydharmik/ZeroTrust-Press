const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getUserProfile,
  updateUserProfile,
  changePassword,
  uploadAvatar,
} = require("../controllers/userController");
const upload = require("../middleware/uploadMiddlware");
const router = express.Router();

router.get("/profile", authMiddleware, getUserProfile);

router.put("/profile", authMiddleware, updateUserProfile);

router.put("/change-password", authMiddleware, changePassword);

router.post("/avatar", authMiddleware, upload.single("avatar"), uploadAvatar);

module.exports = router;
