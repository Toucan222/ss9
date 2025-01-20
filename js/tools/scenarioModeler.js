// Custom Scenario Modeler
export class ScenarioModeler {
  constructor() {
    this.scenarios = new Map();
    this.marketFactors = new Map();
  }

  addMarketFactor(name, currentValue, sensitivity) {
    this.marketFactors.set(name, {
      currentValue,
      sensitivity,
      history: []
    });
  }

  createScenario(name, factors) {
    this.scenarios.set(name, {
      factors,
      impact: null,
      confidence: null
    });
  }

  modelScenario(scenarioName) {
    const scenario = this.scenarios.get(scenarioName);
    if (!scenario) return null;

    let totalImpact = 0;
    let confidenceScore = 1;

    for (const [factor, change] of Object.entries(scenario.factors)) {
      const marketFactor = this.marketFactors.get(factor);
      if (marketFactor) {
        const impact = change * marketFactor.sensitivity;
        totalImpact += impact;
        confidenceScore *= this.calculateConfidence(change, marketFactor);
      }
    }

    scenario.impact = totalImpact;
    scenario.confidence = confidenceScore;

    return {
      name: scenarioName,
      impact: totalImpact,
      confidence: confidenceScore,
      analysis: this.analyzeScenario(totalImpact, confidenceScore),
      recommendations: this.generateRecommendations(totalImpact, scenario.factors)
    };
  }

  calculateConfidence(change, factor) {
    // Simple confidence calculation based on historical volatility
    const avgChange = Math.abs(change);
    const historicalAvg = factor.history.reduce((a, b) => a + Math.abs(b), 0) / 
                         (factor.history.length || 1);
    
    return 1 - Math.min(Math.abs(avgChange - historicalAvg) / avgChange, 0.5);
  }

  analyzeScenario(impact, confidence) {
    let analysis = [];

    if (Math.abs(impact) > 0.15) {
      analysis.push(`High impact scenario (${(impact * 100).toFixed(1)}% expected change)`);
    } else {
      analysis.push(`Moderate impact scenario (${(impact * 100).toFixed(1)}% expected change)`);
    }

    if (confidence < 0.6) {
      analysis.push('Low confidence in scenario estimates');
    } else if (confidence < 0.8) {
      analysis.push('Moderate confidence in scenario estimates');
    } else {
      analysis.push('High confidence in scenario estimates');
    }

    return analysis;
  }

  generateRecommendations(impact, factors) {
    let recommendations = [];

    if (impact < -0.1) {
      recommendations.push('Consider implementing hedging strategies');
      recommendations.push('Review stop-loss levels');
    } else if (impact > 0.1) {
      recommendations.push('Consider taking profits on overweight positions');
      recommendations.push('Review upside capture strategies');
    }

    // Factor-specific recommendations
    for (const [factor, change] of Object.entries(factors)) {
      if (Math.abs(change) > 0.2) {
        recommendations.push(
          `High exposure to ${factor} changes. Consider reviewing ${factor}-sensitive positions.`
        );
      }
    }

    return recommendations;
  }
}
