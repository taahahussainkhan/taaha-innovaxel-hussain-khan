const ShortUrlDisplay = ({ shortUrl, error }) => {
    return (
      <>
        {shortUrl && (
          <div className="mt-4 text-center">
            <p className="text-gray-700">Short URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {shortUrl}
            </a>
          </div>
        )}
        {error && (
          <div className="mt-4 text-center text-red-600">
            {error}
          </div>
        )}
      </>
    );
  };
  
  export default ShortUrlDisplay;
  