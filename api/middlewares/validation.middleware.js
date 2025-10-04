import { body, validationResult } from 'express-validator';
import logger from '../../utils/logger.js';

export const validateBlog = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters')
    .escape(),
  
  body('content')
    .trim()
    .isLength({ min: 10, max: 50000 })
    .withMessage('Content must be between 10 and 50,000 characters'),
  
  body('author')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Author must be between 1 and 100 characters')
    .escape(),
  
  body('image')
    .optional()
    .trim()
    .isURL()
    .withMessage('Image must be a valid URL'),
  
  body('categories')
    .optional()
    .isArray({ max: 10 })
    .withMessage('Categories must be an array with maximum 10 items'),
  
  body('categories.*')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Each category must be between 1 and 50 characters')
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      logger.warn('Validation failed', {
        errors: errors.array(),
        ip: req.ip,
        body: req.body
      });
      
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }
    
    next();
  }
];

export const sanitizeInput = (req, res, next) => {
  // Additional sanitization for content (allow some HTML but escape dangerous stuff)
  if (req.body.content) {
    // Remove script tags and other dangerous elements
    req.body.content = req.body.content
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '');
  }
  
  next();
};