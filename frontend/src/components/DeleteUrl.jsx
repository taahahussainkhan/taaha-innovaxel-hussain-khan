import { useState } from 'react';
import { deleteShortUrl } from '../../services/api';

const DeleteForm = () => {
  const [shortCode, setShortCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleDelete = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await deleteShortUrl(shortCode);
      setMessage(`Short URL '${shortCode}' deleted successfully.`);
      setShortCode('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete.');
    }
  };

  return (
    <>
      <form onSubmit={handleDelete} className="space-y-4">
        <input
          type="text"
          placeholder="Enter short code to delete"
          value={shortCode}
          onChange={(e) => setShortCode(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-800 rounded-xl text-black"
        />
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded-xl hover:bg-red-700 transition"
        >
          Delete Short URL
        </button>
      </form>

      {message && <div className="mt-4 text-green-600 text-center">{message}</div>}
      {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
    </>
  );
};

export default DeleteForm;
