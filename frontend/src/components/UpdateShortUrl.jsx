import { useState } from 'react';
import { updateShortUrl } from '../../services/api';


function UpdateUrl() {
  const [shortCode, setShortCode] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await updateShortUrl(shortCode, newUrl);
      setMessage(`URL updated! New URL: ${response.data.url}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className=" p-6 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl text-black font-bold mb-4 text-center">Update Short URL</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter short code"
            value={shortCode}
            onChange={(e) => setShortCode(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-800 rounded-xl text-black"
          />
          <input
            type="url"
            placeholder="Enter new long URL"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-800 rounded-xl text-black"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            {loading ? 'Updating...' : 'Update URL'}
          </button>
        </form>

        {message && <div className="mt-4 text-center text-green-600">{message}</div>}
        {error && <div className="mt-4 text-center text-red-600">{error}</div>}
      </div>
    </div>
  );
}

export default UpdateUrl;
