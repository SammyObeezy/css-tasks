class Calculator {
  constructor() {
    this.display = document.getElementById('display');
    this.currentInput = '399,981';
    this.previousInput = '';
    this.operation = null;
    this.shouldResetDisplay = false;
    
    this.initializeEventListeners();
    this.initializeThemeSwitcher();
    this.updateDisplay();
  }

  initializeEventListeners() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        const value = e.target.textContent;

        if (action) {
          this.handleAction(action);
        } else if (!isNaN(value)) {
          this.inputNumber(value);
        }
      });
    });
  }

  initializeThemeSwitcher() {
    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        const theme = e.target.dataset.theme;
        this.switchTheme(theme);
      });
    });
  }

  switchTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    
    // Update active theme indicator
    document.querySelectorAll('.theme-option').forEach(option => {
      option.classList.remove('active');
    });
    document.querySelector(`[data-theme="${theme}"]`).classList.add('active');
  }

  inputNumber(num) {
    if (this.shouldResetDisplay) {
      this.currentInput = '';
      this.shouldResetDisplay = false;
    }

    if (this.currentInput === '0' && num !== '.') {
      this.currentInput = num;
    } else {
      this.currentInput += num;
    }
    
    this.updateDisplay();
  }

  handleAction(action) {
    switch (action) {
      case 'decimal':
        if (this.currentInput.indexOf('.') === -1) {
          this.currentInput += '.';
          this.updateDisplay();
        }
        break;
      case 'delete':
        this.delete();
        break;
      case 'reset':
        this.reset();
        break;
      case 'add':
      case 'subtract':
      case 'multiply':
      case 'divide':
        this.setOperation(action);
        break;
      case 'equals':
        this.calculate();
        break;
    }
  }

  delete() {
    if (this.currentInput.length > 1) {
      this.currentInput = this.currentInput.slice(0, -1);
    } else {
      this.currentInput = '0';
    }
    this.updateDisplay();
  }

  reset() {
    this.currentInput = '0';
    this.previousInput = '';
    this.operation = null;
    this.shouldResetDisplay = false;
    this.updateDisplay();
  }

  setOperation(op) {
    if (this.operation && !this.shouldResetDisplay) {
      this.calculate();
    }
    
    this.operation = op;
    this.previousInput = this.currentInput;
    this.shouldResetDisplay = true;
  }

  calculate() {
    if (!this.operation || this.shouldResetDisplay) return;

    const prev = parseFloat(this.previousInput.replace(/,/g, ''));
    const current = parseFloat(this.currentInput.replace(/,/g, ''));
    let result;

    switch (this.operation) {
      case 'add':
        result = prev + current;
        break;
      case 'subtract':
        result = prev - current;
        break;
      case 'multiply':
        result = prev * current;
        break;
      case 'divide':
        result = current !== 0 ? prev / current : 0;
        break;
      default:
        return;
    }

    this.currentInput = result.toString();
    this.operation = null;
    this.previousInput = '';
    this.shouldResetDisplay = true;
    this.updateDisplay();
  }

  formatNumber(num) {
    const parts = num.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }

  updateDisplay() {
    const formattedNumber = this.formatNumber(this.currentInput);
    this.display.textContent = formattedNumber;
  }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Calculator();
});