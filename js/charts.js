// Remove Chart.js import since we're using CDN
console.log('Charts.js loaded');

export function createSentimentChart(ctx, data) {
  console.log('Creating sentiment chart with data:', data);
  
  if (!ctx || !data) {
    console.error('Missing context or data for sentiment chart');
    return null;
  }

  const chartData = {
    labels: ['1D', '2D', '3D', '4D', '5D', '6D', '7D'],
    datasets: [{
      label: 'Sentiment Over Time',  // Added explicit label
      data: data,
      borderColor: '#2563eb',
      backgroundColor: 'rgba(37, 99, 235, 0.1)',
      borderWidth: 2,
      tension: 0.4,
      fill: true
    }]
  };

  console.log('Chart data structure:', chartData);

  try {
    return new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#94a3b8'
            }
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
  } catch (error) {
    console.error('Error creating sentiment chart:', error);
    return null;
  }
}

export function createMarketPulseChart(ctx, data) {
  console.log('Creating market pulse chart with data:', data);
  
  if (!ctx || !data) {
    console.error('Missing context or data for market pulse chart');
    return null;
  }

  const chartData = {
    labels: ['Social Media', 'News', 'Technical', 'Fundamental', 'Options Flow'],
    datasets: [{
      label: 'Market Pulse Analysis',  // Added explicit label
      data: data,
      backgroundColor: 'rgba(37, 99, 235, 0.2)',
      borderColor: '#2563eb',
      borderWidth: 2,
      pointBackgroundColor: '#2563eb'
    }]
  };

  console.log('Radar chart data structure:', chartData);

  try {
    return new Chart(ctx, {
      type: 'radar',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#94a3b8'
            }
          }
        },
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
        }
      }
    });
  } catch (error) {
    console.error('Error creating market pulse chart:', error);
    return null;
  }
}
