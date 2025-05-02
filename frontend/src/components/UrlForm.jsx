import { useState } from 'react';
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
      setShortUrl(`http://localhost:3000/shorten/${shortCode}`);
    } catch (err) {
      const msg = err.response?.data?.message || 'Server error';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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

      <ShortUrlDisplay shortUrl={shortUrl} error={error} />
    </>
  );
};

export default UrlForm;
