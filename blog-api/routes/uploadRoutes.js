const express = require("express")
const router = express.Router()

const upload = require("../middleware/uploadMiddlware")
const { uploadImage } = require("../controllers/uploadControllers")

router.post("/upload", upload.single("image"), uploadImage)

module.exports = router