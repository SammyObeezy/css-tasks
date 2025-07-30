let currentInput = '';
let previousInput = '';
let operator = '';
let shouldResetDisplay = false;

const display = document.getElementById('display');
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Theme cycling
let currentTheme = 0;
const themes = ['dark', 'light', 'purple'];

themeToggle.addEventListener('click', () => {
  currentTheme = (currentTheme + 1) % themes.length;
  const theme = themes[currentTheme];
  body.setAttribute('data-theme', theme);
  themeToggle.setAttribute('data-theme', theme);
});

// Calculator functionality
function updateDisplay(value) {
  if (value.length > 10) {
    display.textContent = parseFloat(value).toExponential(5);
  } else {
    display.textContent = formatNumber(value);
  }
}

function formatNumber(num) {
  if (num.includes('.')) {
    const parts = num.split('.');
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + parts[1];
  }
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function calculate() {
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  
  if (isNaN(prev) || isNaN(current)) return;
  
  let result;
  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '×':
      result = prev * current;
      break;
    case '/':
      result = prev / current;
      break;
    default:
      return;
  }
  
  currentInput = result.toString();
  operator = '';
  previousInput = '';
  shouldResetDisplay = true;
}

// Button event listeners
document.addEventListener('click', (e) => {
  if (e.target.matches('.button-number')) {
    const value = e.target.dataset.value || e.target.textContent;
    
    if (shouldResetDisplay) {
      currentInput = '';
      shouldResetDisplay = false;
    }
    
    if (value === '.' && currentInput.includes('.')) return;
    
    currentInput += value;
    updateDisplay(currentInput);
  }
  
  if (e.target.matches('.button-operator')) {
    if (currentInput === '') return;
    
    if (previousInput !== '' && operator !== '') {
      calculate();
      updateDisplay(currentInput);
    }
    
    operator = e.target.textContent;
    previousInput = currentInput;
    currentInput = '';
  }
  
  if (e.target.matches('.button-equals')) {
    if (previousInput !== '' && currentInput !== '' && operator !== '') {
      calculate();
      updateDisplay(currentInput);
    }
  }
  
  if (e.target.matches('.button-del')) {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || '0');
  }
  
  if (e.target.matches('.button-reset')) {
    currentInput = '';
    previousInput = '';
    operator = '';
    shouldResetDisplay = false;
    updateDisplay('0');
  }
});

// Initialize display
updateDisplay('399,981');
currentInput = '399981';