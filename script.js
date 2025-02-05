let input = document.getElementById('display'); 
let buttons = document.querySelectorAll('button');

let string = "";
let arr = Array.from(buttons);
arr.forEach(button => {
    button.addEventListener('click', (e) => {
        let lastChar = string[string.length - 1];

        if (e.target.innerHTML == '=') {
            if (string.length === 0) {
                input.value = "0"; 
                string = "";
            } else if (isOperator(lastChar)) {
                string = string.slice(0, -1); 
            }

            if (string.length > 0) {
                try {
                    string = calculate(string);
                    input.value = string;
                } catch (error) {
                    input.value = "0"; 
                    string = "";
                }
            }
        } else if (e.target.innerHTML == 'C') {
            string = "";
            input.value = "0"; 
        } else {
            
            if (isOperator(e.target.innerHTML)) {
                
                if (string.length === 0 && e.target.innerHTML !== '-') {
                    return; 
                }

               
                if ((lastChar === '*' || lastChar === '/') && e.target.innerHTML === '-') {
                    string += e.target.innerHTML;
                    input.value = string;
                    input.scrollLeft = input.scrollWidth; 
                    return;
                }

                
                if (string.length === 1 && string[0] === '-' && isOperator(e.target.innerHTML)) {
                    return; 
                }

                
                if ((lastChar === '+' && e.target.innerHTML === '-') || (lastChar === '-' && e.target.innerHTML === '+')) {
                    string = string.slice(0, -1); 
                    string += e.target.innerHTML; 
                    input.value = string;
                    input.scrollLeft = input.scrollWidth; 
                    return;
                }

                
                if (lastChar !== '' && isOperator(lastChar) && !(lastChar === '*' || lastChar === '/') && e.target.innerHTML !== '-') {
                    string = string.slice(0, -1); 
                }

                string += e.target.innerHTML; 
                input.value = string;
                input.scrollLeft = input.scrollWidth; 
                return;
            }

           
            if (string.length === 0 && !isStartingCharacter(e.target.innerHTML)) {
                return; 
            }

            
            if (e.target.innerHTML === '.') {
                
                if (string.length === 0 || isOperator(lastChar)) {
                    string += '0.'; 
                } else {
                   
                    const lastNumber = string.split(/[\+\-\×\÷\*\/]/).pop(); 
                    if (lastNumber.includes('.')) {
                        return; 
                    }
                    string += '.'; 
                }
            } else {
                
                string += e.target.innerHTML;
            }

            input.value = string;
            input.scrollLeft = input.scrollWidth; 
        }
    });
});


function isOperator(char) {
    return ['+', '-', '×', '÷', '*', '/', '%'].includes(char);
}


function isStartingCharacter(char) {
    return /^[0-9.\-]$/.test(char);
}


function calculate(expression) {
   
    let sanitizedExpression = expression.replace(/×/g, '*').replace(/÷/g, '/');

   
    let result = new Function('return ' + sanitizedExpression)();
    
   
    return parseFloat(result.toFixed(10));
}