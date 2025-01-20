import Chart from 'chart.js/auto';

export function createSentimentChart(ctx, data) {
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['1D', '2D', '3D', '4D', '5D', '6D', '7D'],
      datasets: [{
        label: 'Sentiment Trend',
        data: data,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: '#94a3b8'
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#94a3b8'
          }
        }
      }
    }
  });
}

export function createMarketPulseChart(ctx, data) {
  return new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Social Media', 'News', 'Technical', 'Fundamental', 'Options Flow'],
      datasets: [{
        data: data,
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
        borderColor: '#2563eb',
        borderWidth: 2,
        pointBackgroundColor: '#2563eb'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          pointLabels: {
            color: '#94a3b8'
          },
          ticks: {
            color: '#94a3b8',
            backdropColor: 'transparent'
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
}
