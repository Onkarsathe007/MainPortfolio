import express from "express";
import blogModel from "../../models/blog.model.js";
import { verifyApiKey } from "../middlewares/auth.middleware.js";
import { validateBlog, sanitizeInput } from "../middlewares/validation.middleware.js";
import { asyncHandler } from "../middlewares/error.middleware.js";
import logger from "../../utils/logger.js";

const router = express.Router();

// Validate API key endpoint (for admin login)
router.post("/validate-key", 
  verifyApiKey,
  (req, res) => {
    // If we reach here, the API key is valid (verifyApiKey middleware passed)
    res.json({
      valid: true,
      message: "API key is valid"
    });
  }
);

// Get all blogs with pagination and filtering
router.get("/", asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = Math.min(parseInt(req.query.limit) || 10, 50); // Max 50 per page
  const skip = (page - 1) * limit;
  const category = req.query.category;

  let filter = {};
  if (category) {
    filter.categories = { $in: [category] };
  }

  const [blogs, total] = await Promise.all([
    blogModel.find(filter)
      .select('-__v')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    blogModel.countDocuments(filter)
  ]);

  logger.info('Blogs fetched', {
    page,
    limit,
    total,
    category,
    ip: req.ip
  });

  res.json({
    blogs,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1
    }
  });
}));

// Create new blog (protected)
router.post("/", 
  verifyApiKey, 
  validateBlog, 
  sanitizeInput, 
  asyncHandler(async (req, res) => {
    const { title, content, author, image, categories } = req.body;
    
    const blogData = {
      title,
      author,
      content,
      image: image || null,
      categories: categories || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const blog = await blogModel.create(blogData);
    
    logger.info('Blog created successfully', {
      blogId: blog._id,
      title: blog.title,
      author: blog.author,
      ip: req.ip
    });

    res.status(201).json({
      message: "Blog created successfully",
      blog: {
        id: blog._id,
        title: blog.title,
        author: blog.author,
        createdAt: blog.createdAt
      }
    });
  })
);

// Get single blog by ID
router.get("/:id", asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  // Validate ObjectId format
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ 
      error: "Invalid blog ID format" 
    });
  }

  const blog = await blogModel.findById(id).select('-__v').lean();
  
  if (!blog) {
    logger.warn('Blog not found', { blogId: id, ip: req.ip });
    return res.status(404).json({ 
      error: "Blog not found" 
    });
  }

  logger.info('Blog fetched', { 
    blogId: id, 
    title: blog.title, 
    ip: req.ip 
  });

  res.json(blog);
}));

// Health check endpoint
router.get("/health", (req, res) => {
  res.json({ 
    status: "healthy", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

export { router };