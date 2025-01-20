import { RiskAnalyzer } from './tools/riskAnalyzer.js';
import { CorrelationMatrix } from './tools/correlationMatrix.js';
import { ScenarioModeler } from './tools/scenarioModeler.js';

let currentTool = null;
let riskAnalyzer = null;
let correlationMatrix = null;
let scenarioModeler = null;

document.addEventListener('DOMContentLoaded', () => {
  initializeTools();
  setupEventListeners();
});

function initializeTools() {
  riskAnalyzer = new RiskAnalyzer();
  correlationMatrix = new CorrelationMatrix();
  scenarioModeler = new ScenarioModeler();
}

function setupEventListeners() {
  // Tool selection
  document.querySelectorAll('.tool-selector').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tool = e.target.dataset.tool;
      switchTool(tool);
    });
  });

  // Form submissions
  document.getElementById('risk-form')?.addEventListener('submit', handleRiskAnalysis);
  document.getElementById('correlation-form')?.addEventListener('submit', handleCorrelationAnalysis);
  document.getElementById('scenario-form')?.addEventListener('submit', handleScenarioAnalysis);
}

function switchTool(toolName) {
  // Hide all tool containers
  document.querySelectorAll('.tool-container').forEach(container => {
    container.classList.add('hidden');
  });

  // Show selected tool
  document.getElementById(`${toolName}-container`)?.classList.remove('hidden');
  currentTool = toolName;
}

function handleRiskAnalysis(e) {
  e.preventDefault();
  const portfolio = parsePortfolioInput(e.target.elements.portfolio.value);
  const results = riskAnalyzer.analyzeRisk(portfolio);
  displayRiskResults(results);
}

function handleCorrelationAnalysis(e) {
  e.preventDefault();
  const assets = parseAssetsInput(e.target.elements.assets.value);
  correlationMatrix = new CorrelationMatrix();
  
  assets.forEach(asset => {
    correlationMatrix.addAsset(asset.ticker, asset.prices);
  });
  
  const results = correlationMatrix.buildMatrix();
  displayCorrelationResults(results);
}

function handleScenarioAnalysis(e) {
  e.preventDefault();
  const scenario = parseScenarioInput(e.target.elements.scenario.value);
  scenarioModeler.createScenario(scenario.name, scenario.factors);
  const results = scenarioModeler.modelScenario(scenario.name);
  displayScenarioResults(results);
}

// Helper functions for parsing inputs and displaying results
function parsePortfolioInput(input) {
  // Parse portfolio input string into structured data
  return JSON.parse(input);
}

function parseAssetsInput(input) {
  // Parse assets input string into structured data
  return JSON.parse(input);
}

function parseScenarioInput(input) {
  // Parse scenario input string into structured data
  return JSON.parse(input);
}

function displayRiskResults(results) {
  const container = document.getElementById('risk-results');
  if (!container) return;

  container.innerHTML = `
    <div class="results-card">
      <h3>Risk Analysis Results</h3>
      <div class="metric">
        <span class="label">Value at Risk (95%)</span>
        <span class="value">${(results.valueAtRisk * 100).toFixed(2)}%</span>
      </div>
      <div class="metric">
        <span class="label">Sharpe Ratio</span>
        <span class="value">${results.sharpeRatio.toFixed(2)}</span>
      </div>
      <div class="metric">
        <span class="label">Risk Level</span>
        <span class="value ${results.riskLevel.toLowerCase()}">${results.riskLevel}</span>
      </div>
      <div class="suggestions">
        <h4>Suggestions</h4>
        <ul>
          ${results.suggestions.map(s => `<li>${s}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}

function displayCorrelationResults(results) {
  const container = document.getElementById('correlation-results');
  if (!container) return;

  container.innerHTML = `
    <div class="results-card">
      <h3>Correlation Analysis</h3>
      <div class="correlation-matrix">
        ${generateCorrelationTable(results.tickers, results.matrix)}
      </div>
      <div class="insights">
        <h4>Key Insights</h4>
        <ul>
          ${results.insights.map(insight => `
            <li class="insight ${insight.type}">
              ${insight.assets.join(' & ')} - ${insight.suggestion}
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `;
}

function displayScenarioResults(results) {
  const container = document.getElementById('scenario-results');
  if (!container) return;

  container.innerHTML = `
    <div class="results-card">
      <h3>Scenario Analysis: ${results.name}</h3>
      <div class="metric">
        <span class="label">Expected Impact</span>
        <span class="value ${results.impact > 0 ? 'positive' : 'negative'}">
          ${(results.impact * 100).toFixed(1)}%
        </span>
      </div>
      <div class="metric">
        <span class="label">Confidence Score</span>
        <span class="value">${(results.confidence * 100).toFixed(0)}%</span>
      </div>
      <div class="analysis">
        <h4>Analysis</h4>
        <ul>
          ${results.analysis.map(a => `<li>${a}</li>`).join('')}
        </ul>
      </div>
      <div class="recommendations">
        <h4>Recommendations</h4>
        <ul>
          ${results.recommendations.map(r => `<li>${r}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}

function generateCorrelationTable(tickers, matrix) {
  return `
    <table class="correlation-table">
      <thead>
        <tr>
          <th></th>
          ${tickers.map(t => `<th>${t}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${matrix.map((row, i) => `
          <tr>
            <th>${tickers[i]}</th>
            ${row.map(val => `
              <td class="correlation-cell ${getCorrelationClass(val)}">
                ${val.toFixed(2)}
              </td>
            `).join('')}
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function getCorrelationClass(value) {
  if (value > 0.7) return 'high-positive';
  if (value < -0.7) return 'high-negative';
  if (value > 0.3) return 'moderate-positive';
  if (value < -0.3) return 'moderate-negative';
  return 'neutral';
}
