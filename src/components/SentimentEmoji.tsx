import React from 'react';
import { SmilePlus, Smile, Meh, Frown, Frown as FrownPlus } from 'lucide-react';

interface SentimentEmojiProps {
  sentiment: string;
  size?: number;
}

const SentimentEmoji: React.FC<SentimentEmojiProps> = ({ sentiment, size = 24 }) => {
  const emojiMap: Record<string, React.ReactNode> = {
    'very positive': <SmilePlus size={size} className="text-green-500" />,
    'positive': <Smile size={size} className="text-green-400" />,
    'neutral': <Meh size={size} className="text-yellow-400" />,
    'negative': <Frown size={size} className="text-red-400" />,
    'very negative': <FrownPlus size={size} className="text-red-500" />
  };

  return emojiMap[sentiment.toLowerCase()] || <Meh size={size} className="text-gray-400" />;
};

export default SentimentEmoji;