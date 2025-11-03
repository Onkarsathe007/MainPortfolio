// Use proxy in development, direct API in production
const API_BASE_URL = import.meta.env.DEV 
  ? '/api' 
  : (import.meta.env.VITE_API_BASE_URL || 'https://mainportfolio-xyfi.onrender.com').replace(/\/$/, '');

class BlogAPI {
  static async getAllBlogs() {
    try {
      const response = await fetch(`${API_BASE_URL}/blog`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.blogs || data;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      
      // Better error messages for debugging
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        throw new Error('Unable to connect to the blog server. Please make sure the backend server is running.');
      }
      
      throw error;
    }
  }

  static async getBlogById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/blog/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Blog post not found');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching blog:', error);
      
      // Better error messages for debugging
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        throw new Error('Unable to connect to the blog server. Please make sure the backend server is running.');
      }
      
      throw error;
    }
  }

  static async createBlog(blogData, apiKey) {
    try {
      const response = await fetch(`${API_BASE_URL}/blog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
        body: JSON.stringify(blogData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication required. Please provide a valid API key.');
        }
        if (response.status === 403) {
          throw new Error('Invalid API key. Access denied.');
        }
        throw new Error(data.error || data.message || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error('Error creating blog:', error);
      
      // Better error messages for debugging
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        throw new Error('Unable to connect to the blog server. Please make sure the backend server is running.');
      }
      
      throw error;
    }
  }

  static async validateApiKey(apiKey) {
    try {
      // Use the dedicated validation endpoint
      const response = await fetch(`${API_BASE_URL}/blog/validate-key`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
      });
      
      // If we get 200, the API key is valid
      if (response.status === 200) {
        return true;
      }
      
      // If we get 401 or 403, the API key is invalid
      if (response.status === 401 || response.status === 403) {
        return false;
      }
      
      // Any other status code, throw an error
      throw new Error(`Unexpected response status: ${response.status}`);
    } catch (error) {
      console.error('Error validating API key:', error);
      // If there's a network error, we should still throw it
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        throw new Error('Unable to connect to the blog server. Please check your connection.');
      }
      throw error;
    }
  }
}

export default BlogAPI;