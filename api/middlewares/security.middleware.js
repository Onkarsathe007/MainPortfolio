import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import morgan from 'morgan';
import logger from '../../utils/logger.js';

export const setupSecurity = (app) => {
  // Trust proxy if behind reverse proxy (nginx, cloudflare, etc.)
  if (process.env.TRUST_PROXY === 'true') {
    app.set('trust proxy', 1);
  }

  // Security headers
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    }
  }));

  // CORS configuration
  const corsOptions = {
    origin: (origin, callback) => {
      const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];
      
      // Allow requests with no origin (mobile apps, curl, postman)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        logger.warn('CORS blocked request', { origin });
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key']
  };

  app.use(cors(corsOptions));

  // Rate limiting
  const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
    message: {
      error: 'Too many requests',
      message: 'Rate limit exceeded. Please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      logger.warn('Rate limit exceeded', {
        ip: req.ip,
        userAgent: req.get('User-Agent')
      });
      res.status(429).json({
        error: 'Too many requests',
        message: 'Rate limit exceeded. Please try again later.'
      });
    }
  });

  // Stricter rate limiting for POST requests
  const postLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // 20 POST requests per 15 minutes
    skip: (req) => req.method !== 'POST',
    message: {
      error: 'Too many POST requests',
      message: 'Please wait before creating more content.'
    }
  });

  app.use(limiter);
  app.use('/blog', postLimiter);

  // Compression
  app.use(compression());

  // HTTP request logging
  const morganFormat = process.env.NODE_ENV === 'production' 
    ? 'combined' 
    : 'dev';

  app.use(morgan(morganFormat, {
    stream: {
      write: (message) => {
        logger.info(message.trim(), { type: 'http' });
      }
    }
  }));
};