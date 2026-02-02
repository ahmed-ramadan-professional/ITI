let numbers = [80, 50, 30, 10, 70, 20, 100, 40, 90, 60];

console.log(numbers.sort((a, b) => a - b));
console.log(numbers.sort((a, b) => b - a));

console.log(numbers.filter((num) => num > 50));

console.log(Math.max(...numbers));
console.log(Math.min(...numbers));

function calculator(operator, ...operands) {
    switch (operator) {
        case '+':
            console.log(
                `result of sum operation for ${operands} is ${operands.reduce((acc, curr) => acc + curr, 0)}`,
            );
            break;
        case '-':
            console.log(
                `result of subtraction operation for ${operands} is ${operands.reduce((acc, curr) => acc - curr, 0)}`,
            );
            break;
        case '*':
            console.log(
                `result of multiply operation for ${operands} is ${operands.reduce((acc, curr) => acc * curr, 1)}`,
            );
            break;
        case '/':
            if (operands.includes(0)) return console.log("can't divide by 0");
            console.log(
                `result of division operation for ${operands} is ${operands.reduce((acc, curr) => acc / curr, 1)}`,
            );
            break;
    }
}

calculator('+', 3, 1, 6, 3);

// simulates data taken from user
let userInput = [
    {
        propertyName: 'projectID',
        propertyValue: 1,
    },
    {
        propertyName: 'projectName',
        propertyValue: 'Project Name',
    },
    {
        propertyName: 'duration',
        propertyValue: '3 months',
    },
    {
        propertyName: 'printData',
        propertyValue: function () {
            console.log(this);
        },
    },
];

const project = {
    [userInput[0].propertyName]: userInput[0].propertyValue,
    [userInput[1].propertyName]: userInput[1].propertyValue,
    [userInput[2].propertyName]: userInput[2].propertyValue,
    [userInput[3].propertyName]: userInput[3].propertyValue,
};

project.printData();

// cleaner way (/¯◡ ‿ ◡)/¯
const project2 = {};
userInput.forEach(
    ({ propertyName, propertyValue }) =>
        (project2[propertyName] = propertyValue),
);
project2.printData();
