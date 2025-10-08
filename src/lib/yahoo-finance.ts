export interface YahooFinanceQuote {
  symbol: string;
  regularMarketPrice?: number;
  regularMarketPreviousClose?: number;
  peRatio?: number;
  earnings?: {
    quarterly: Array<{
      date: string;
      actual: number;
    }>;
  };
}

export class YahooFinanceService {
  private static instance: YahooFinanceService;
  private cache: Map<string, { data: YahooFinanceQuote; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 30000; // 30 seconds cache

  static getInstance(): YahooFinanceService {
    if (!YahooFinanceService.instance) {
      YahooFinanceService.instance = new YahooFinanceService();
    }
    return YahooFinanceService.instance;
  }

  private isCacheValid(timestamp: number): boolean {
    return Date.now() - timestamp < this.CACHE_DURATION;
  }

  async getQuote(symbol: string): Promise<YahooFinanceQuote | null> {
    try {
      // Check cache first
      const cached = this.cache.get(symbol);
      if (cached && this.isCacheValid(cached.timestamp)) {
        return cached.data;
      }

      // Use Next.js API route instead of direct yahoo-finance2 call
      const response = await fetch(`/api/stocks?symbols=${symbol}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const result = data[symbol];

      if (!result) {
        return null;
      }

      // Cache the result
      this.cache.set(symbol, {
        data: result,
        timestamp: Date.now(),
      });

      return result;
    } catch (error) {
      console.error(`Error fetching quote for ${symbol}:`, error);
      return null;
    }
  }

  async getMultipleQuotes(symbols: string[]): Promise<Map<string, YahooFinanceQuote>> {
    const results = new Map<string, YahooFinanceQuote>();
    
    try {
      // Use Next.js API route for batch requests
      const response = await fetch(`/api/stocks?symbols=${symbols.join(',')}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      symbols.forEach(symbol => {
        const quote = data[symbol];
        if (quote) {
          results.set(symbol, quote);
          // Cache the result
          this.cache.set(symbol, {
            data: quote,
            timestamp: Date.now(),
          });
        }
      });
    } catch (error) {
      console.error('Error fetching multiple quotes:', error);
    }

    return results;
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export const yahooFinanceService = YahooFinanceService.getInstance();
