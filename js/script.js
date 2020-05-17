(function(){
    let buttonList = [];
    let showDiv = document.querySelector('.show-div');
    showDiv.textContent = '';
    let buttons = document.querySelectorAll('.btn');

    for(let i = 0; i < buttons.length; i++) {
        if (buttons[i].getAttribute('data-value') == 'clear') {
            buttons[i].addEventListener('click', clearScreen);
        } else if (buttons[i].getAttribute('data-value') == 'eval') {
            buttons[i].addEventListener('click', evaluateExpression);
        } else {
            buttons[i].addEventListener('click', buttonClick);
        }
        buttonList.push(buttons[i]);
    }




    function buttonClick(event) {
        const dataValue = this.getAttribute('data-value');
        if (dataValue == '+' || dataValue == '-' || dataValue == '*' || dataValue == '/') {
            showDiv.textContent += ` ${dataValue} `;
        } else {
            showDiv.textContent += dataValue;
        }
    }

    function clearScreen(event) {
        showDiv.textContent = '';
    }

    function evaluateExpression(event) {
        let expression = showDiv.textContent.split(' ');
        expression = expression.map((item) => +item || item);
        console.log(convertToRPN(expression));
        if (expression.length == 3) {
            let num1 = +expression[0];
            let num2 = +expression[2];
            let operator = expression[1];
            if(operator == '+') {
                showDiv.textContent = add(num1, num2);
            } else if(operator == '-') {
                showDiv.textContent = subtract(num1, num2)
            } else if (operator == '*') {
                showDiv.textContent = multiply(num1, num2);
            } else if(operator == '/') {
                showDiv.textContent = divide(num1, num2);
            }
        } else {
            showDiv.textContent = 'ERROR: Not a valid expression';
        }
    }

    function add(a, b) {
        return a + b;
    }

    function subtract(a, b) {
        return a - b;
    }

    function multiply(a, b) {
        return a * b;
    }

    function divide(a, b) {
        return a / b;
    }

    function convertToRPN(expression) {
        let presidanceDict = {'*': 2, '/': 2, '+': 1, '-': 1};
        let output = [];
        let operatorStack = [];
        for(let term of expression) {
            if (typeof term == 'number') {
                output.push(term);
            } else {
                if (operatorStack.length != 0) {
                    let lastOperator = operatorStack[operatorStack.length - 1];
                    while (presidanceDict[lastOperator] >= presidanceDict[term] && operatorStack.length > 0) {
                        output.push(operatorStack.pop());
                        lastOperator = operatorStack[operatorStack.length - 1];
                    }
                }
                operatorStack.push(term);
            }
        }
        
        let count = operatorStack.length;
        for(let i = 0; i < count; i++) {
            output.push(operatorStack.pop());
        }
        return output;
    }
})();