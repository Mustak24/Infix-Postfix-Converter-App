// Function to check if a character is an operator
function isOperator(char) {
    return ['+', '-', '*', '/', '^'].includes(char);
}

// Function to define operator precedence
function precedence(operator) {
    switch (operator) {
        case '+':
        case '-':
            return 1;
        case '*':
        case '/':
            return 2;
        case '^':
            return 3;
        default:
            return 0;
    }
}

// Function to convert infix to postfix
export function infixToPostfix(expression) {
    const stack = [];
    let postfix = '';
    const steps = []; // Array to store each step of conversion

    for (let char of expression) {
        if (/[a-zA-Z0-9]/.test(char)) {
            postfix += char; // Append operand to postfix expression
            steps.push({ action: `Add operand ${char}`, solution: postfix });
        } else if (char === '(') {
            stack.push(char);
            steps.push({ action: `Push '(' to stack`, solution: postfix });
        } else if (char === ')') {
            while (stack.length && stack[stack.length - 1] !== '(') {
                postfix += stack.pop();
                steps.push({ action: `Pop and add to postfix until '('`, solution: postfix });
            }
            stack.pop(); // Remove '(' from stack
            steps.push({ action: `Pop '(' from stack`, solution: postfix });
        } else if (isOperator(char)) {
            while (
                stack.length &&
                precedence(stack[stack.length - 1]) >= precedence(char)
            ) {
                postfix += stack.pop();
                steps.push({ action: `Pop and add to postfix based on precedence`, solution: postfix });
            }
            stack.push(char);
            steps.push({ action: `Push operator ${char} to stack`, solution: postfix });
        }
    }

    // Pop remaining operators from the stack
    while (stack.length) {
        postfix += stack.pop();
        steps.push({ action: `Pop remaining operators to postfix`, solution: postfix });
    }

    steps.push({ action: `Final postfix expression`, solution: postfix });
    return steps;
}

// Function to convert postfix to infix
export function postfixToInfix(expression) {
    const stack = [];
    const steps = []; // Array to store each step of conversion

    for (let char of expression) {
        if (/[a-zA-Z0-9]/.test(char)) {
            stack.push(char); // Push operand to stack
            steps.push({ action: `Push operand ${char} to stack`, solution: stack.join(' ') });
        } else if (isOperator(char)) {
            if (stack.length < 2) {
                steps.push({ action: `Error: Not enough operands for operator ${char}`, solution: 'Invalid Expression' });
                return steps;
            }
            const operand2 = stack.pop();
            const operand1 = stack.pop();
            const subExpression = `(${operand1}${char}${operand2})`;
            stack.push(subExpression);
            steps.push({ action: `Pop operands and push sub-expression ${subExpression}`, solution: stack.join(' ') });
        }
    }

    steps.push({ action: `Final infix expression`, solution: stack[0] });
    return steps;
}
