export const mockMarketData = {
  AAPL: {
    price: 175.34,
    change: +2.45,
    changePercent: +1.42,
    volume: '62.3M',
    marketCap: '2.74T',
    peRatio: 28.5,
    weekRange: '134.78 - 182.34',
    sentimentHistory: [65, 68, 72, 75, 73, 78, 75],
    marketPulse: [85, 78, 65, 72, 80],
    newsHeadlines: [
      { title: "Apple's AI Push Gains Momentum", sentiment: "positive", time: "2h ago" },
      { title: "Services Revenue Hits New Record", sentiment: "positive", time: "4h ago" },
      { title: "Supply Chain Concerns Emerge", sentiment: "negative", time: "6h ago" }
    ]
  },
  GOOGL: {
    price: 142.56,
    change: -0.84,
    changePercent: -0.59,
    volume: '28.1M',
    marketCap: '1.82T',
    peRatio: 24.7,
    weekRange: '102.21 - 146.89',
    sentimentHistory: [60, 63, 65, 68, 65, 67, 65],
    marketPulse: [75, 82, 70, 68, 73],
    newsHeadlines: [
      { title: "Google Cloud Revenue Surges", sentiment: "positive", time: "1h ago" },
      { title: "New AI Models Announced", sentiment: "positive", time: "3h ago" },
      { title: "Ad Revenue Shows Mixed Results", sentiment: "neutral", time: "5h ago" }
    ]
  },
  MSFT: {
    price: 378.92,
    change: +4.23,
    changePercent: +1.13,
    volume: '34.2M',
    marketCap: '2.81T',
    peRatio: 32.4,
    weekRange: '242.31 - 384.12',
    sentimentHistory: [70, 75, 78, 82, 80, 83, 80],
    marketPulse: [90, 85, 78, 82, 88],
    newsHeadlines: [
      { title: "Azure Growth Exceeds Expectations", sentiment: "positive", time: "30m ago" },
      { title: "Gaming Division Sets Records", sentiment: "positive", time: "2h ago" },
      { title: "New Enterprise AI Solutions", sentiment: "positive", time: "4h ago" }
    ]
  }
};

export function getMarketMood() {
  return {
    overall: "Bullish",
    vix: 15.24,
    trending: ["AAPL", "NVDA", "TSLA"],
    topGainers: [
      { symbol: "NVDA", change: "+4.2%" },
      { symbol: "AMD", change: "+3.8%" },
      { symbol: "MSFT", change: "+1.1%" }
    ],
    topLosers: [
      { symbol: "META", change: "-2.1%" },
      { symbol: "NFLX", change: "-1.8%" },
      { symbol: "GOOGL", change: "-0.6%" }
    ]
  };
}
