import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

// Generate a secure API key - run this once and add to your .env file
export function generateApiKey() {
  return crypto.randomBytes(32).toString('hex');
}

// Middleware to verify API key
export function verifyApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'] || req.headers['authorization']?.replace('Bearer ', '');
  
  if (!apiKey) {
    return res.status(401).json({ 
      error: 'API key required',
      message: 'Include X-API-Key header or Authorization: Bearer <key>' 
    });
  }

  // Hash the provided API key to compare with stored hash
  const hashedApiKey = crypto.createHash('sha256').update(apiKey).digest('hex');
  const validApiKeyHash = process.env.API_KEY_HASH;

  if (!validApiKeyHash) {
    return res.status(500).json({ 
      error: 'Server configuration error',
      message: 'API key not configured on server' 
    });
  }

  if (hashedApiKey !== validApiKeyHash) {
    return res.status(403).json({ 
      error: 'Invalid API key',
      message: 'Access denied' 
    });
  }

  next();
}

// Utility function to hash an API key for storage
export function hashApiKey(apiKey) {
  return crypto.createHash('sha256').update(apiKey).digest('hex');
}