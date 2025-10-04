import { generateApiKey, hashApiKey } from './api/middlewares/auth.middleware.js';

console.log('🔐 Generating secure API key for your blog...\n');

// Generate a new API key
const apiKey = generateApiKey();
const hashedApiKey = hashApiKey(apiKey);

console.log('✅ API Key generated successfully!\n');
console.log('📋 Add this to your .env file:');
console.log(`API_KEY_HASH=${hashedApiKey}\n`);
console.log('🔑 Your API key (keep this secret):');
console.log(`${apiKey}\n`);
console.log('📝 Usage examples:');
console.log('With curl:');
console.log(`curl -X POST http://localhost:3000/blog \\`);
console.log(`  -H "X-API-Key: ${apiKey}" \\`);
console.log(`  -H "Content-Type: application/json" \\`);
console.log(`  -d '{"title":"Test","content":"Content","author":"You"}'`);
console.log('\nWith Postman:');
console.log('- Add header: X-API-Key with value:', apiKey);
console.log('- Or use Authorization: Bearer', apiKey);