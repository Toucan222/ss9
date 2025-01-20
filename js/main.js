import { createSentimentChart, createMarketPulseChart } from './charts.js';
import { mockMarketData, getMarketMood } from './marketData.js';

// Debug logging
console.log('Main.js loaded');
console.log('Market Data:', mockMarketData);
console.log('Market Mood:', getMarketMood());

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded');
  
  // Initialize basic content first
  initializeBasicContent();
  
  // Then initialize charts
  initializeCharts();
  
  // Setup other UI elements
  setupUIElements();
});

function initializeBasicContent() {
  const marketMood = getMarketMood();
  
  // Populate news
  const newsContainer = document.querySelector('.news-container');
  if (newsContainer) {
    const newsHtml = mockMarketData.AAPL.newsHeadlines
      .map(news => `
        <div class="news-item ${news.sentiment}">
          <span class="news-time">${news.time}</span>
          <p class="news-title">${news.title}</p>
        </div>
      `)
      .join('');
    newsContainer.innerHTML = newsHtml;
  }

  // Debug logging
  console.log('Basic content initialized');
}

function initializeCharts() {
  const sentimentCtx = document.getElementById('sentimentChart')?.getContext('2d');
  const pulseCtx = document.getElementById('pulseChart')?.getContext('2d');

  if (sentimentCtx && pulseCtx) {
    console.log('Chart contexts found');
    
    try {
      // Initialize with sample data
      createSentimentChart(sentimentCtx, mockMarketData.AAPL.sentimentHistory);
      createMarketPulseChart(pulseCtx, mockMarketData.AAPL.marketPulse);
      
      console.log('Charts initialized');
    } catch (error) {
      console.error('Error initializing charts:', error);
    }
  } else {
    console.error('Chart contexts not found');
  }
}

function setupUIElements() {
  // Previous UI setup code remains unchanged
  console.log('UI elements setup complete');
}

// Rest of the code remains unchanged
