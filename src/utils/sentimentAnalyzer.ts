import { SentimentData, AnalysisType } from '../types';

// Mock sentiment analysis function that would be replaced by a real NLP API
export const analyzeSentiment = async (text: string, type: AnalysisType): Promise<SentimentData> => {
  // In a real implementation, this would make a call to an NLP API
  // For demo purposes, we'll simulate the analysis with a delay
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple word-based analysis for demo
      const lowerText = text.toLowerCase();
      
      // Count positive/negative words (very simplified)
      const positiveWords = ['good', 'great', 'excellent', 'happy', 'love', 'positive', 'best', 'wonderful', 'beautiful', 'perfect'];
      const negativeWords = ['bad', 'awful', 'terrible', 'sad', 'hate', 'negative', 'worst', 'horrible', 'ugly', 'poor'];
      
      let positiveCount = 0;
      let negativeCount = 0;
      
      // Count words (simplified)
      positiveWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'g');
        const matches = lowerText.match(regex);
        if (matches) {
          positiveCount += matches.length;
        }
      });
      
      negativeWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'g');
        const matches = lowerText.match(regex);
        if (matches) {
          negativeCount += matches.length;
        }
      });
      
      // Calculate raw score (-1 to 1)
      const totalMatches = positiveCount + negativeCount;
      let score = 0;
      
      if (totalMatches > 0) {
        score = (positiveCount - negativeCount) / (positiveCount + negativeCount);
      }
      
      // Bias slightly positive for demo if there are no matches
      if (totalMatches === 0) {
        score = 0.1;
      }
      
      // Determine sentiment category
      let sentiment: string;
      if (score > 0.6) {
        sentiment = 'very positive';
      } else if (score > 0.2) {
        sentiment = 'positive';
      } else if (score > -0.2) {
        sentiment = 'neutral';
      } else if (score > -0.6) {
        sentiment = 'negative';
      } else {
        sentiment = 'very negative';
      }
      
      // Generate mock distribution
      const neutralPercent = Math.floor(Math.random() * 30) + 20; // 20-50%
      let positivePercent, negativePercent;
      
      if (score > 0) {
        positivePercent = Math.floor((100 - neutralPercent) * (0.5 + score/2));
        negativePercent = 100 - neutralPercent - positivePercent;
      } else {
        negativePercent = Math.floor((100 - neutralPercent) * (0.5 - score/2));
        positivePercent = 100 - neutralPercent - negativePercent;
      }
      
      // Generate keywords
      const words = text.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 3)
        .filter(word => !['this', 'that', 'with', 'from', 'have', 'were', 'they', 'their', 'there'].includes(word));
      
      const wordFreq: Record<string, number> = {};
      words.forEach(word => {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
      });
      
      const sortedWords = Object.entries(wordFreq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20)
        .map(([term, count]) => {
          // Random sentiment score for each keyword
          const wordScore = (
            positiveWords.includes(term) ? Math.random() * 0.5 + 0.3 :
            negativeWords.includes(term) ? -Math.random() * 0.5 - 0.3 :
            (Math.random() * 1.6 - 0.8) * score // Bias towards overall sentiment
          );
          
          // Determine sentiment for each keyword
          let wordSentiment;
          if (wordScore > 0.3) {
            wordSentiment = 'positive';
          } else if (wordScore < -0.3) {
            wordSentiment = 'negative';
          } else {
            wordSentiment = 'neutral';
          }
          
          return {
            term,
            score: wordScore,
            sentiment: wordSentiment
          };
        });
      
      // Generate a confidence score
      const confidence = 0.6 + Math.random() * 0.3; // 60-90%
      
      // Create summary
      let summary;
      if (score > 0.5) {
        summary = `The text expresses a strong positive sentiment with high confidence. Key positive terms include ${
          sortedWords.filter(w => w.sentiment === 'positive').slice(0, 3).map(w => `"${w.term}"`).join(', ') || 'various positive expressions'
        }.`;
      } else if (score > 0) {
        summary = `The text leans positive overall, though with some neutral elements. Notable positive aspects include ${
          sortedWords.filter(w => w.sentiment === 'positive').slice(0, 2).map(w => `"${w.term}"`).join(', ') || 'some positive expressions'
        }.`;
      } else if (score > -0.5) {
        summary = `The text contains mixed or slightly negative sentiment. Some key terms that contribute to this include ${
          sortedWords.filter(w => w.sentiment === 'negative').slice(0, 2).map(w => `"${w.term}"`).join(', ') || 'various expressions'
        }.`;
      } else {
        summary = `The text expresses strong negative sentiment with high confidence. Prominent negative elements include ${
          sortedWords.filter(w => w.sentiment === 'negative').slice(0, 3).map(w => `"${w.term}"`).join(', ') || 'various negative expressions'
        }.`;
      }
      
      // Create result object
      const result: SentimentData = {
        sentiment,
        score,
        confidence,
        distribution: {
          positive: positivePercent,
          neutral: neutralPercent,
          negative: negativePercent,
        },
        keywords: sortedWords,
        summary
      };
      
      resolve(result);
    }, 1500); // Simulate processing delay
  });
};