import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogAPI from '../services/blogAPI';
import '../styles/AdminEditor.css';

export default function AdminEditorPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [categories, setCategories] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    // Check if authenticated
    const apiKey = localStorage.getItem('blog_admin_key');
    if (!apiKey) {
      navigate('/admin');
    }
  }, [navigate]);

  useEffect(() => {
    // Update word count
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(words);
  }, [content]);

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
    <div className="editor-container">
      {/* Subtle gradient background */}
      <div className="editor-background"></div>

      {/* Header */}
      <header className="editor-header">
        <div className="editor-header-content">
          <div className="editor-title">
            <span className="editor-icon">✍️</span>
            <span>Write</span>
          </div>
          <div className="editor-stats">
            <span className="word-count">{wordCount} words</span>
            <span className="divider">·</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Editor */}
      <main className="editor-main">
        <form onSubmit={handleSubmit} className="editor-form">
          {/* Title Input */}
          <div className="title-section">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Untitled Story"
              className="title-input"
              required
              disabled={isSubmitting}
              autoFocus
            />
          </div>

          {/* Meta Information */}
          <div className="meta-section">
            <div className="meta-grid">
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Your name"
                className="meta-input"
                disabled={isSubmitting}
              />
              <input
                type="text"
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
                placeholder="Tags (comma separated)"
                className="meta-input"
                disabled={isSubmitting}
              />
            </div>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Cover image URL (optional)"
              className="meta-input meta-input-full"
              disabled={isSubmitting}
            />
          </div>

          {/* Content Editor */}
          <div className="content-section">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing something amazing..."
              className="content-textarea"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Status Message */}
          {message.text && (
            <div className={`status-message ${message.type}`}>
              {message.type === 'success' ? '✓' : '✕'} {message.text}
            </div>
          )}

          {/* Action Bar */}
          <div className="action-bar">
            <div className="action-left">
              <button
                type="button"
                onClick={handleClear}
                disabled={isSubmitting}
                className="btn-secondary"
              >
                Clear
              </button>
            </div>
            <div className="action-right">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Publishing...
                  </>
                ) : (
                  <>Publish →</>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Writing Tips */}
        <div className="writing-tips">
          <p className="tip-title">💡 Writing Tips</p>
          <ul className="tip-list">
            <li>Write freely - edit later</li>
            <li>Use Markdown for formatting</li>
            <li>Keep paragraphs short and scannable</li>
            <li>Tell a story that matters</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
