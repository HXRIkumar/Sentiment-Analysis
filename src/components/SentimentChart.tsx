import React from 'react';

interface SentimentChartProps {
  data: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

const SentimentChart: React.FC<SentimentChartProps> = ({ data }) => {
  const { positive, neutral, negative } = data;
  const total = positive + neutral + negative;
  
  // Calculate percentages
  const positivePercent = Math.round((positive / total) * 100);
  const neutralPercent = Math.round((neutral / total) * 100);
  const negativePercent = Math.round((negative / total) * 100);
  
  return (
    <div className="w-full h-full flex flex-col justify-center">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-green-500 font-semibold text-lg">
            {positivePercent}%
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Positive
          </div>
        </div>
        <div className="text-center">
          <div className="text-yellow-500 font-semibold text-lg">
            {neutralPercent}%
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Neutral
          </div>
        </div>
        <div className="text-center">
          <div className="text-red-500 font-semibold text-lg">
            {negativePercent}%
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Negative
          </div>
        </div>
      </div>
      
      <div className="h-8 w-full bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
        <div className="h-full flex">
          <div 
            className="bg-green-500 h-full transition-all duration-500 ease-in-out"
            style={{ width: `${positivePercent}%` }}
            title={`Positive: ${positivePercent}%`}
          ></div>
          <div 
            className="bg-yellow-500 h-full transition-all duration-500 ease-in-out"
            style={{ width: `${neutralPercent}%` }}
            title={`Neutral: ${neutralPercent}%`}
          ></div>
          <div 
            className="bg-red-500 h-full transition-all duration-500 ease-in-out"
            style={{ width: `${negativePercent}%` }}
            title={`Negative: ${negativePercent}%`}
          ></div>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-xs text-center text-gray-600 dark:text-gray-400">
          Distribution of sentiment across analyzed text
        </p>
      </div>
    </div>
  );
};

export default SentimentChart;