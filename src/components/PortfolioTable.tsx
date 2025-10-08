'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  createColumnHelper,
  flexRender,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table';
import { Stock, PortfolioMetrics } from '@/types/portfolio';
import { yahooFinanceService } from '@/lib/yahoo-finance';
import {
  calculateInvestment,
  calculatePresentValue,
  calculateGainLoss,
  calculateGainLossPercentage,
  calculatePortfolioPercentage,
  calculatePortfolioMetrics,
  formatCurrency,
  formatPercentage,
} from '@/lib/portfolio-calculations';

const columnHelper = createColumnHelper<Stock>();

interface PortfolioTableProps {
  stocks: Stock[];
  onStocksUpdate: (updatedStocks: Stock[]) => void;
}

export default function PortfolioTable({ stocks, onStocksUpdate }: PortfolioTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const portfolioMetrics = useMemo(() => calculatePortfolioMetrics(stocks), [stocks]);

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Particulars',
        cell: (info) => (
          <div className="font-medium text-gray-900">
            {info.getValue()}
          </div>
        ),
      }),
      columnHelper.accessor('purchasePrice', {
        header: 'Purchase Price',
        cell: (info) => formatCurrency(info.getValue()),
      }),
      columnHelper.accessor('quantity', {
        header: 'Quantity',
        cell: (info) => info.getValue().toLocaleString(),
      }),
      columnHelper.accessor('purchasePrice', {
        id: 'investment',
        header: 'Investment',
        cell: (info) => {
          const stock = info.row.original;
          return formatCurrency(calculateInvestment(stock));
        },
      }),
      columnHelper.accessor('purchasePrice', {
        id: 'portfolioPercentage',
        header: 'Portfolio (%)',
        cell: (info) => {
          const stock = info.row.original;
          const percentage = calculatePortfolioPercentage(stock, portfolioMetrics.totalInvestment);
          return `${percentage.toFixed(2)}%`;
        },
      }),
      columnHelper.accessor('exchange', {
        header: 'NSE/BSE',
        cell: (info) => (
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor('currentPrice', {
        header: 'CMP',
        cell: (info) => {
          const price = info.getValue();
          return price ? formatCurrency(price) : 'Loading...';
        },
      }),
      columnHelper.accessor('currentPrice', {
        id: 'presentValue',
        header: 'Present Value',
        cell: (info) => {
          const stock = info.row.original;
          const value = calculatePresentValue(stock);
          return value > 0 ? formatCurrency(value) : 'Loading...';
        },
      }),
      columnHelper.accessor('currentPrice', {
        id: 'gainLoss',
        header: 'Gain/Loss',
        cell: (info) => {
          const stock = info.row.original;
          const gainLoss = calculateGainLoss(stock);
          const percentage = calculateGainLossPercentage(stock);
          const isPositive = gainLoss >= 0;
          
          return (
            <div className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              <div className="font-medium">{formatCurrency(gainLoss)}</div>
              <div className="text-xs">{formatPercentage(percentage)}</div>
            </div>
          );
        },
      }),
      columnHelper.accessor('peRatio', {
        header: 'P/E Ratio',
        cell: (info) => {
          const peRatio = info.getValue();
          return peRatio ? peRatio.toFixed(2) : 'N/A';
        },
      }),
      columnHelper.accessor('latestEarnings', {
        header: 'Latest Earnings',
        cell: (info) => {
          const earnings = info.getValue();
          return earnings ? formatCurrency(earnings) : 'N/A';
        },
      }),
    ],
    [portfolioMetrics.totalInvestment]
  );

  const table = useReactTable({
    data: stocks,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const fetchStockData = async () => {
    if (stocks.length === 0) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const symbols = stocks.map(stock => stock.symbol);
      const quotes = await yahooFinanceService.getMultipleQuotes(symbols);

      const updatedStocks = stocks.map(stock => {
        const quote = quotes.get(stock.symbol);
        return {
          ...stock,
          currentPrice: quote?.regularMarketPrice || stock.currentPrice,
          peRatio: quote?.peRatio || stock.peRatio,
        };
      });

      onStocksUpdate(updatedStocks);
    } catch (err) {
      setError('Failed to fetch stock data. Please try again.');
      console.error('Error fetching stock data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchStockData();

    // Set up interval for 15-second updates
    const interval = setInterval(fetchStockData, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Portfolio Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {formatCurrency(portfolioMetrics.totalInvestment)}
            </div>
            <div className="text-sm text-gray-500">Total Investment</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {formatCurrency(portfolioMetrics.totalPresentValue)}
            </div>
            <div className="text-sm text-gray-500">Present Value</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${
              portfolioMetrics.totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {formatCurrency(portfolioMetrics.totalGainLoss)}
            </div>
            <div className="text-sm text-gray-500">Gain/Loss</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${
              portfolioMetrics.totalGainLossPercentage >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {formatPercentage(portfolioMetrics.totalGainLossPercentage)}
            </div>
            <div className="text-sm text-gray-500">Gain/Loss %</div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Updating stock data...</span>
        </div>
      )}

      {/* Portfolio Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Portfolio Holdings</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center space-x-1">
                        <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                        {header.column.getIsSorted() === 'asc' && <span>↑</span>}
                        {header.column.getIsSorted() === 'desc' && <span>↓</span>}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
