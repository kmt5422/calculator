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
        let rpnExpression = convertToRPN(expression);
        let answer = evaluateRPN(rpnExpression);
        if (answer.length == 1 && !Number.isNaN(answer[0])) {
           showDiv.textContent = answer[0]; 
        } else {
            showDiv.textContent = 'ERROR: Invalid Expression';
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
        let precedenceDict = {'*': 2, '/': 2, '+': 1, '-': 1};
        let output = [];
        let operatorStack = [];
        for(let term of expression) {
            if (typeof term == 'number') {
                output.push(term);
            } else {
                if (operatorStack.length != 0) {
                    let lastOperator = operatorStack[operatorStack.length - 1];
                    while (precedenceDict[lastOperator] >= precedenceDict[term] && operatorStack.length > 0) {
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

    function evaluateRPN(rpnExpression) {
        let stack = [];
        for(let term of rpnExpression) {
            if (typeof term == 'number') {
                stack.push(term)
            } else {
                let secondTerm = stack.pop();
                let firstTerm = stack.pop();
                switch(term) {
                    case '+':
                        stack.push(add(firstTerm, secondTerm));
                        break;
                    case '-':
                        stack.push(subtract(firstTerm, secondTerm));
                        break;
                    case '*':
                        stack.push(multiply(firstTerm, secondTerm));
                        break;
                    case '/':
                        stack.push(divide(firstTerm, secondTerm));
                }
            }
        }
        return stack;
    }
})();