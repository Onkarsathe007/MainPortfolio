import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

// Middleware to verify API key
export function verifyApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'] || req.headers['authorization']?.replace('Bearer ', '');
  
  if (!apiKey) {
    return res.status(401).json({ 
      error: 'API key required',
      message: 'Include X-API-Key header or Authorization: Bearer <key>' 
    });
  }

  // Support both simple API_KEY and hashed API_KEY_HASH (backward compatibility)
  const validApiKey = process.env.API_KEY;
  const validApiKeyHash = process.env.API_KEY_HASH;

  if (!validApiKey && !validApiKeyHash) {
    return res.status(500).json({ 
      error: 'Server configuration error',
      message: 'API key not configured on server' 
    });
  }

  // Check simple API key first
  if (validApiKey && apiKey === validApiKey) {
    return next();
  }

  // Fall back to hash comparison (for backward compatibility)
  if (validApiKeyHash) {
    const hashedApiKey = crypto.createHash('sha256').update(apiKey).digest('hex');
    if (hashedApiKey === validApiKeyHash) {
      return next();
    }
  }

  return res.status(403).json({ 
    error: 'Invalid API key',
    message: 'Access denied' 
  });
}