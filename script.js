
function Display(value) {
    document.getElementById('result').innerHTML += value;
}

function clearDisplay() {
    document.getElementById('result').innerHTML = '';
}



function calculateResult() {
    let exp = document.getElementById("result").innerHTML;  
    let operatorMatch = exp.match(/[\+\-\*\/]/);  

    if (operatorMatch) {
        let operator = operatorMatch[0];
        let operands = exp.split(operator);  

        let num1 = parseFloat(operands[0]);
        let num2 = parseFloat(operands[1]);

        let result;

        switch (operator) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "*":
                result = num1 * num2;
                break;
            case "/":
                if (num2 === 0) {
                    result = "Error"; 
                } else {
                    result = num1 / num2;
                }
                break;
            default:
                result = "Error"; 
        }

        document.getElementById("result").innerHTML = result; 
    } else {
        document.getElementById("result").innerHTML = "Error"; 
    }
}
