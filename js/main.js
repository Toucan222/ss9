// Add to existing main.js
import { RiskAnalyzer } from './tools/riskAnalyzer.js';

let riskAnalyzer = null;

document.addEventListener('DOMContentLoaded', () => {
  // Previous initialization code remains...

  // Initialize Risk Analyzer
  initializeRiskAnalyzer();
});

function initializeRiskAnalyzer() {
  riskAnalyzer = new RiskAnalyzer();

  const addHoldingBtn = document.querySelector('.add-holding');
  const holdingsList = document.querySelector('.holdings-list');
  const analyzeBtn = document.querySelector('.analyze-button');
  const confidenceSlider = document.getElementById('confidenceLevel');

  if (addHoldingBtn) {
    addHoldingBtn.addEventListener('click', () => {
      const ticker = document.querySelector('.holding-ticker').value.toUpperCase();
      const weight = document.querySelector('.holding-weight').value;

      if (ticker && weight) {
        addHolding(ticker, weight);
        document.querySelector('.holding-ticker').value = '';
        document.querySelector('.holding-weight').value = '';
      }
    });
  }

  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', performRiskAnalysis);
  }

  if (confidenceSlider) {
    confidenceSlider.addEventListener('input', (e) => {
      const label = e.target.parentElement.querySelector('label');
      if (label) {
        label.textContent = `Confidence Level: ${e.target.value}%`;
      }
    });
  }
}

function addHolding(ticker, weight) {
  const holdingsList = document.querySelector('.holdings-list');
  if (!holdingsList) return;

  riskAnalyzer.addHolding(ticker, weight);

  const holdingElement = document.createElement('div');
  holdingElement.className = 'holding-item';
  holdingElement.innerHTML = `
    <span class="holding-ticker">${ticker}</span>
    <span class="holding-weight">${weight}%</span>
    <button class="remove-holding" data-ticker="${ticker}">
      <i class="ph ph-x"></i>
    </button>
  `;

  holdingsList.appendChild(holdingElement);

  // Add remove functionality
  holdingElement.querySelector('.remove-holding').addEventListener('click', (e) => {
    const ticker = e.currentTarget.dataset.ticker;
    riskAnalyzer.removeHolding(ticker);
    holdingElement.remove();
  });
}

function performRiskAnalysis() {
  const confidenceLevel = parseFloat(document.getElementById('confidenceLevel').value) / 100;
  const results = riskAnalyzer.calculatePortfolioRisk(confidenceLevel);

  if (!results) {
    showError('Please add holdings to analyze');
    return;
  }

  updateRiskMetrics(results);
  showRecommendations(results.recommendations);
}

function updateRiskMetrics(results) {
  const metricsContainer = document.querySelector('.risk-metrics');
  if (!metricsContainer) return;

  metricsContainer.classList.remove('hidden');
  
  const metrics = [
    { label: 'Value at Risk (VaR)', value: `${(results.valueAtRisk * 100).toFixed(2)}%` },
    { label: 'Sharpe Ratio', value: results.sharpeRatio.toFixed(2) },
    { label: 'Max Drawdown', value: `${(results.maxDrawdown * 100).toFixed(2)}%` }
  ];

  metricsContainer.innerHTML = metrics.map(metric => `
    <div class="metric-card">
      <div class="metric-value">${metric.value}</div>
      <div class="metric-label">${metric.label}</div>
    </div>
  `).join('');

  // Add risk level indicator
  metricsContainer.insertAdjacentHTML('afterend', `
    <div class="risk-level ${results.riskLevel.toLowerCase()}">
      <i class="ph ph-warning"></i>
      <span>Risk Level: ${results.riskLevel}</span>
    </div>
  `);
}

function showRecommendations(recommendations) {
  const container = document.querySelector('.recommendations');
  if (!container) return;

  container.innerHTML = `
    <h3>Recommendations</h3>
    <ul class="recommendations-list">
      ${recommendations.map(rec => `
        <li class="recommendation ${rec.type}">
          <i class="ph ph-${getRecommendationIcon(rec.type)}"></i>
          ${rec.message}
        </li>
      `).join('')}
    </ul>
  `;
}

function getRecommendationIcon(type) {
  switch (type) {
    case 'warning': return 'warning';
    case 'danger': return 'warning-circle';
    case 'success': return 'check-circle';
    default: return 'info';
  }
}

function showError(message) {
  const container = document.querySelector('.risk-metrics');
  if (!container) return;

  container.innerHTML = `
    <div class="error-message">
      <i class="ph ph-x-circle"></i>
      ${message}
    </div>
  `;
}
