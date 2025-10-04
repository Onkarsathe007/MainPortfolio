import express from "express";
import setUpMiddleware from "./api/middlewares/index.middleware.js";
import logger from "./utils/logger.js";

const app = express();

// Setup all middleware
setUpMiddleware(app);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  logger.info(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  logger.info(`📡 Health check available at http://localhost:${PORT}/health`);
  logger.info(`📝 Blog API available at http://localhost:${PORT}/blog`);
});

// Handle server errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    logger.error(`Port ${PORT} is already in use`);
  } else {
    logger.error('Server error', { error: error.message });
  }
  process.exit(1);
});

export default app;