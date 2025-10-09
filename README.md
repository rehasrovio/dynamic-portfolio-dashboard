# 🧭 Dynamic Portfolio Dashboard

A real-time portfolio tracking application built with Next.js that displays live stock prices, portfolio metrics, and sector-wise performance analysis.

## 🌐 Live Demo

**🚀 [View Live Application](https://dynamic-portfolio-dashboard-six.vercel.app/)**

Experience the dashboard in action with real-time stock data updates every 15 seconds.

## ✨ Features

- **Real-time Stock Data**: Fetches live stock prices from Yahoo Finance every 15 seconds
- **Portfolio Metrics**: Displays investment, present value, gain/loss calculations
- **Sector-wise Analysis**: Groups holdings by sector with aggregated performance
- **Interactive Table**: Sortable and responsive portfolio table
- **Visual Indicators**: Color-coded gains (green) and losses (red)
- **Error Handling**: Graceful handling of API failures with user-friendly messages

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Install Dependencies**
   ```bash
   npm install @tanstack/react-table yahoo-finance2 axios --legacy-peer-deps
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Portfolio Data

The application includes a comprehensive sample portfolio with 29 stocks across 6 sectors:

- **Financial Sector**: HDFC Bank, Bajaj Finance, ICICI Bank, Axis Bank, SBI Life
- **Tech Sector**: LTI Mindtree, KPIT Tech, Tata Tech, Wipro, Tech Mahindra, Infosys, Happiest Mind, Zomato
- **Consumer Sector**: Dmart, Tata Consumer, Pidilite
- **Power Sector**: Tata Power, KPI Green, Suzlon, Gensol
- **Pipe Sector**: Jindal Steel, Astral, Polycab
- **Others**: Asian Paints, Deepak Nitrite, Fine Organic, Gravita

## 🏗️ Architecture

### Components

- **`PortfolioTable`**: Main table component with real-time updates
- **`SectorSummary`**: Sector-wise performance breakdown
- **`Home`**: Main page component orchestrating the dashboard

### Services

- **`YahooFinanceService`**: Handles API calls to Yahoo Finance with caching and rate limiting
- **`PortfolioCalculations`**: Utility functions for portfolio metrics calculations

### Data Models

- **`Stock`**: Individual stock holding interface
- **`PortfolioMetrics`**: Aggregated portfolio performance
- **`SectorSummary`**: Sector-wise performance data

## 🔧 Technical Implementation

### Real-time Updates

- Uses `setInterval` to refresh stock data every 15 seconds
- Implements caching to avoid excessive API calls
- Batch processing with rate limiting to respect API limits

### Performance Optimizations

- **Memoization**: Uses `useMemo` for expensive calculations
- **Caching**: 30-second cache for Yahoo Finance data
- **Batch Requests**: Processes multiple stocks in batches of 5

### Error Handling

- Graceful API failure handling
- User-friendly error messages
- Fallback to cached data when available

## 📱 Responsive Design

The dashboard is fully responsive and works seamlessly across:
- Desktop computers
- Tablets
- Mobile devices

## ⚠️ Important Notes

### API Limitations

- Yahoo Finance doesn't have an official API
- Uses `yahoo-finance2` library for data fetching
- Implements rate limiting to avoid blocking

### Data Accuracy

- Stock prices may have slight delays
- P/E ratios and earnings data depend on Yahoo Finance availability
- Includes disclaimer about data accuracy

### Security

- All API operations are handled server-side
- No sensitive data exposed to client-side

## 🛠️ Development

### Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   │   └── stocks/     # Stock data endpoint
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/         # React components
│   ├── PortfolioTable.tsx
│   └── SectorSummary.tsx
├── lib/               # Utility libraries
│   ├── yahoo-finance.ts
│   └── portfolio-calculations.ts
└── types/             # TypeScript interfaces
    └── portfolio.ts
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🚀 Deployment

The application can be deployed to any platform that supports Next.js:

- **Vercel** (recommended)
- **Netlify**
- **Railway**
- **AWS**

## 📄 License

© 2025 Octa Byte AI Pvt Ltd

---

**Disclaimer**: This is a demo application for educational purposes. Stock prices may be delayed and should not be used for actual trading decisions.