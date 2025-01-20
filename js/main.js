import { createSentimentChart, createMarketPulseChart } from './charts.js';
import { mockMarketData, getMarketMood } from './marketData.js';

console.log('Main.js loaded');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded');
  initializeCharts();
});

function initializeCharts() {
  const sentimentCanvas = document.getElementById('sentimentChart');
  const marketPulseCanvas = document.getElementById('marketPulseChart');

  console.log('Canvas elements:', { sentimentCanvas, marketPulseCanvas });

  if (!sentimentCanvas || !marketPulseCanvas) {
    console.error('Canvas elements not found');
    return;
  }

  const sentimentCtx = sentimentCanvas.getContext('2d');
  const pulseCtx = marketPulseCanvas.getContext('2d');

  // Use AAPL as default data
  const defaultData = mockMarketData.AAPL;
  console.log('Default data:', defaultData);

  if (defaultData) {
    // Ensure data arrays are numeric
    const sentimentData = defaultData.sentimentHistory.map(Number);
    const pulseData = defaultData.marketPulse.map(Number);

    console.log('Processed data:', { sentimentData, pulseData });

    createSentimentChart(sentimentCtx, sentimentData);
    createMarketPulseChart(pulseCtx, pulseData);
  } else {
    console.error('No default data available');
  }
}

// Rest of the code remains unchanged
