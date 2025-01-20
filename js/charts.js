import Chart from 'chart.js/auto';

export function createSentimentChart(ctx, data) {
  console.log('Creating sentiment chart with data:', data);
  
  try {
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
          fill: true,
          pointBackgroundColor: '#2563eb',
          pointBorderColor: '#ffffff',
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: '#1e293b',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            padding: 12,
            displayColors: false,
            callbacks: {
              label: function(context) {
                return `Sentiment: ${context.raw}%`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
              drawBorder: false
            },
            ticks: {
              color: '#94a3b8',
              padding: 8,
              callback: function(value) {
                return value + '%';
              }
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#94a3b8',
              padding: 8
            }
          }
        }
      }
    });
  } catch (error) {
    console.error('Error creating sentiment chart:', error);
    throw error;
  }
}

export function createMarketPulseChart(ctx, data) {
  console.log('Creating market pulse chart with data:', data);
  
  try {
    return new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Social Media', 'News', 'Technical', 'Fundamental', 'Options Flow'],
        datasets: [{
          label: 'Market Pulse',
          data: data,
          backgroundColor: 'rgba(37, 99, 235, 0.2)',
          borderColor: '#2563eb',
          borderWidth: 2,
          pointBackgroundColor: '#2563eb',
          pointBorderColor: '#ffffff',
          pointHoverBackgroundColor: '#ffffff',
          pointHoverBorderColor: '#2563eb',
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true,
            min: 0,
            max: 100,
            angleLines: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            pointLabels: {
              color: '#94a3b8',
              font: {
                size: 12
              }
            },
            ticks: {
              stepSize: 20,
              color: '#94a3b8',
              backdropColor: 'transparent',
              callback: function(value) {
                return value + '%';
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: '#1e293b',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            padding: 12,
            displayColors: false,
            callbacks: {
              label: function(context) {
                return `${context.label}: ${context.raw}%`;
              }
            }
          }
        }
      }
    });
  } catch (error) {
    console.error('Error creating market pulse chart:', error);
    throw error;
  }
}
