import slugify from "slugify";
import Blog from "../models/Blog";
import Category from "../models/Category";

// @desc Create Category
// @route POST /api/categories
// @access Admin

export const createCategory = async (req, res) => {
  try {
    const { name, description, color } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Category name is required.",
      });
    }

    const existingCategory = await Category.findOne({
      name: name.trim(),
    });

    if (existingCategory) {
      return res.status(400).json({
        message: "Category already exists.",
      });
    }

    const category = await Category.create({
      name: name.trim(),
      slug: slugify(name, {
        lower: true,
        strict: true,
      }),
      description,
      color,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully.",
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc Get All Categories
// @route GET /api/categories
// @access Public

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc Get Category By ID
// @route GET /api/categories/:id
// @access Public

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found.",
      });
    }

    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc Update Category
// @route PUT /api/categories/:id
// @access Admin

export const updateCategory = async (req, res) => {
  try {
    const { name, description, color, isActive } = req.body;

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found.",
      });
    }

    if (name && name.toLowerCase() !== category.name.toLowerCase()) {
      const exists = await Category.findOne({
        name,
      });

      if (exists) {
        return res.status(400).json({
          message: "Category already exists.",
        });
      }

      category.name = name;
      category.slug = slugify(name, { lower: true, strict: true });
    }

    if (description !== undefined) {
      category.description = description;
    }

    if (color != undefined) {
      category.color = color;
    }

    if (isActive != undefined) {
      category.isActive = isActive;
    }

    await category.save();

    res.status(200).json({
      success: true,
      message: "Category updated.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc Delete Category
// @route DELETE /api/categories/:id
// @access Admin

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found.",
      });
    }

    const blogCount = await Blog.countDocuments({
      category: category._id,
    });

    if (blogCount > 0) {
      return res.status(400).json({
        message:
          "Cannot delete category because it is assigned to existing blogs.",
      });
    }

    await category.deleteOne();

    res.status(200).json({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
