import { useEffect, useState } from 'react';
import { shortenUrl } from '../../services/api';
import ShortUrlDisplay from '../components/ShortUrlDisplay';

const UrlForm = () => {
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
      const response = await shortenUrl(originalUrl);
      const { shortCode } = response.data;
      setShortUrl(`http://localhost:3000/${shortCode}`);
    } catch (err) {
      const msg = err.response?.data?.message || 'Server error';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

 


  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow-md rounded-lg border border-gray-100">
      <h2 className="text-2xl font-medium mb-6 text-gray-800">URL Shortener</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="url"
            placeholder="Enter your long URL"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200 flex justify-center items-center"
        >
          {loading ? (
            <>
              <span className="mr-2 inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Shortening
            </>
          ) : (
            'Shorten URL'
          )}
        </button>
      </form>
      <div className="mt-6">
        <ShortUrlDisplay shortUrl={shortUrl} error={error} />
      </div>
    </div>
  );
};

export default UrlForm;