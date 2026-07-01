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

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "name email",
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        blog,
      });
    }

    res.status(200).json({
      success: true,
      blog,
    })
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

module.exports = { createBlog, getAllBlogs, getBlogById };
