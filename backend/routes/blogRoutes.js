const express = require("express");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    message: "Image uploaded",
    file: req.file,
  });
});

module.exports = router;
