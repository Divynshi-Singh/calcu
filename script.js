

let input = document.getElementById('inputbox');
let buttons = document.querySelectorAll('button');

let string = "";
let operators = ['+', '-', '*', '/', '%'];
let decimalAdded = false;

let arr = Array.from(buttons);
arr.forEach(button => {
    button.addEventListener('click', (e) => {
        let value = e.target.innerHTML;

        if (value === '=') {
            try {
                if (operators.includes(string.slice(-1))) {
                    return;
                }
                string = calculate(string);
                input.value = string;
                decimalAdded = string.includes('.');
            } catch {
                input.value = "Error";
                string = "";
            }
        } else if (value === 'AC') {
            string = "";
            input.value = string;
            decimalAdded = false;
        } else if (value === 'DEL') {
            let lastChar = string.slice(-1);
            string = string.slice(0, -1);
            input.value = string;
            if (lastChar === '.') {
                decimalAdded = false;
            }
        } else {
            if (operators.includes(value)) {
                if (string === "" && value !== '-') {
                    return; 
                }
                if (
                    operators.includes(string.slice(-1)) &&
                    !(value === '-' && string.slice(-1) !== '-')
                ) {
                    return; 
                }
                decimalAdded = false; 
            } else if (value === '.') {
                if (decimalAdded || string === "" || operators.includes(string.slice(-1))) {
                    return; 
                }
                decimalAdded = true;
            }
            string += value;
            input.value = string;
        }
    });
});


function calculate(expression) {
    try {
       
        expression = expression.replace(/^\-/g, "0-");
        expression = expression.replace(/(\D)\-/g, "$1 0-");

       
        let tokens = expression.match(/(\d+\.?\d*|[-+*/%])/g);
        if (!tokens) return "Error";

        let stack = [];
        let operatorStack = [];


        let precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '%': 2 };
        
       
        
        for (let token of tokens) {
            if (!isNaN(token)) {
                stack.push(parseFloat(token)); 
            } else {
                while (
                    operatorStack.length &&
                    precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
                ) {
                    let op = operatorStack.pop();
                    let b = stack.pop();
                    let a = stack.pop();
                    stack.push(applyOperator(a, b, op));
                }
                operatorStack.push(token);
            }
        }

        


        while (operatorStack.length) {
            let op = operatorStack.pop();
            let b = stack.pop();
            let a = stack.pop();
            stack.push(applyOperator(a, b, op));
        }

        return stack[0].toString();
    } catch {
        return "Error";
    }
}



function applyOperator(a, b, operator) {
    switch (operator) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b !== 0 ? a / b : "Error";
        case '%': return b !== 0 ? a % b : "Error";
        default: return "Error";
    }
}





















