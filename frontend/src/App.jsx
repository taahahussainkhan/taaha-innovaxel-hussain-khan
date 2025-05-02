import { useState } from 'react';
import axios from 'axios';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShortUrl('');
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/shorten', {
        url: originalUrl,
      });

      const data = response.data;
      setShortUrl(`http://localhost:3000/shorten/${data.shortCode}`);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Server error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className=" p-6 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl  text-black font-bold mb-4 text-center">URL Shortener</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="url"
            placeholder="Enter a long URL"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-800 rounded-xl text-black"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            {loading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </form>

        {shortUrl && (
          <div className="mt-4 text-center">
            <p className="text-gray-700">Short URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {shortUrl}
            </a>
          </div>
        )}

        {error && (
          <div className="mt-4 text-center text-red-600">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
