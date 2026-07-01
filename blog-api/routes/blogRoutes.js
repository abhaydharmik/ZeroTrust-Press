const express = require("express")
const router = express.Router()

const upload = require("../middleware/uploadMiddlware")
const { createBlog, getAllBlogs, getBlogById } = require("../controllers/blogController")
const authMiddleware = require("../middleware/authMiddleware")

router.get("/", getAllBlogs)
router.get("/:id", getBlogById)

router.post("/", authMiddleware ,upload.single("image"), createBlog)

module.exports = router