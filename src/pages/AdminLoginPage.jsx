import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLoginPage() {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already authenticated
    const storedKey = localStorage.getItem('blog_admin_key');
    if (storedKey) {
      navigate('/admin/editor');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!apiKey.trim()) {
      setError('Please enter your API key');
      return;
    }

    // Store the API key (will be validated when making API calls)
    localStorage.setItem('blog_admin_key', apiKey);
    navigate('/admin/editor');
  };

  const handleLogout = () => {
    localStorage.removeItem('blog_admin_key');
    setApiKey('');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-gray-900 mb-2">Admin</h1>
          <p className="text-sm text-gray-500">Enter your API key to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="API Key"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors text-sm"
              autoFocus
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            Continue
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            Keep your API key secure. Don't share it with anyone.
          </p>
        </div>
      </div>
    </div>
  );
}
