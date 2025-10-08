export interface Stock {
  id: string;
  name: string;
  symbol: string;
  sector: string;
  purchasePrice: number;
  quantity: number;
  exchange: 'NSE' | 'BSE';
  currentPrice?: number;
  peRatio?: number;
  latestEarnings?: number;
}

export interface PortfolioData {
  stocks: Stock[];
  lastUpdated: Date;
}

export interface SectorSummary {
  sector: string;
  totalInvestment: number;
  totalPresentValue: number;
  gainLoss: number;
  gainLossPercentage: number;
  stockCount: number;
}

export interface PortfolioMetrics {
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
  totalGainLossPercentage: number;
  sectorSummaries: SectorSummary[];
}

// Sample portfolio data for development
export const samplePortfolio: Stock[] = [
  {
    id: '1',
    name: 'Reliance Industries',
    symbol: 'RELIANCE',
    sector: 'Energy',
    purchasePrice: 2500,
    quantity: 10,
    exchange: 'NSE',
  },
  {
    id: '2',
    name: 'TCS',
    symbol: 'TCS',
    sector: 'Technology',
    purchasePrice: 3500,
    quantity: 5,
    exchange: 'NSE',
  },
  {
    id: '3',
    name: 'HDFC Bank',
    symbol: 'HDFCBANK',
    sector: 'Banking',
    purchasePrice: 1500,
    quantity: 20,
    exchange: 'NSE',
  },
  {
    id: '4',
    name: 'Infosys',
    symbol: 'INFY',
    sector: 'Technology',
    purchasePrice: 1800,
    quantity: 15,
    exchange: 'NSE',
  },
  {
    id: '5',
    name: 'ITC',
    symbol: 'ITC',
    sector: 'FMCG',
    purchasePrice: 400,
    quantity: 50,
    exchange: 'NSE',
  },
];
