// App.jsx
import React, { useState } from 'react';
import './App.css';

function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [currentValue, setCurrentValue] = useState('');
  const [operator, setOperator] = useState(null);
  const [prevValue, setPrevValue] = useState('');
  const [history, setHistory] = useState([]);

  const handleInput = (value) => {
    if (value === '.' && currentValue.includes('.')) {
      return; // Prevent multiple decimal points
    }

    setDisplayValue(displayValue === '0' ? value : displayValue + value);
    setCurrentValue(currentValue + value);
  };

  const handleOperator = (op) => {
    if (currentValue !== '') {
      setOperator(op);
      setPrevValue(currentValue);
      setCurrentValue('');
      setDisplayValue(displayValue + ' ' + op);
    }
  };

  const handleEqual = () => {
    if (currentValue !== '') {
      const prev = parseFloat(prevValue);
      const current = parseFloat(currentValue);
      let result;
      switch (operator) {
        case '+':
          result = prev + current;
          break;
        case '-':
          result = prev - current;
          break;
        case '*':
          result = prev * current;
          break;
        case '/':
          result = prev / current;
          break;
        default:
          return;
      }
      setDisplayValue(result.toString());
      setCurrentValue(result.toString());
      setOperator(null);
      setPrevValue('');

      // Save calculation to history
      setHistory([...history, `${prev} ${operator} ${current} = ${result}`]);
    }
  };

  const handleClear = () => {
    setDisplayValue('0');
    setCurrentValue('');
    setOperator(null);
    setPrevValue('');
  };

  const handleBackspace = () => {
    if (currentValue !== '') {
      setDisplayValue(displayValue.slice(0, -1));
      setCurrentValue(currentValue.slice(0, -1));
    }
  };

  const handleHistoryClick = () => {
    alert(history.join('\n')); // Display history as an alert
  };

  return (
    <div className="calculator">
      <div className="display">{displayValue}</div>
      <div className="buttons">
        <button onClick={() => handleInput('7')}>7</button>
        <button onClick={() => handleInput('8')}>8</button>
        <button onClick={() => handleInput('9')}>9</button>
        <button onClick={() => handleOperator('*')}>*</button>

        <button onClick={() => handleInput('4')}>4</button>
        <button onClick={() => handleInput('5')}>5</button>
        <button onClick={() => handleInput('6')}>6</button>
        <button onClick={() => handleOperator('/')}>/</button>

        <button onClick={() => handleInput('1')}>1</button>
        <button onClick={() => handleInput('2')}>2</button>
        <button onClick={() => handleInput('3')}>3</button>
        <button onClick={() => handleOperator('-')}>-</button>

        <button onClick={() => handleInput('0')}>0</button>
        <button onClick={() => handleInput('00')}>00</button>
        <button onClick={() => handleInput('.')}>.</button> {/* Decimal point button */}
        <button onClick={() => handleOperator('+')}>+</button>

        <button onClick={handleClear}>C</button>

        <button onClick={handleBackspace}>←</button>
        <button className="history" onClick={handleHistoryClick}>History</button>
        <button onClick={handleEqual}>=</button>

      </div>
    </div>
  );
}

export default App;
