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
  // Financial Sector
  {
    id: '1',
    name: 'HDFC Bank',
    symbol: 'HDFCBANK',
    sector: 'Financial Sector',
    purchasePrice: 1500,
    quantity: 20,
    exchange: 'NSE',
  },
  {
    id: '2',
    name: 'Bajaj Finance',
    symbol: 'BAJFINANCE',
    sector: 'Financial Sector',
    purchasePrice: 6500,
    quantity: 5,
    exchange: 'NSE',
  },
  {
    id: '3',
    name: 'ICICI Bank',
    symbol: 'ICICIBANK',
    sector: 'Financial Sector',
    purchasePrice: 900,
    quantity: 25,
    exchange: 'NSE',
  },
  {
    id: '4',
    name: 'Bajaj Housing',
    symbol: 'BAJAJHLDNG',
    sector: 'Financial Sector',
    purchasePrice: 1200,
    quantity: 15,
    exchange: 'NSE',
  },
  {
    id: '5',
    name: 'Axis Bank',
    symbol: 'AXISBANK',
    sector: 'Financial Sector',
    purchasePrice: 450,
    quantity: 30,
    exchange: 'NSE',
  },
  {
    id: '6',
    name: 'SBI Life',
    symbol: 'SBILIFE',
    sector: 'Financial Sector',
    purchasePrice: 1200,
    quantity: 12,
    exchange: 'NSE',
  },
  
  // Tech Sector
  {
    id: '7',
    name: 'Affle India',
    symbol: 'AFFLE',
    sector: 'Tech Sector',
    purchasePrice: 1200,
    quantity: 20,
    exchange: 'NSE',
  },
  {
    id: '8',
    name: 'LTI Mindtree',
    symbol: 'LTIM',
    sector: 'Tech Sector',
    purchasePrice: 4500,
    quantity: 8,
    exchange: 'NSE',
  },
  {
    id: '9',
    name: 'KPIT Tech',
    symbol: 'KPITTECH',
    sector: 'Tech Sector',
    purchasePrice: 1800,
    quantity: 15,
    exchange: 'NSE',
  },
  {
    id: '10',
    name: 'Tata Tech',
    symbol: 'TATATECH',
    sector: 'Tech Sector',
    purchasePrice: 1200,
    quantity: 25,
    exchange: 'NSE',
  },
  {
    id: '11',
    name: 'Wipro',
    symbol: 'WIPRO',
    sector: 'Tech Sector',
    purchasePrice: 300,
    quantity: 50,
    exchange: 'NSE',
  },
  {
    id: '12',
    name: 'Tech Mahindra',
    symbol: 'TECHM',
    sector: 'Tech Sector',
    purchasePrice: 800,
    quantity: 30,
    exchange: 'NSE',
  },
  {
    id: '13',
    name: 'Infosys',
    symbol: 'INFY',
    sector: 'Tech Sector',
    purchasePrice: 1800,
    quantity: 15,
    exchange: 'NSE',
  },
  {
    id: '14',
    name: 'Happiest Mind',
    symbol: 'HAPPSTMNDS',
    sector: 'Tech Sector',
    purchasePrice: 900,
    quantity: 20,
    exchange: 'NSE',
  },
  {
    id: '15',
    name: 'Zomato',
    symbol: 'ZOMATO',
    sector: 'Tech Sector',
    purchasePrice: 400,
    quantity: 40,
    exchange: 'NSE',
  },
  
  // Consumer Sector
  {
    id: '16',
    name: 'Dmart',
    symbol: 'DMART',
    sector: 'Consumer',
    purchasePrice: 3500,
    quantity: 8,
    exchange: 'NSE',
  },
  {
    id: '17',
    name: 'Tata Consumer',
    symbol: 'TATACONSUM',
    sector: 'Consumer',
    purchasePrice: 800,
    quantity: 25,
    exchange: 'NSE',
  },
  {
    id: '18',
    name: 'Pidilite',
    symbol: 'PIDILITIND',
    sector: 'Consumer',
    purchasePrice: 2500,
    quantity: 10,
    exchange: 'NSE',
  },
  
  // Power Sector
  {
    id: '19',
    name: 'Tata Power',
    symbol: 'TATAPOWER',
    sector: 'Power',
    purchasePrice: 200,
    quantity: 100,
    exchange: 'NSE',
  },
  {
    id: '20',
    name: 'KPI Green',
    symbol: 'KPIGREEN',
    sector: 'Power',
    purchasePrice: 1200,
    quantity: 15,
    exchange: 'NSE',
  },
  {
    id: '21',
    name: 'Suzlon',
    symbol: 'SUZLON',
    sector: 'Power',
    purchasePrice: 15,
    quantity: 500,
    exchange: 'NSE',
  },
  {
    id: '22',
    name: 'Gensol',
    symbol: 'GENSOL',
    sector: 'Power',
    purchasePrice: 800,
    quantity: 20,
    exchange: 'NSE',
  },
  
  // Pipe Sector
  {
    id: '23',
    name: 'Jindal Steel',
    symbol: 'JINDALSTEL',
    sector: 'Pipe Sector',
    purchasePrice: 300,
    quantity: 50,
    exchange: 'NSE',
  },
  {
    id: '24',
    name: 'Astral',
    symbol: 'ASTRAL',
    sector: 'Pipe Sector',
    purchasePrice: 1800,
    quantity: 15,
    exchange: 'NSE',
  },
  {
    id: '25',
    name: 'Polycab',
    symbol: 'POLYCAB',
    sector: 'Pipe Sector',
    purchasePrice: 4000,
    quantity: 5,
    exchange: 'NSE',
  },
  
  // Others Sector
  {
    id: '26',
    name: 'Asian Paints',
    symbol: 'ASIANPAINT',
    sector: 'Others',
    purchasePrice: 1800,
    quantity: 15,
    exchange: 'NSE',
  },
  {
    id: '27',
    name: 'Deepak Nitrite',
    symbol: 'DEEPAKNTR',
    sector: 'Others',
    purchasePrice: 2200,
    quantity: 12,
    exchange: 'NSE',
  },
  {
    id: '28',
    name: 'Fine Organic',
    symbol: 'FINEORG',
    sector: 'Others',
    purchasePrice: 4500,
    quantity: 8,
    exchange: 'NSE',
  },
  {
    id: '29',
    name: 'Gravita',
    symbol: 'GRAVITA',
    sector: 'Others',
    purchasePrice: 800,
    quantity: 25,
    exchange: 'NSE',
  },
];
