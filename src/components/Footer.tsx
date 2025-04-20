import React from 'react';
import { MessageSquareText, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner transition-colors duration-300">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center mb-2">
            <MessageSquareText className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
            <span className="text-gray-700 dark:text-gray-300 text-sm">
              Sentiment Analysis Project
            </span>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Project by Emily Chen
          </p>
          
          <div className="mt-2">
            <a
              href="https://github.com"
              aria-label="GitHub"
              className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors duration-200"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;