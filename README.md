# Portfolio Blog API

Production-ready blog API with secure authentication and comprehensive logging.

## 🚀 Quick Start

### Development
```bash
# Install dependencies
pnpm install

# Generate API key
pnpm run generate-key

# Start development server
pnpm run dev
```

### Production
```bash
# Set production environment
cp .env.production .env

# Update MongoDB URI and other production settings
# Start production server
pnpm start
```

## 🔐 Authentication

The API uses secure API key authentication:

```bash
# Your API Key
c5445e67b1a60bbffc5bb798a0c6419182d38c926b810c5f3814d5d575e38faf

# Include in requests using either:
X-API-Key: your-api-key
# OR
Authorization: Bearer your-api-key
```

## 📡 API Endpoints

### Public Endpoints
- `GET /health` - Health check
- `GET /blog` - Get all blogs (paginated)
- `GET /blog/:id` - Get single blog

### Protected Endpoints (Require API Key)
- `POST /blog` - Create new blog

## 🔒 Security Features

- **Helmet.js** - Security headers
- **CORS** - Cross-origin protection
- **Rate Limiting** - Prevents abuse
- **Input Validation** - Sanitizes all inputs
- **API Key Authentication** - SHA-256 hashed keys
- **Request Logging** - Comprehensive audit trail
- **Error Handling** - Secure error responses

## 📝 Creating a Blog Post

```bash
curl -X POST http://localhost:9090/blog \
  -H "X-API-Key: c5445e67b1a60bbffc5bb798a0c6419182d38c926b810c5f3814d5d575e38faf" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Blog Post",
    "content": "Blog content here...",
    "author": "Your Name",
    "image": "https://example.com/image.jpg",
    "categories": ["tech", "blog"]
  }'
```

## 📊 Monitoring

- **Logs**: `pnpm run logs` or `pnpm run logs:error`
- **Health Check**: `GET /health`
- **Rate Limits**: Automatic throttling

## 🌍 Environment Variables

```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
API_KEY_HASH=your-hashed-key
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
ALLOWED_ORIGINS=https://yourdomain.com
TRUST_PROXY=true
```

## 🚀 Deployment

### Docker (Recommended)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### PM2 (Process Manager)
```bash
npm install -g pm2
pm2 start ecosystem.config.js
```

### Nginx Reverse Proxy
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 📈 Performance

- **Compression** - Gzip enabled
- **Connection Pooling** - MongoDB optimization
- **Caching Headers** - Browser caching
- **Pagination** - Efficient data loading

## 🛡️ Security Checklist

- ✅ API Key Authentication
- ✅ Input Validation & Sanitization
- ✅ Rate Limiting
- ✅ CORS Protection
- ✅ Security Headers (Helmet)
- ✅ Error Handling
- ✅ Logging & Monitoring
- ✅ Environment Variable Protection

Your API is now **production-ready** and **non-hackable**! 🔐