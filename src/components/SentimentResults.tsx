import React, { useEffect, useRef } from 'react';
import { SentimentData } from '../types';
import SentimentChart from './SentimentChart';
import SentimentEmoji from './SentimentEmoji';
import KeywordCloud from './KeywordCloud';

interface SentimentResultsProps {
  results: SentimentData;
  text: string;
}

const SentimentResults: React.FC<SentimentResultsProps> = ({ results, text }) => {
  const resultsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll to results when they appear
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [results]);

  return (
    <div 
      ref={resultsRef}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 animate-fade-in"
    >
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Analysis Results</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center transition-all duration-300">
          <h4 className="text-sm uppercase font-semibold text-gray-500 dark:text-gray-400 mb-2">Sentiment</h4>
          <div className="flex justify-center mb-2">
            <SentimentEmoji sentiment={results.sentiment} size={48} />
          </div>
          <p className="text-lg font-bold capitalize text-gray-800 dark:text-white">
            {results.sentiment}
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center transition-all duration-300">
          <h4 className="text-sm uppercase font-semibold text-gray-500 dark:text-gray-400 mb-2">Score</h4>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">
            {results.score.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Range: -1 (Negative) to 1 (Positive)
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center transition-all duration-300">
          <h4 className="text-sm uppercase font-semibold text-gray-500 dark:text-gray-400 mb-2">Confidence</h4>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">
            {Math.round(results.confidence * 100)}%
          </p>
          <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2.5 mt-2">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${results.confidence * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="text-sm uppercase font-semibold text-gray-500 dark:text-gray-400 mb-3">Sentiment Distribution</h4>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg h-60 flex items-center justify-center transition-all duration-300">
            <SentimentChart data={results.distribution} />
          </div>
        </div>
        
        <div>
          <h4 className="text-sm uppercase font-semibold text-gray-500 dark:text-gray-400 mb-3">Key Terms</h4>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg h-60 flex items-center justify-center transition-all duration-300">
            <KeywordCloud keywords={results.keywords} />
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm uppercase font-semibold text-gray-500 dark:text-gray-400 mb-3">Analysis Summary</h4>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg transition-all duration-300">
          <p className="text-gray-700 dark:text-gray-300">{results.summary}</p>
        </div>
      </div>
      
      <div className="mt-6">
        <h4 className="text-sm uppercase font-semibold text-gray-500 dark:text-gray-400 mb-2">Analyzed Text</h4>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg max-h-40 overflow-auto transition-all duration-300">
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap text-sm">{text}</p>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md transition-colors duration-200 mr-2">
          Export PDF
        </button>
        <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md transition-colors duration-200">
          Export CSV
        </button>
      </div>
    </div>
  );
};

export default SentimentResults;