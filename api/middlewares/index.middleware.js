import dotenv from "dotenv";
import ConnectMongo from "../../config/DB.js";
import { router as homeRouter } from "../routes/home.routes.js";
import { router as blogRouter } from "../routes/blog.routes.js";
import { setupSecurity } from "./security.middleware.js";
import { errorHandler, notFoundHandler } from "./error.middleware.js";
import express from "express";
import logger from "../../utils/logger.js";

export default function setUpMiddleware(app) {
  // Load environment variables
  dotenv.config({
    override: true,
    silent: true,
  });

  // Validate required environment variables
  const requiredEnvVars = ['MONGODB_URI', 'API_KEY_HASH', 'PORT'];
  const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
  
  if (missingEnvVars.length > 0) {
    logger.error('Missing required environment variables', { 
      missing: missingEnvVars 
    });
    process.exit(1);
  }

  // Database connection with error handling
  ConnectMongo()
    .then(() => {
      logger.info("Connected to MongoDB successfully");
    })
    .catch((error) => {
      logger.error("Failed to connect to MongoDB", { error: error.message });
      process.exit(1);
    });

  // Security middleware (CORS, helmet, rate limiting, etc.)
  setupSecurity(app);

  // Body parsing middleware with size limits
  app.use(express.json({ 
    limit: '10mb',
    strict: true 
  }));
  app.use(express.urlencoded({ 
    extended: true, 
    limit: '10mb' 
  }));

  // Routes
  app.use("/", homeRouter);
  app.use("/blog", blogRouter);

  // Health check endpoint
  app.get("/health", (req, res) => {
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      version: process.env.npm_package_version || "1.0.0"
    });
  });

  // 404 handler for undefined routes
  app.use(notFoundHandler);

  // Global error handler (must be last)
  app.use(errorHandler);

  // Graceful shutdown handling
  const gracefulShutdown = (signal) => {
    logger.info(`Received ${signal}. Starting graceful shutdown...`);
    
    // Close server and database connections
    process.exit(0);
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  // Handle uncaught exceptions
  process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception', { 
      error: error.message, 
      stack: error.stack 
    });
    process.exit(1);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection', { 
      reason: reason,
      promise: promise 
    });
    process.exit(1);
  });
}