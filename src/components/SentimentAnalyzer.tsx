import React, { useState } from 'react';
import TextInput from './TextInput';
import FileUpload from './FileUpload';
import UrlInput from './UrlInput';
import SentimentResults from './SentimentResults';
import { analyzeSentiment } from '../utils/sentimentAnalyzer';
import { SentimentData, AnalysisType } from '../types';

const SentimentAnalyzer: React.FC = () => {
  const [inputType, setInputType] = useState<'text' | 'file' | 'url'>('text');
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SentimentData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = async () => {
    if (!text.trim()) {
      setError('Please provide some text to analyze');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      const analysisResults = await analyzeSentiment(text, inputType as AnalysisType);
      setResults(analysisResults);
      
      // Add to history (in a real app, this would be saved to a database)
      const historyItem = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        text: text.length > 100 ? `${text.substring(0, 100)}...` : text,
        type: inputType,
        results: analysisResults
      };
      
      const history = JSON.parse(localStorage.getItem('sentimentHistory') || '[]');
      localStorage.setItem('sentimentHistory', JSON.stringify([historyItem, ...history].slice(0, 20)));
    } catch (err) {
      setError('Failed to analyze sentiment. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setText('');
    setResults(null);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        Sentiment Analysis Tool
      </h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8 transition-all duration-300">
        <div className="flex justify-center mb-6">
          <TabButton 
            label="Text" 
            isActive={inputType === 'text'} 
            onClick={() => setInputType('text')} 
          />
          <TabButton 
            label="File" 
            isActive={inputType === 'file'} 
            onClick={() => setInputType('file')} 
          />
          <TabButton 
            label="URL" 
            isActive={inputType === 'url'} 
            onClick={() => setInputType('url')} 
          />
        </div>
        
        <div className="mb-6">
          {inputType === 'text' && (
            <TextInput text={text} setText={setText} />
          )}
          
          {inputType === 'file' && (
            <FileUpload setText={setText} />
          )}
          
          {inputType === 'url' && (
            <UrlInput setText={setText} />
          )}
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 rounded-md">
            {error}
          </div>
        )}
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleAnalysis}
            disabled={isLoading || !text.trim()}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Analyzing...' : 'Analyze Sentiment'}
          </button>
          
          <button
            onClick={handleClear}
            disabled={isLoading || (!text.trim() && !results)}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear
          </button>
        </div>
      </div>
      
      {results && (
        <SentimentResults results={results} text={text} />
      )}
    </div>
  );
};

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 mx-1 rounded-md transition-all duration-200 ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
      }`}
    >
      {label}
    </button>
  );
};

export default SentimentAnalyzer;