import { createSentimentChart, createMarketPulseChart } from './charts.js';
import { mockMarketData, getMarketMood } from './marketData.js';

console.log('Main.js loaded');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded');
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

  // Share button functionality
  document.querySelector('.share-btn')?.addEventListener('click', () => {
    alert('Sharing functionality coming soon! 🚀');
  });

  // Initialize charts with default data
  const defaultData = mockMarketData.AAPL;
  if (defaultData) {
    initializeCharts(defaultData);
  }
}

function initializeCharts(data) {
  const sentimentCanvas = document.getElementById('sentimentChart');
  const marketPulseCanvas = document.getElementById('marketPulseChart');

  if (!sentimentCanvas || !marketPulseCanvas) {
    console.error('Canvas elements not found');
    return;
  }

  const sentimentCtx = sentimentCanvas.getContext('2d');
  const pulseCtx = marketPulseCanvas.getContext('2d');

  const sentimentData = data.sentimentHistory.map(Number);
  const pulseData = data.marketPulse.map(Number);

  createSentimentChart(sentimentCtx, sentimentData);
  createMarketPulseChart(pulseCtx, pulseData);
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
  updateKeyFactors(data.factors);
  
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
  const sentimentCanvas = document.getElementById('sentimentChart');
  const marketPulseCanvas = document.getElementById('marketPulseChart');

  if (sentimentCanvas && marketPulseCanvas) {
    const sentimentCtx = sentimentCanvas.getContext('2d');
    const pulseCtx = marketPulseCanvas.getContext('2d');

    const sentimentData = data.sentimentHistory.map(Number);
    const pulseData = data.marketPulse.map(Number);

    createSentimentChart(sentimentCtx, sentimentData);
    createMarketPulseChart(pulseCtx, pulseData);
  }
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

function updateKeyFactors(factors) {
  const factorsList = document.querySelector('.factors-list');
  if (factorsList && factors) {
    factorsList.innerHTML = factors.map(factor => `
      <div class="factor-tag">
        <i class="ph ${getSentimentIcon(factor.sentiment)}"></i>
        ${factor.text}
      </div>
    `).join('');
  }
}

function updateMarketMood() {
  const mood = getMarketMood();
  const moodContainer = document.querySelector('.market-mood');
  
  if (moodContainer) {
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
}

function showNoDataUI(ticker) {
  document.querySelector('.sentiment-results').classList.remove('hidden');
  document.querySelector('.ticker-price').innerHTML = `
    <div class="current-price">N/A</div>
    <div class="price-change">No data available for ${ticker}</div>
  `;
  // Reset other UI elements
  document.querySelector('.ticker-stats').innerHTML = '';
  document.querySelector('.news-feed').innerHTML = '';
  document.querySelector('.factors-list').innerHTML = '';
}

function getSentimentIcon(sentiment) {
  switch (sentiment) {
    case 'positive': return 'ph-trend-up';
    case 'negative': return 'ph-trend-down';
    default: return 'ph-minus';
  }
}
