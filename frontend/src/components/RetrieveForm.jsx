import { useState } from 'react';
import { getOriginalUrl } from '../../services/api';

const RetrieveForm = () => {
  const [shortCode, setShortCode] = useState('');
  const [originalUrl, setOriginalUrl] = useState('');
  const [error, setError] = useState('');

  const handleRetrieve = async (e) => {
    e.preventDefault();
    setOriginalUrl('');
    setError('');

    try {
      const response = await getOriginalUrl(shortCode);
      setOriginalUrl(response.data.url);
    } catch (err) {
      setError(err.response?.data?.message || 'Error retrieving URL');
    }
  };

  return (
    <>
      <form onSubmit={handleRetrieve} className="space-y-4">
        <input
          type="text"
          placeholder="Enter short code (e.g., abc123)"
          value={shortCode}
          onChange={(e) => setShortCode(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-800 rounded-xl text-black"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
        >
          Retrieve Original URL
        </button>
      </form>

      {originalUrl && (
        <div className="mt-4 text-center">
          <p className="text-gray-700">Original URL:</p>
          <a
            href={originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline break-all"
          >
            {originalUrl}
          </a>
        </div>
      )}

      {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
    </>
  );
};

export default RetrieveForm;
