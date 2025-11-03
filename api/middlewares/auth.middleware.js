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

  const validApiKey = process.env.API_KEY;

  if (!validApiKey) {
    return res.status(500).json({ 
      error: 'Server configuration error',
      message: 'API key not configured on server' 
    });
  }

  if (apiKey !== validApiKey) {
    return res.status(403).json({ 
      error: 'Invalid API key',
      message: 'Access denied' 
    });
  }

  next();
}