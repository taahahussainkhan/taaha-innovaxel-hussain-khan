import { useState } from 'react';
import { deleteShortUrl } from '../../services/api';

const DeleteForm = () => {
  const [shortCode, setShortCode] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      await deleteShortUrl(shortCode);
      setMessage(`Short URL '${shortCode}' deleted successfully.`);
      setShortCode('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow-md rounded-lg border border-gray-100">
      <h2 className="text-2xl font-medium mb-6 text-gray-800">Delete Short URL</h2>
      <form onSubmit={handleDelete} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Enter short code to delete"
            value={shortCode}
            onChange={(e) => setShortCode(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors duration-200 flex justify-center items-center"
        >
          {loading ? (
            <>
              <span className="mr-2 inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Deleting
            </>
          ) : (
            'Delete Short URL'
          )}
        </button>
      </form>

      {message && (
        <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-lg">
          <p className="text-green-600 text-sm">{message}</p>
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

export default DeleteForm;