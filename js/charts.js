import Chart from 'chart.js/auto';

// Debug logging
console.log('Charts.js loaded');

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
          data: data,
          backgroundColor: 'rgba(37, 99, 235, 0.2)',
          borderColor: '#2563eb',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  } catch (error) {
    console.error('Error creating market pulse chart:', error);
    throw error;
  }
}
