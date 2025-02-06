let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = '';
let operators = ['*', '/', '+', '-'];


function evaluateExpression(expression) {
  let numbers = [];
  let ops = [];
  let num = '';
  let i = 0;

  function applyOperation(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return b !== 0 ? a / b : 'Infinity';
      default:
        return 0;
    }
  }

 
  while (i < expression.length) {
    const char = expression[i];

    if (!isNaN(char) || char === '.') {
      num += char; 
    } else if (operators.includes(char)) {
      if (char === '-' && (i === 0 || operators.includes(expression[i - 1]))) {
        num += char;
      } else {
        if (num !== '') {
          numbers.push(num);
          num = '';
        }

        ops.push(char);
      }
    }
    i++;
  }
  if (num !== '') numbers.push(num);

 
  for (let j = 0; j < ops.length; j++) {
    if (ops[j] === '*' || ops[j] === '/') {
      const result = applyOperation(numbers[j], numbers[j + 1], ops[j]);
      if (result === 'Error') return 'Error';
      numbers.splice(j, 2, result);
      ops.splice(j, 1);
      j--; 
    }
  }

 
  while (ops.length) {
    const result = applyOperation(numbers[0], numbers[1], ops[0]);
    if (result === 'Error') return 'Error';
    numbers.splice(0, 2, result);
    ops.splice(0, 1);
  }

  return numbers[0];
}

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const value = e.target.innerHTML;
    const lastChar = string[string.length - 1];

    if (value === '=') {
      const result = evaluateExpression(string);
      string = result === 'Error' ? '' : result.toString();
      input.value = result;
    } else if (value === 'AC') {
      string = '';
      input.value = string;
    } else if (value === 'DEL') {
      string = string.slice(0, -1);
      input.value = string;
    } else if (operators.includes(value)) {
     
      if (string === '') {
        if (value === '-') {
          string += value; 
        }
      } else if (!operators.includes(lastChar)) {
        string += value; 
      } else {
        
        string = string.replace(/([*+/\-]){2,}$/, value);
      }

      
      if (value === '-' && (lastChar === '*' || lastChar === '/')) {
        string += value; 
      }

     
      if (value === '*' && (lastChar === '/' || lastChar === '+')) {
        string = string.slice(0, -1) + '*'; 
      }

     
      if (value === '/' && (lastChar === '*' || lastChar === '+')) {
        string = string.slice(0, -1) + '/'; 
      }

      
      if (
        value === '+' &&
        (lastChar === '-' || lastChar === '*' || lastChar === '/')
      ) {
        string = string.slice(0, -1) + '+';
      }

     
      if (
        value === '-' &&
        (lastChar === '*' || lastChar === '/' || lastChar === '+')
      ) {
        string = string.slice(0, -1) + '-'; 
      }

      input.value = string;
    } else if (value === '.') {
      const lastOperatorIndex = Math.max(
        string.lastIndexOf('+'),
        string.lastIndexOf('-'),
        string.lastIndexOf('*'),
        string.lastIndexOf('/')
      );

      const currentNumber = string.slice(lastOperatorIndex + 1);

      if (!currentNumber.includes('.')) {
        if (currentNumber === '') {
          string += '0.';
        } else {
          string += value;
        }
        input.value = string;
      }
    } else {
      string += value;
      input.value = string;
    }

   
    input.scrollLeft = input.scrollWidth;
  });
});