import React from 'react';

interface KeywordCloudProps {
  keywords: Array<{
    term: string;
    score: number;
    sentiment: string;
  }>;
}

const KeywordCloud: React.FC<KeywordCloudProps> = ({ keywords }) => {
  if (!keywords.length) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        No keywords found in the analyzed text
      </div>
    );
  }

  // Sort keywords by absolute score value (importance)
  const sortedKeywords = [...keywords].sort((a, b) => Math.abs(b.score) - Math.abs(a.score));
  
  // Helper to determine font size based on score
  const getFontSize = (score: number): string => {
    const absScore = Math.abs(score);
    if (absScore > 0.8) return 'text-xl';
    if (absScore > 0.6) return 'text-lg';
    if (absScore > 0.4) return 'text-base';
    if (absScore > 0.2) return 'text-sm';
    return 'text-xs';
  };
  
  // Helper to determine color based on sentiment
  const getColor = (sentiment: string): string => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
      case 'very positive':
        return 'text-green-500 dark:text-green-400';
      case 'negative':
      case 'very negative':
        return 'text-red-500 dark:text-red-400';
      default:
        return 'text-yellow-500 dark:text-yellow-400';
    }
  };

  return (
    <div className="w-full h-full flex flex-wrap justify-center items-center gap-3 p-2 overflow-hidden">
      {sortedKeywords.slice(0, 20).map((keyword, index) => (
        <span
          key={index}
          className={`${getFontSize(keyword.score)} ${getColor(keyword.sentiment)} font-medium px-2 py-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 cursor-default`}
          title={`${keyword.term}: ${keyword.score.toFixed(2)} (${keyword.sentiment})`}
        >
          {keyword.term}
        </span>
      ))}
    </div>
  );
};

export default KeywordCloud;