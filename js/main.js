// Add to existing main.js
document.addEventListener('DOMContentLoaded', () => {
  // Keep all existing initialization code

  // Add section navigation
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = e.currentTarget.getAttribute('data-section');
      switchSection(sectionId);
    });
  });
});

function switchSection(sectionId) {
  // Remove active class from all nav items and sections
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  document.querySelectorAll('.tool-section, .dashboard').forEach(section => {
    section.classList.add('hidden');
  });

  // Add active class to clicked nav item and show corresponding section
  const navItem = document.querySelector(`[data-section="${sectionId}"]`);
  const section = document.getElementById(sectionId);
  
  if (navItem && section) {
    navItem.classList.add('active');
    section.classList.remove('hidden');
  }

  // Initialize tool if it's a tool section
  if (['risk-analyzer', 'correlation', 'scenario'].includes(sectionId)) {
    initializeTool(sectionId);
  }
}

function initializeTool(toolId) {
  // Tool-specific initialization logic
  switch (toolId) {
    case 'risk-analyzer':
      if (!window.riskAnalyzer) {
        window.riskAnalyzer = new RiskAnalyzer();
      }
      break;
    case 'correlation':
      if (!window.correlationMatrix) {
        window.correlationMatrix = new CorrelationMatrix();
      }
      break;
    case 'scenario':
      if (!window.scenarioModeler) {
        window.scenarioModeler = new ScenarioModeler();
      }
      break;
  }
}

// Keep all other existing functions
