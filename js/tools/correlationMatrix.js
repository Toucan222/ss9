// Correlation Matrix Builder
export class CorrelationMatrix {
  constructor() {
    this.assets = new Map();
  }

  addAsset(ticker, priceHistory) {
    this.assets.set(ticker, priceHistory);
  }

  calculateCorrelation(asset1, asset2) {
    const returns1 = this.calculateReturns(asset1);
    const returns2 = this.calculateReturns(asset2);
    
    const mean1 = returns1.reduce((a, b) => a + b) / returns1.length;
    const mean2 = returns2.reduce((a, b) => a + b) / returns2.length;
    
    const variance1 = returns1.reduce((a, b) => a + Math.pow(b - mean1, 2), 0);
    const variance2 = returns2.reduce((a, b) => a + Math.pow(b - mean2, 2), 0);
    
    const covariance = returns1.reduce((a, b, i) => 
      a + (b - mean1) * (returns2[i] - mean2), 0
    );
    
    return covariance / Math.sqrt(variance1 * variance2);
  }

  buildMatrix() {
    const tickers = Array.from(this.assets.keys());
    const matrix = [];
    
    for (let i = 0; i < tickers.length; i++) {
      matrix[i] = [];
      for (let j = 0; j < tickers.length; j++) {
        if (i === j) {
          matrix[i][j] = 1;
        } else {
          matrix[i][j] = this.calculateCorrelation(
            this.assets.get(tickers[i]),
            this.assets.get(tickers[j])
          );
        }
      }
    }
    
    return {
      tickers,
      matrix,
      insights: this.generateInsights(matrix, tickers)
    };
  }

  generateInsights(matrix, tickers) {
    const insights = [];
    
    // Find highly correlated pairs
    for (let i = 0; i < tickers.length; i++) {
      for (let j = i + 1; j < tickers.length; j++) {
        if (Math.abs(matrix[i][j]) > 0.7) {
          insights.push({
            type: matrix[i][j] > 0 ? 'positive' : 'negative',
            assets: [tickers[i], tickers[j]],
            correlation: matrix[i][j],
            suggestion: matrix[i][j] > 0 
              ? 'Consider diversifying these highly correlated assets'
              : 'Potential hedging opportunity between these negatively correlated assets'
          });
        }
      }
    }
    
    return insights;
  }

  calculateReturns(priceHistory) {
    const returns = [];
    for (let i = 1; i < priceHistory.length; i++) {
      returns.push((priceHistory[i] - priceHistory[i-1]) / priceHistory[i-1]);
    }
    return returns;
  }
}
