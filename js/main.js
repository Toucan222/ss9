document.addEventListener('DOMContentLoaded', () => {
  // Tool navigation
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all tabs
      document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      tab.classList.add('active');
      
      // Show corresponding tool card
      const toolId = tab.getAttribute('href').substring(1);
      showTool(toolId);
    });
  });

  // Initialize tools with default view
  initializeTools();
});

function showTool(toolId) {
  // Hide all tool cards
  document.querySelectorAll('.tool-card').forEach(card => {
    card.style.display = 'none';
  });
  
  // Show selected tool card
  const selectedTool = document.getElementById(toolId);
  if (selectedTool) {
    selectedTool.style.display = 'block';
  }
}

function initializeTools() {
  // Show default tool (first one)
  const firstTool = document.querySelector('.tool-card');
  if (firstTool) {
    firstTool.style.display = 'block';
  }

  // Initialize sliders and other interactive elements
  initializeSliders();
}

function initializeSliders() {
  document.querySelectorAll('.slider').forEach(slider => {
    slider.addEventListener('input', (e) => {
      const value = e.target.value;
      const label = e.target.parentElement.querySelector('label');
      updateSliderLabel(label, value, e.target.id);
    });
  });
}

function updateSliderLabel(label, value, sliderId) {
  switch(sliderId) {
    case 'monthlyContribution':
      label.textContent = `Monthly Contribution: $${value}`;
      break;
    case 'timeHorizon':
      label.textContent = `Time Horizon: ${value} years`;
      break;
    case 'expectedReturn':
      label.textContent = `Expected Annual Return: ${value}%`;
      break;
    // Add cases for other sliders
  }
}
