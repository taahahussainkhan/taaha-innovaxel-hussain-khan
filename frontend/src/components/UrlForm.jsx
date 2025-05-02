import { useState, useEffect } from 'react';
import { shortenUrl } from '../../services/api';
import { FaRegCopy } from 'react-icons/fa';

const UrlForm = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortCode, setShortCode] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState({ url: false, code: false });

  
  useEffect(() => {
    const storedCode = localStorage.getItem('shortCode');
    const storedUrl = localStorage.getItem('shortUrl');
    if (storedCode && storedUrl) {
      setShortCode(storedCode);
      setShortUrl(storedUrl);
    }
  }, []);

  
  useEffect(() => {
    if (shortCode && shortUrl) {
      localStorage.setItem('shortCode', shortCode);
      localStorage.setItem('shortUrl', shortUrl);
    }
  }, [shortCode, shortUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setCopied({ url: false, code: false });

    try {
      const response = await shortenUrl(originalUrl);
      const { shortCode } = response.data;
      const fullUrl = `http://localhost:3000/${shortCode}`;
      setShortCode(shortCode);
      setShortUrl(fullUrl);
    } catch (err) {
      const msg = err.response?.data?.message || 'Server error';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied({ ...copied, [type]: true });
    setTimeout(() => setCopied({ ...copied, [type]: false }), 2000);
  };

  const handleClear = () => {
    setShortCode('');
    setShortUrl('');
    setCopied({ url: false, code: false });
    localStorage.removeItem('shortCode');
    localStorage.removeItem('shortUrl');
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-xl mx-auto">
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

      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

      {shortUrl && (
        <div className="mt-6 space-y-4 text-black">
          <div className="flex justify-between items-center bg-gray-100 p-3 rounded-xl">
            <span className="font-medium">Short Code:</span>
            <div className="flex items-center gap-2">
              <span className="text-blue-700 font-mono">{shortCode}</span>
              <button
                onClick={() => handleCopy(shortCode, 'code')}
                title="Copy short code"
                className="text-gray-600 hover:text-blue-600"
              >
                <FaRegCopy />
              </button>
              {copied.code && <span className="text-green-600 text-sm">Copied!</span>}
            </div>
          </div>

          <div className="flex justify-between items-center bg-gray-100 p-3 rounded-xl">
            <span className="font-medium">Short URL:</span>
            <div className="flex items-center gap-2">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 font-mono underline"
              >
                {shortUrl}
              </a>
              <button
                onClick={() => handleCopy(shortUrl, 'url')}
                title="Copy short URL"
                className="text-gray-600 hover:text-blue-600"
              >
                <FaRegCopy />
              </button>
              {copied.url && <span className="text-green-600 text-sm">Copied!</span>}
            </div>
          </div>

          <button
            onClick={handleClear}
            className="w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition mt-4"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default UrlForm;
