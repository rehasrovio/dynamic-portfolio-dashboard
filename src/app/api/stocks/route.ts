import { NextRequest, NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const symbols = searchParams.get('symbols');
  
  if (!symbols) {
    return NextResponse.json({ error: 'Symbols parameter is required' }, { status: 400 });
  }

  try {
    const symbolList = symbols.split(',');
    const results: Record<string, any> = {};

    // Process symbols in batches to avoid rate limiting
    const batchSize = 5;
    for (let i = 0; i < symbolList.length; i += batchSize) {
      const batch = symbolList.slice(i, i + batchSize);
      
      const promises = batch.map(async (symbol) => {
        try {
          // Add .NS suffix for NSE stocks
          const yahooSymbol = symbol.endsWith('.NS') ? symbol : `${symbol}.NS`;
          const quote = await yahooFinance.quote(yahooSymbol);
          
          results[symbol] = {
            symbol: symbol,
            regularMarketPrice: quote.regularMarketPrice,
            regularMarketPreviousClose: quote.regularMarketPreviousClose,
            peRatio: quote.trailingPE,
          };
        } catch (error) {
          console.error(`Error fetching quote for ${symbol}:`, error);
          results[symbol] = null;
        }
      });

      await Promise.all(promises);
      
      // Add delay between batches to respect rate limits
      if (i + batchSize < symbolList.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Failed to fetch stock data' }, { status: 500 });
  }
}
