import { useState } from "react";
import { getStats } from "../../services/api";
import { Link } from "react-router-dom";

const StatsForm = () => {
  const [shortCode, setShortCode] = useState("");
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  const handleGetStats = async (e) => {
    e.preventDefault();
    setStats(null);
    setError("");

    try {
      const response = await getStats(shortCode);
      setStats(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to get stats.");
    }
  };

  return (
    <>
      <form onSubmit={handleGetStats} className="space-y-4">
        <input
          type="text"
          placeholder="Enter short code to get stats"
          value={shortCode}
          onChange={(e) => setShortCode(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-800 rounded-xl text-black"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Get Stats
        </button>
      </form>

      {stats && (
        <div className="mt-4 text-center">
          <p className="text-gray-700">Short URL Stats:</p>
          <ul className="list-disc text-left text-black">
            <li>
              <strong>Short URL:</strong> {stats.shortCode}
            </li>
            <li>
              <strong>Original URL:</strong>{" "}
              <a href={stats.url} target="_blank" rel="noopener noreferrer">
                {stats.url}
              </a>
            </li>

            <li>
              <strong>Access Count:</strong> {stats.accessCount}
            </li>
            <li>
              <strong>Created At:</strong>{" "}
              {new Date(stats.createdAt).toLocaleString()}
            </li>
            <li>
              <strong>Updated At:</strong>{" "}
              {new Date(stats.updatedAt).toLocaleString()}
            </li>
          </ul>
        </div>
      )}

      {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
    </>
  );
};

export default StatsForm;
