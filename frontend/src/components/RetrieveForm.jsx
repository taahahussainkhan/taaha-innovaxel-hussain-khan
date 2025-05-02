import { useState } from 'react';
import { getOriginalUrl } from '../../services/api';

const RetrieveForm = () => {
  const [shortCode, setShortCode] = useState('');
  const [originalUrl, setOriginalUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRetrieve = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOriginalUrl('');
    setError('');

    try {
      const response = await getOriginalUrl(shortCode);
      setOriginalUrl(response.data.url);
    } catch (err) {
      setError(err.response?.data?.message || 'Error retrieving URL');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!originalUrl) return;
    
    try {
      await navigator.clipboard.writeText(originalUrl);
  
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow-md rounded-lg border border-gray-100">
      <h2 className="text-2xl font-medium mb-6 text-gray-800">Retrieve Original URL</h2>
      <form onSubmit={handleRetrieve} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Enter short code (e.g., abc123)"
            value={shortCode}
            onChange={(e) => setShortCode(e.target.value)}
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
              Retrieving
            </>
          ) : (
            'Retrieve Original URL'
          )}
        </button>
      </form>

      {originalUrl && (
        <div className="mt-6 p-4 bg-gray-50 border border-gray-100 rounded-lg">
          <p className="text-sm text-gray-500 mb-2">Original URL:</p>
          <div className="flex flex-col space-y-2">
            <a
              href={originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 break-all"
            >
              {originalUrl}
            </a>
            <button
              onClick={handleCopy}
              className="self-start px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors"
            >
              Copy
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};

export default RetrieveForm;