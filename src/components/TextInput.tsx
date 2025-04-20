import React from 'react';

interface TextInputProps {
  text: string;
  setText: (text: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ text, setText }) => {
  return (
    <div>
      <label htmlFor="sentiment-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Enter or paste text to analyze
      </label>
      <textarea
        id="sentiment-text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here for sentiment analysis..."
        className="w-full h-40 p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
      />
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex justify-between">
        <span>For best results, provide at least a few sentences</span>
        <span>{text.length} characters</span>
      </div>
    </div>
  );
};

export default TextInput;