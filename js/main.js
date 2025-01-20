import { createSentimentChart, createMarketPulseChart } from './charts.js';
import { mockMarketData, getMarketMood } from './marketData.js';

let sentimentChart = null;
let marketPulseChart = null;

document.addEventListener('DOMContentLoaded', () => {
  initializeUI();
  updateMarketMood();
  setInterval(updateMarketMood, 30000); // Update every 30 seconds
});

function initializeUI() {
  const searchBtn = document.getElementById('searchBtn');
  const tickerInput = document.getElementById('tickerInput');
  
  // Setup ticker tags
  document.querySelectorAll('.ticker-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      const ticker = tag.dataset.ticker;
      tickerInput.value = ticker;
      analyzeSentiment(ticker);
    });
  });

  // Search functionality
  searchBtn.addEventListener('click', () => {
    const ticker = tickerInput.value.toUpperCase();
    if (ticker) analyzeSentiment(ticker);
  });

  tickerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const ticker = tickerInput.value.toUpperCase();
      if (ticker) analyzeSentiment(ticker);
    }
  });

  // Initialize charts
  const sentimentCtx = document.getElementById('sentimentTrend').getContext('2d');
  const marketPulseCtx = document.getElementById('marketPulse').getContext('2d');
  
  // Create initial charts with dummy data
  sentimentChart = createSentimentChart(sentimentCtx, [0, 0, 0, 0, 0, 0, 0]);
  marketPulseChart = createMarketPulseChart(marketPulseCtx, [0, 0, 0, 0, 0]);

  // Setup real-time updates
  setupRealtimeUpdates();
}

function analyzeSentiment(ticker) {
  const data = mockMarketData[ticker];
  
  if (!data) {
    showNoDataUI(ticker);
    return;
  }

  updateTickerInfo(data, ticker);
  updateCharts(data);
  updateNews(data.newsHeadlines);
  updateMarketStats(data);
  
  // Show results with animation
  document.querySelector('.sentiment-results').classList.remove('hidden');
}

function updateTickerInfo(data, ticker) {
  const priceChange = data.change >= 0 ? 
    `<span class="positive">+${data.change} (${data.changePercent}%)</span>` :
    `<span class="negative">${data.change} (${data.changePercent}%)</span>`;

  document.querySelector('.ticker-price').innerHTML = `
    <div class="current-price">$${data.price}</div>
    <div class="price-change">${priceChange}</div>
  `;

  document.querySelector('.ticker-stats').innerHTML = `
    <div class="stat">
      <span class="label">Volume</span>
      <span class="value">${data.volume}</span>
    </div>
    <div class="stat">
      <span class="label">Market Cap</span>
      <span class="value">${data.marketCap}</span>
    </div>
    <div class="stat">
      <span class="label">P/E Ratio</span>
      <span class="value">${data.peRatio}</span>
    </div>
    <div class="stat">
      <span class="label">52W Range</span>
      <span class="value">${data.weekRange}</span>
    </div>
  `;
}

function updateCharts(data) {
  // Update sentiment trend chart
  sentimentChart.data.datasets[0].data = data.sentimentHistory;
  sentimentChart.update();

  // Update market pulse radar chart
  marketPulseChart.data.datasets[0].data = data.marketPulse;
  marketPulseChart.update();
}

function updateNews(headlines) {
  const newsContainer = document.querySelector('.news-feed');
  newsContainer.innerHTML = headlines.map(news => `
    <div class="news-item ${news.sentiment}">
      <div class="news-content">
        <span class="news-time">${news.time}</span>
        <p class="news-title">${news.title}</p>
      </div>
      <i class="ph ${getSentimentIcon(news.sentiment)}"></i>
    </div>
  `).join('');
}

function updateMarketMood() {
  const mood = getMarketMood();
  const moodContainer = document.querySelector('.market-mood');
  
  moodContainer.innerHTML = `
    <div class="mood-header">
      <h3>Market Mood</h3>
      <span class="vix">VIX: ${mood.vix}</span>
    </div>
    <div class="mood-content">
      <div class="mood-indicator ${mood.overall.toLowerCase()}">
        <i class="ph ph-chart-line-up"></i>
        <span>${mood.overall}</span>
      </div>
      <div class="trending-tickers">
        <span class="label">Trending</span>
        <div class="ticker-list">
          ${mood.trending.map(ticker => `<span class="trend-ticker">${ticker}</span>`).join('')}
        </div>
      </div>
    </div>
  `;
}

function setupRealtimeUpdates() {
  // Simulate real-time updates
  setInterval(() => {
    const currentTicker = document.getElementById('tickerInput').value.toUpperCase();
    if (currentTicker && mockMarketData[currentTicker]) {
      // Simulate small price changes
      mockMarketData[currentTicker].price += (Math.random() - 0.5) * 0.5;
      if (document.querySelector('.sentiment-results').classList.contains('hidden')) return;
      updateTickerInfo(mockMarketData[currentTicker], currentTicker);
    }
  }, 3000);
}

function showNoDataUI(ticker) {
  document.querySelector('.sentiment-results').classList.remove('hidden');
  document.querySelector('.ticker-price').innerHTML = `
    <div class="current-price">N/A</div>
    <div class="price-change">No data available</div>
  `;
  // Reset other UI elements...
}

function getSentimentIcon(sentiment) {
  switch (sentiment) {
    case 'positive': return 'ph-trend-up';
    case 'negative': return 'ph-trend-down';
    default: return 'ph-minus';
  }
}
