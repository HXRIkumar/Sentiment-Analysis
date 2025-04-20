import React, { useState } from 'react';
import { Globe } from 'lucide-react';

interface UrlInputProps {
  setText: (text: string) => void;
}

const UrlInput: React.FC<UrlInputProps> = ({ setText }) => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUrlContent = async () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    // Simple URL validation
    if (!url.match(/^(http|https):\/\/[^ "]+$/)) {
      setError('Please enter a valid URL (starting with http:// or https://)');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // In a real implementation, this would be a call to a backend service
      // that fetches the content of the URL and extracts the text
      // For this demo, we'll simulate it with a delay and mock text
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate extracted text from URL
      const extractedText = `This is simulated text extracted from ${url}. In a real implementation, we would fetch the actual content of the webpage and extract meaningful text for analysis. This is a positive example with good sentiment.`;
      
      setText(extractedText);
    } catch (err) {
      setError('Failed to fetch content from the URL. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <label htmlFor="url-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Enter a URL to analyze
      </label>
      
      <div className="mt-1 flex rounded-md shadow-sm">
        <div className="relative flex items-stretch flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Globe className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            id="url-input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white py-2"
            disabled={isLoading}
          />
        </div>
        <button
          type="button"
          onClick={fetchUrlContent}
          disabled={isLoading || !url}
          className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Fetching...' : 'Fetch Content'}
        </button>
      </div>
      
      {error && (
        <div className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}
      
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        Enter any public webpage URL to analyze its textual content
      </p>
    </div>
  );
};

export default UrlInput;