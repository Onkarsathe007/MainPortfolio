import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogAPI from '../services/blogAPI';

export default function AdminEditorPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [categories, setCategories] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    // Check if authenticated
    const apiKey = localStorage.getItem('blog_admin_key');
    if (!apiKey) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('blog_admin_key');
    navigate('/admin');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      const apiKey = localStorage.getItem('blog_admin_key');
      
      const blogData = {
        title: title.trim(),
        content: content.trim(),
        author: author.trim() || 'Anonymous',
        image: image.trim() || null,
        categories: categories.split(',').map(c => c.trim()).filter(Boolean)
      };

      await BlogAPI.createBlog(blogData, apiKey);
      
      setMessage({ type: 'success', text: 'Blog published successfully!' });
      
      // Clear form after successful submission
      setTimeout(() => {
        setTitle('');
        setContent('');
        setAuthor('');
        setImage('');
        setCategories('');
        setMessage({ type: '', text: '' });
      }, 2000);

    } catch (error) {
      console.error('Error creating blog:', error);
      
      if (error.message.includes('401') || error.message.includes('403')) {
        setMessage({ type: 'error', text: 'Invalid API key. Please login again.' });
        setTimeout(() => {
          handleLogout();
        }, 2000);
      } else {
        setMessage({ type: 'error', text: error.message || 'Failed to publish blog. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setTitle('');
    setContent('');
    setAuthor('');
    setImage('');
    setCategories('');
    setMessage({ type: '', text: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-sm font-medium text-gray-900">New Post</h1>
          <button
            onClick={handleLogout}
            className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full text-4xl font-light text-gray-900 placeholder-gray-300 focus:outline-none"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Meta fields */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author (optional)"
              className="w-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none py-2"
              disabled={isSubmitting}
            />
            
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Image URL (optional)"
              className="w-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none py-2"
              disabled={isSubmitting}
            />
            
            <input
              type="text"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
              placeholder="Categories (comma separated, optional)"
              className="w-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none py-2"
              disabled={isSubmitting}
            />
          </div>

          {/* Content */}
          <div className="pt-8">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your story..."
              className="w-full min-h-[400px] text-lg text-gray-800 placeholder-gray-300 focus:outline-none leading-relaxed resize-none"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Message */}
          {message.text && (
            <div className={`text-sm text-center py-2 ${
              message.type === 'success' ? 'text-green-600' : 'text-red-600'
            }`}>
              {message.text}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 pt-8 border-t border-gray-100">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Publishing...' : 'Publish'}
            </button>
            
            <button
              type="button"
              onClick={handleClear}
              disabled={isSubmitting}
              className="px-6 py-2 border border-gray-200 text-gray-700 text-sm rounded-lg hover:border-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      {/* Tips */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        <div className="text-xs text-gray-400 space-y-1">
          <p>💡 Tips:</p>
          <p>• You can use Markdown formatting in your content</p>
          <p>• Add multiple categories separated by commas</p>
          <p>• Keep your content focused and engaging</p>
        </div>
      </div>
    </div>
  );
}
