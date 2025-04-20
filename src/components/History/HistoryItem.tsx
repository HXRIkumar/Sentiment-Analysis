import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, File, Globe, MessageSquare } from 'lucide-react';
import { HistoryItemType } from '../../types';
import SentimentEmoji from '../SentimentEmoji';

interface HistoryItemProps {
  item: HistoryItemType;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  const getTypeIcon = () => {
    switch (item.type) {
      case 'text':
        return <MessageSquare size={16} className="text-blue-500" />;
      case 'file':
        return <File size={16} className="text-green-500" />;
      case 'url':
        return <Globe size={16} className="text-purple-500" />;
      default:
        return <MessageSquare size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow transition-all duration-300">
      <div 
        className="p-4 cursor-pointer flex items-center justify-between"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center">
          <div className="mr-3">
            <SentimentEmoji sentiment={item.results.sentiment} size={24} />
          </div>
          
          <div>
            <div className="font-medium text-gray-900 dark:text-white">
              {item.text}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
              <Clock size={12} className="mr-1" />
              {formatDate(item.timestamp)}
              <span className="mx-2">•</span>
              {getTypeIcon()}
              <span className="ml-1 capitalize">{item.type}</span>
            </div>
          </div>
        </div>
        
        <div>
          {expanded ? (
            <ChevronUp className="text-gray-500" />
          ) : (
            <ChevronDown className="text-gray-500" />
          )}
        </div>
      </div>
      
      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-3">
          <div className="grid grid-cols-3 gap-4 mb-4 text-center">
            <div>
              <div className="text-xs uppercase text-gray-500 dark:text-gray-400">Sentiment</div>
              <div className="font-medium capitalize text-gray-900 dark:text-white">{item.results.sentiment}</div>
            </div>
            <div>
              <div className="text-xs uppercase text-gray-500 dark:text-gray-400">Score</div>
              <div className="font-medium text-gray-900 dark:text-white">{item.results.score.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-xs uppercase text-gray-500 dark:text-gray-400">Confidence</div>
              <div className="font-medium text-gray-900 dark:text-white">{Math.round(item.results.confidence * 100)}%</div>
            </div>
          </div>
          
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <div className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-1">Summary</div>
            <p>{item.results.summary}</p>
          </div>
          
          <div className="mt-3 flex justify-end">
            <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
              Re-analyze
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryItem;