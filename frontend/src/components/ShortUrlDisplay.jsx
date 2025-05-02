import useCopyToClipboard from "../hooks/useCopyToClipboard";

const ShortUrlDisplay = ({ shortUrl, error }) => {
  const [copiedUrl, copyToClipboard] = useCopyToClipboard();

  const handleCopy = () => {
    if (!shortUrl) return;
    copyToClipboard(shortUrl);
  };

  if (error) {
    return (
      <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    );
  }

  if (!shortUrl) return null;

  return (
    <div className="p-4 bg-gray-50 border border-gray-100 rounded-lg">
      <p className="text-sm text-gray-500 mb-1">Your shortened URL:</p>
      <div className="flex items-center">
        <a 
          href={shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600 truncate mr-2 flex-1"
        >
          {shortUrl}
        </a>
        <button
          onClick={handleCopy}
          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors"
        >
          {copiedUrl ? 'Copied!' : 'Copy'}
        </button>
       
      </div>
    </div>
  );
};

export default ShortUrlDisplay;
