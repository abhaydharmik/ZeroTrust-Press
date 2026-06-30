const express = require("express")
const router = express.Router()

const upload = require("../middleware/uploadMiddlware")
const { createBlog } = require("../controllers/blogController")
const authMiddleware = require("../middleware/authMiddleware")

router.post("/", authMiddleware ,upload.single("image"), createBlog)

module.exports = router