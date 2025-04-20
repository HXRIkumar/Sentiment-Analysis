import React, { useState, useEffect } from 'react';
import HistoryItem from './HistoryItem';
import { HistoryItemType } from '../../types';

const HistorySection: React.FC = () => {
  const [history, setHistory] = useState<HistoryItemType[]>([]);
  const [filter, setFilter] = useState<'all' | 'positive' | 'neutral' | 'negative'>('all');
  
  useEffect(() => {
    // Load history from localStorage
    const savedHistory = localStorage.getItem('sentimentHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);
  
  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear your analysis history?')) {
      localStorage.removeItem('sentimentHistory');
      setHistory([]);
    }
  };
  
  const filteredHistory = history.filter(item => {
    if (filter === 'all') return true;
    return item.results.sentiment.toLowerCase().includes(filter);
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-0">Analysis History</h2>
        
        <div className="flex space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 text-sm"
          >
            <option value="all">All Analyses</option>
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>
          
          <button
            onClick={clearHistory}
            disabled={history.length === 0}
            className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear History
          </button>
        </div>
      </div>
      
      {filteredHistory.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            {history.length === 0 
              ? "You haven't performed any analyses yet." 
              : "No analyses match the selected filter."}
          </p>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {history.length === 0 
              ? "Try analyzing some text to see your history here."
              : "Try changing the filter or clearing your filter to see all analyses."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map((item) => (
            <HistoryItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HistorySection;