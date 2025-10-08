'use client';

import React, { useState } from 'react';
import PortfolioTable from '@/components/PortfolioTable';
import SectorSummary from '@/components/SectorSummary';
import { Stock } from '@/types/portfolio';
import { samplePortfolio } from '@/types/portfolio';
import { calculatePortfolioMetrics } from '@/lib/portfolio-calculations';

export default function Home() {
  const [stocks, setStocks] = useState<Stock[]>(samplePortfolio);
  const portfolioMetrics = calculatePortfolioMetrics(stocks);

  const handleStocksUpdate = (updatedStocks: Stock[]) => {
    setStocks(updatedStocks);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dynamic Portfolio Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Real-time portfolio tracking with live stock prices and sector-wise performance
          </p>
        </div>

        {/* Portfolio Table */}
        <div className="mb-8">
          <PortfolioTable stocks={stocks} onStocksUpdate={handleStocksUpdate} />
        </div>

        {/* Sector Summary */}
        <div className="mb-8">
          <SectorSummary sectorSummaries={portfolioMetrics.sectorSummaries} />
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Data updates every 15 seconds • Powered by Yahoo Finance</p>
          <p className="mt-1">
            <strong>Disclaimer:</strong> This is a demo application. Stock prices may be delayed and should not be used for actual trading decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
