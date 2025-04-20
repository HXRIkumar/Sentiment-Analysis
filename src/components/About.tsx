import React from 'react';
import { MessageSquareText, Activity, BarChart, PieChart } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">About This Project</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          This sentiment analysis tool was developed as part of the Natural Language Processing course 
          at State University. It demonstrates the application of NLP techniques for analyzing emotional 
          content in text.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <FeatureCard 
          icon={<MessageSquareText className="h-8 w-8 text-indigo-500" />}
          title="Text Analysis"
          description="Analyze text to determine its emotional tone and sentiment, useful for understanding the emotional content of written communication."
        />
        
        <FeatureCard 
          icon={<Activity className="h-8 w-8 text-indigo-500" />}
          title="Metrics"
          description="View sentiment scores, confidence levels, and keyword analysis to understand the components of emotional expression in text."
        />
        
        <FeatureCard 
          icon={<BarChart className="h-8 w-8 text-indigo-500" />}
          title="Visualization"
          description="Interactive charts and graphs help visualize sentiment analysis results for better understanding of the data."
        />
        
        <FeatureCard 
          icon={<PieChart className="h-8 w-8 text-indigo-500" />}
          title="Keyword Analysis"
          description="Extract and analyze key terms that contribute to the overall sentiment of the text."
        />
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-12">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">How It Works</h3>
        
        <ol className="space-y-6">
          <HowItWorksStep 
            number={1}
            title="Input Text"
            description="Enter text directly, upload a text file, or provide a URL to analyze."
          />
          
          <HowItWorksStep 
            number={2}
            title="Processing"
            description="The text is analyzed using Natural Language Processing algorithms to evaluate emotional content."
          />
          
          <HowItWorksStep 
            number={3}
            title="Analysis"
            description="The system calculates sentiment scores and identifies key emotional indicators in the text."
          />
          
          <HowItWorksStep 
            number={4}
            title="Results"
            description="View the analysis results with detailed breakdowns and visualizations."
          />
        </ol>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Project Information</h3>
        <div className="text-gray-600 dark:text-gray-400">
          <p className="mb-2">
            <strong>Course:</strong> CS 4750 - Natural Language Processing
          </p>
          <p className="mb-2">
            <strong>Student:</strong> Emily Chen
          </p>
          <p className="mb-2">
            <strong>Semester:</strong> Spring 2025
          </p>
          <p>
            <strong>Technologies Used:</strong> React, TypeScript, TailwindCSS
          </p>
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-transform duration-200 hover:translate-y-[-5px]">
      <div className="flex items-center space-x-4 mb-4">
        {icon}
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
};

interface HowItWorksStepProps {
  number: number;
  title: string;
  description: string;
}

const HowItWorksStep: React.FC<HowItWorksStepProps> = ({ number, title, description }) => {
  return (
    <li className="flex">
      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center mr-4 mt-1">
        <span className="text-white font-medium">{number}</span>
      </div>
      <div>
        <h4 className="text-lg font-medium text-gray-800 dark:text-white">{title}</h4>
        <p className="text-gray-600 dark:text-gray-400 mt-1">{description}</p>
      </div>
    </li>
  );
};

export default AboutSection;