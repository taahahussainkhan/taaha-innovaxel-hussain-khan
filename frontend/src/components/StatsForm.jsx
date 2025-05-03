import { useState, useEffect } from "react";
import { getStats } from "../../services/api";

const StatsForm = () => {
  const [shortCode, setShortCode] = useState(() => localStorage.getItem("shortCode") || "");
  const [stats, setStats] = useState(() => {
    const stored = localStorage.getItem("stats");
    return stored ? JSON.parse(stored) : null;
  });
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
      localStorage.setItem("shortCode", shortCode);
      localStorage.setItem("stats", JSON.stringify(response.data));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to get stats.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    localStorage.removeItem("shortCode");
    localStorage.removeItem("stats");
    setShortCode("");
    setStats(null);
    setError("");
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
            className="w-full px-4 py-3 border border-gray-200 rounded-lg"
          />
        </div>
        <button type="submit" disabled={loading}
                className="w-full bg-blue-500 text-white py-3 rounded-lg">
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
        <div className="mt-6 p-4 bg-gray-50 border border-gray-100 rounded-lg space-y-2">
          <h3 className="text-lg font-medium text-gray-700">Short URL Details</h3>
          <p><strong>Short Code:</strong> {stats.shortCode}</p>
          <p><strong>Original URL:</strong> <a href={stats.url} target="_blank" rel="noreferrer"
                                               className="text-blue-500">{stats.url}</a></p>
          <p><strong>Access Count:</strong> {stats.accessCount}</p>
          <p><strong>Created:</strong> {new Date(stats.createdAt).toLocaleString()}</p>
          <p><strong>Last Updated:</strong> {new Date(stats.updatedAt).toLocaleString()}</p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <button onClick={handleClear}
              className="mt-4 w-full py-2 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded">
        Clear
      </button>
    </div>
  );
};

export default StatsForm;
