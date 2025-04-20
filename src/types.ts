export type AnalysisType = 'text' | 'file' | 'url';

export interface SentimentData {
  sentiment: string;
  score: number;
  confidence: number;
  distribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
  keywords: Array<{
    term: string;
    score: number;
    sentiment: string;
  }>;
  summary: string;
}

export interface HistoryItemType {
  id: string;
  timestamp: string;
  text: string;
  type: AnalysisType;
  results: SentimentData;
}