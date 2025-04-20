import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import SentimentAnalyzer from './components/SentimentAnalyzer';
import HistorySection from './components/History/HistorySection';
import AboutSection from './components/About';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'analyzer' | 'history' | 'about'>('analyzer');

  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header activeSection={activeSection} setActiveSection={setActiveSection} />
        
        <main className="flex-grow container mx-auto px-4 py-8 transition-all duration-300">
          {activeSection === 'analyzer' && <SentimentAnalyzer />}
          {activeSection === 'history' && <HistorySection />}
          {activeSection === 'about' && <AboutSection />}
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;