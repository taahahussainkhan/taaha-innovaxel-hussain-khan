import { useState } from "react";
import { getStats } from "../../services/api";

const StatsForm = () => {
  const [shortCode, setShortCode] = useState("");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGetStats = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStats(null);
    setError("");

    try {
      const response = await getStats(shortCode);
      setStats(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to get stats.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow-md rounded-lg border border-gray-100">
      <h2 className="text-2xl font-medium mb-6 text-gray-800">URL Statistics</h2>
      <form onSubmit={handleGetStats} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Enter short code to get stats"
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
              Loading Stats
            </>
          ) : (
            'Get Stats'
          )}
        </button>
      </form>

      {stats && (
        <div className="mt-6 p-4 bg-gray-50 border border-gray-100 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Short URL Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex flex-col">
              <span className="text-gray-500">Short Code:</span>
              <span className="text-gray-800 font-medium">{stats.shortCode}</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-gray-500">Original URL:</span>
              <a 
                href={stats.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 truncate break-all"
              >
                {stats.url}
              </a>
            </div>
            
            <div className="flex flex-col">
              <span className="text-gray-500">Access Count:</span>
              <span className="text-gray-800 font-medium">{stats.accessCount}</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-gray-500">Created:</span>
              <span className="text-gray-800">{new Date(stats.createdAt).toLocaleString()}</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-gray-500">Last Updated:</span>
              <span className="text-gray-800">{new Date(stats.updatedAt).toLocaleString()}</span>
            </div>
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

export default StatsForm;