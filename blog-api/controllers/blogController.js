const Blog = require("../models/Blog");

const createBlog = async (req, res) => {
  try {
    const { title, description, content, category } = req.body;

    const image = req.file ? req.file.filename : "";

    const blog = await Blog.create({
      title,
      description,
      content,
      category,
      image,
      author: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Blog Created Successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createBlog };
