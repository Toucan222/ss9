// Portfolio Risk Analyzer
export class RiskAnalyzer {
  constructor() {
    this.portfolioData = new Map();
  }

  calculateVaR(portfolio, confidence = 0.95) {
    // Value at Risk calculation
    const returns = this.calculateReturns(portfolio);
    const sortedReturns = returns.sort((a, b) => a - b);
    const index = Math.floor((1 - confidence) * sortedReturns.length);
    return sortedReturns[index];
  }

  calculateSharpeRatio(portfolio, riskFreeRate = 0.02) {
    const returns = this.calculateReturns(portfolio);
    const avgReturn = returns.reduce((a, b) => a + b) / returns.length;
    const stdDev = Math.sqrt(
      returns.reduce((a, b) => a + Math.pow(b - avgReturn, 2), 0) / returns.length
    );
    return (avgReturn - riskFreeRate) / stdDev;
  }

  calculateReturns(portfolio) {
    // Mock return calculation for demo
    return portfolio.map(holding => 
      holding.weight * (Math.random() * 0.1 - 0.05)
    );
  }

  analyzeRisk(portfolio) {
    const var95 = this.calculateVaR(portfolio);
    const sharpeRatio = this.calculateSharpeRatio(portfolio);
    
    return {
      valueAtRisk: var95,
      sharpeRatio: sharpeRatio,
      riskLevel: this.interpretRiskLevel(var95),
      suggestions: this.generateSuggestions(var95, sharpeRatio)
    };
  }

  interpretRiskLevel(var95) {
    if (var95 < -0.15) return 'High';
    if (var95 < -0.08) return 'Moderate';
    return 'Low';
  }

  generateSuggestions(var95, sharpeRatio) {
    let suggestions = [];
    if (var95 < -0.15) {
      suggestions.push('Consider reducing exposure to volatile assets');
      suggestions.push('Implement stop-loss orders for high-risk positions');
    }
    if (sharpeRatio < 1) {
      suggestions.push('Portfolio may be underperforming on a risk-adjusted basis');
      suggestions.push('Review asset allocation strategy');
    }
    return suggestions;
  }
}
