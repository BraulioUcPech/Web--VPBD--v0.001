const display = document.querySelector('.display');
let calculation = '';

function insertSymbol(symbol) {
    calculation += symbol;
    display.textContent = calculation;
}

function clearDisplay() {
    calculation = '';
    display.textContent = '0';
}

function calculate() {
    try {
        const result = eval(calculation);
        calculation = result.toString();
        display.textContent = calculation;
    } catch (error) {
        display.textContent = 'Error';
    }
}

const buttons = document.querySelectorAll('.btn');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const symbol = button.getAttribute('data-symbol');
        switch (symbol) {
            case '+':
            case '-':
            case '*':
            case '/':
                insertSymbol(` ${symbol} `);
                break;
            case 'C':
                clearDisplay();
                break;
            case '=':
                calculate();
                break;
            default:
                insertSymbol(symbol);
        }
    });
});




