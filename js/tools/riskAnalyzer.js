export class RiskAnalyzer {
  constructor() {
    this.holdings = new Map();
    this.marketData = {
      volatility: {
        AAPL: 0.25,
        GOOGL: 0.28,
        MSFT: 0.22,
        AMZN: 0.32,
        META: 0.35,
        NVDA: 0.45,
        TSLA: 0.65
      },
      correlation: {
        AAPL: { GOOGL: 0.72, MSFT: 0.68, AMZN: 0.65 },
        GOOGL: { MSFT: 0.75, AMZN: 0.70 },
        MSFT: { AMZN: 0.67 }
      }
    };
  }

  addHolding(ticker, weight) {
    this.holdings.set(ticker.toUpperCase(), parseFloat(weight) / 100);
  }

  removeHolding(ticker) {
    this.holdings.delete(ticker.toUpperCase());
  }

  calculatePortfolioRisk(confidenceLevel = 0.95) {
    const holdings = Array.from(this.holdings.entries());
    if (holdings.length === 0) return null;

    // Calculate portfolio volatility
    let portfolioVol = 0;
    for (const [ticker1, weight1] of holdings) {
      for (const [ticker2, weight2] of holdings) {
        const vol1 = this.marketData.volatility[ticker1] || 0.30;
        const vol2 = this.marketData.volatility[ticker2] || 0.30;
        const corr = ticker1 === ticker2 ? 1 : 
          (this.marketData.correlation[ticker1]?.[ticker2] || 0.5);
        
        portfolioVol += weight1 * weight2 * vol1 * vol2 * corr;
      }
    }
    portfolioVol = Math.sqrt(portfolioVol);

    // Calculate VaR
    const z = this.getZScore(confidenceLevel);
    const var95 = portfolioVol * z;

    // Calculate other metrics
    const sharpeRatio = this.calculateSharpeRatio(portfolioVol);
    const maxDrawdown = this.estimateMaxDrawdown(portfolioVol);

    return {
      valueAtRisk: var95,
      portfolioVolatility: portfolioVol,
      sharpeRatio: sharpeRatio,
      maxDrawdown: maxDrawdown,
      riskLevel: this.getRiskLevel(portfolioVol),
      diversificationScore: this.calculateDiversificationScore(),
      recommendations: this.generateRecommendations(portfolioVol, var95)
    };
  }

  getZScore(confidenceLevel) {
    // Approximation of inverse normal distribution
    const x = confidenceLevel;
    if (x === 0.95) return 1.645;
    if (x === 0.99) return 2.326;
    return 1.645; // Default to 95%
  }

  calculateSharpeRatio(volatility, riskFreeRate = 0.04) {
    const expectedReturn = this.estimatePortfolioReturn();
    return (expectedReturn - riskFreeRate) / volatility;
  }

  estimatePortfolioReturn() {
    let totalReturn = 0;
    for (const [ticker, weight] of this.holdings) {
      // Simplified return estimation
      const baseReturn = 0.10; // 10% base return
      const volatilityAdjustment = this.marketData.volatility[ticker] || 0.30;
      totalReturn += weight * (baseReturn + volatilityAdjustment * 0.1);
    }
    return totalReturn;
  }

  estimateMaxDrawdown(volatility) {
    // Simplified max drawdown estimation based on volatility
    return volatility * 2.5;
  }

  getRiskLevel(volatility) {
    if (volatility > 0.35) return 'High';
    if (volatility > 0.20) return 'Moderate';
    return 'Low';
  }

  calculateDiversificationScore() {
    const holdings = Array.from(this.holdings.entries());
    if (holdings.length <= 1) return 0;

    // Calculate Herfindahl-Hirschman Index
    const hhi = holdings.reduce((acc, [_, weight]) => acc + Math.pow(weight, 2), 0);
    
    // Convert to diversification score (0-100)
    return Math.round((1 - hhi) * 100);
  }

  generateRecommendations(volatility, var95) {
    const recommendations = [];
    const diversificationScore = this.calculateDiversificationScore();

    if (volatility > 0.35) {
      recommendations.push({
        type: 'warning',
        message: 'Portfolio volatility is high. Consider reducing exposure to high-beta stocks.'
      });
    }

    if (diversificationScore < 50) {
      recommendations.push({
        type: 'warning',
        message: 'Portfolio concentration is high. Consider adding more uncorrelated assets.'
      });
    }

    if (var95 > 0.30) {
      recommendations.push({
        type: 'danger',
        message: 'Value at Risk exceeds recommended levels. Review position sizes.'
      });
    }

    if (recommendations.length === 0) {
      recommendations.push({
        type: 'success',
        message: 'Portfolio risk metrics are within acceptable ranges.'
      });
    }

    return recommendations;
  }
}
