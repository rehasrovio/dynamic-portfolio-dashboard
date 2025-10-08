import { Stock, PortfolioMetrics, SectorSummary } from '@/types/portfolio';

export function calculateInvestment(stock: Stock): number {
  return stock.purchasePrice * stock.quantity;
}

export function calculatePresentValue(stock: Stock): number {
  if (!stock.currentPrice) return 0;
  return stock.currentPrice * stock.quantity;
}

export function calculateGainLoss(stock: Stock): number {
  const investment = calculateInvestment(stock);
  const presentValue = calculatePresentValue(stock);
  return presentValue - investment;
}

export function calculateGainLossPercentage(stock: Stock): number {
  const investment = calculateInvestment(stock);
  const gainLoss = calculateGainLoss(stock);
  return investment > 0 ? (gainLoss / investment) * 100 : 0;
}

export function calculatePortfolioPercentage(stock: Stock, totalInvestment: number): number {
  const investment = calculateInvestment(stock);
  return totalInvestment > 0 ? (investment / totalInvestment) * 100 : 0;
}

export function calculateSectorSummary(stocks: Stock[], sector: string): SectorSummary {
  const sectorStocks = stocks.filter(stock => stock.sector === sector);
  
  const totalInvestment = sectorStocks.reduce((sum, stock) => sum + calculateInvestment(stock), 0);
  const totalPresentValue = sectorStocks.reduce((sum, stock) => sum + calculatePresentValue(stock), 0);
  const gainLoss = totalPresentValue - totalInvestment;
  const gainLossPercentage = totalInvestment > 0 ? (gainLoss / totalInvestment) * 100 : 0;

  return {
    sector,
    totalInvestment,
    totalPresentValue,
    gainLoss,
    gainLossPercentage,
    stockCount: sectorStocks.length,
  };
}

export function calculatePortfolioMetrics(stocks: Stock[]): PortfolioMetrics {
  const totalInvestment = stocks.reduce((sum, stock) => sum + calculateInvestment(stock), 0);
  const totalPresentValue = stocks.reduce((sum, stock) => sum + calculatePresentValue(stock), 0);
  const totalGainLoss = totalPresentValue - totalInvestment;
  const totalGainLossPercentage = totalInvestment > 0 ? (totalGainLoss / totalInvestment) * 100 : 0;

  // Get unique sectors
  const sectors = [...new Set(stocks.map(stock => stock.sector))];
  
  // Calculate sector summaries
  const sectorSummaries = sectors.map(sector => calculateSectorSummary(stocks, sector));

  return {
    totalInvestment,
    totalPresentValue,
    totalGainLoss,
    totalGainLossPercentage,
    sectorSummaries,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatPercentage(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}
