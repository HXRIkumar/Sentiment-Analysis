import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, MessageSquareText, History, Info } from 'lucide-react';

interface HeaderProps {
  activeSection: 'analyzer' | 'history' | 'about';
  setActiveSection: (section: 'analyzer' | 'history' | 'about') => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquareText className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Sentiment Analyzer</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <NavItem 
              icon={<MessageSquareText size={18} />}
              label="Analysis"
              isActive={activeSection === 'analyzer'}
              onClick={() => setActiveSection('analyzer')}
            />
            <NavItem 
              icon={<History size={18} />}
              label="History"
              isActive={activeSection === 'history'}
              onClick={() => setActiveSection('history')}
            />
            <NavItem 
              icon={<Info size={18} />}
              label="About"
              isActive={activeSection === 'about'}
              onClick={() => setActiveSection('about')}
            />
          </nav>
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5 text-gray-700" />
            ) : (
              <Sun className="h-5 w-5 text-yellow-300" />
            )}
          </button>
        </div>
        
        <div className="md:hidden flex justify-around mt-4 border-t border-gray-200 dark:border-gray-700 pt-3">
          <MobileNavItem 
            icon={<MessageSquareText size={20} />}
            label="Analysis"
            isActive={activeSection === 'analyzer'}
            onClick={() => setActiveSection('analyzer')}
          />
          <MobileNavItem 
            icon={<History size={20} />}
            label="History"
            isActive={activeSection === 'history'}
            onClick={() => setActiveSection('history')}
          />
          <MobileNavItem 
            icon={<Info size={20} />}
            label="About"
            isActive={activeSection === 'about'}
            onClick={() => setActiveSection('about')}
          />
        </div>
      </div>
    </header>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors duration-200 ${
        isActive
          ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700/50'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

const MobileNavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center space-y-1"
    >
      <div className={`p-2 rounded-full ${
        isActive
          ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
          : 'text-gray-700 dark:text-gray-300'
      }`}>
        {icon}
      </div>
      <span className={`text-xs ${
        isActive
          ? 'text-indigo-700 dark:text-indigo-300'
          : 'text-gray-700 dark:text-gray-300'
      }`}>
        {label}
      </span>
    </button>
  );
};

export default Header;