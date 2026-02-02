var employees = [
    {
        id: 1,
        name: 'Ahmed',
        salary: 15000,
        department: 'CEO',
    },
    {
        id: 2,
        name: 'Mohamed',
        salary: 12000,
        department: 'OP',
    },
    {
        id: 3,
        name: 'Ali',
        salary: 11000,
        department: 'HR',
    },
];

console.log(
    '1 -  Create a function that returns another function that Take Emp and Return it’s Name e ',
);
function employeeWrapper() {
    return function (e) {
        return e.name;
    };
}

getEmployeeName = employeeWrapper();

console.log(getEmployeeName(employees[0]));
console.log('=======================================');

console.log(
    '2 - Create a counter function that increases every time it’s called. ',
);

var counter = (function () {
    _counter = 0;
    return function () {
        return ++_counter;
    };
})();
console.log(counter());
console.log(counter());
console.log(counter());

console.log('=======================================');

console.log(
    '3 - Create a function that tracks how many times a button is clicked each Time Clicked To change Body Background.',
);

function changeBackground() {
    _counter = 0;
    return function (event) {
        console.log(`Background was changed ${++_counter} times`);
        document.getElementById('body').style.backgroundColor =
            '#' +
            Math.floor(Math.random() * 0xffffff)
                .toString(16)
                .padStart(6, '0');
    };
}

document
    .getElementById('changeBackground')
    .addEventListener('click', changeBackground());

console.log('=======================================');

console.log('4 - Create a closure that adds a fixed number to any number. ');

var addFixedNumber = (function () {
    var fixed = 10;
    return function (num) {
        return fixed + num;
    };
})();

console.log('5 + fixed = ' + addFixedNumber(5));
console.log('5 + fixed = ' + addFixedNumber(10));
console.log('5 + fixed = ' + addFixedNumber(15));

console.log('=======================================');

console.log(
    '5 - Create a closure that keeps track of how many employees have been added. ',
);

var addEmployee = (function () {
    employeesCounter = 0;
    return function (id, name, salary, department) {
        console.log(
            `Number of employees have been added using this function is : ${++employeesCounter}`,
        );
        employees.push({
            id: id,
            name: name,
            salary: salary,
            department: department,
        });
    };
})();

addEmployee(4, 'Hagar', 4000, 'IT');
addEmployee(5, 'Youssef', 4300, 'IT');
addEmployee(6, 'Ayman', 14000, 'CO');

console.log(employees);

console.log('=======================================');

console.log(
    '6 - Create a closure that Takes Bonus percentage and applies it To Emp Salary. ',
);

var applyBonusPercentage = (function () {
    return function (employee, percentage) {
        employee.salary += employee.salary * (percentage / 100);
    };
})();

applyBonusPercentage(employees[0], 30);
console.log(`Ahmed salary after applying 30% bonus is ${employees[0].salary}`);

console.log('=======================================');

console.log(
    '7 - Create a closure that remembers a department name and returns a Greeting. ',
);

var greet = (function () {
    var department = 'IT';
    return function (name) {
        console.log(`welcome ${name} in ${department}`);
    };
})();

greet('Ali');
greet('Anwar');
greet('Asmaa');

console.log('=======================================');

console.log('8 - Use map to get an array of employee names. ');

var employeesNames = employees.map(function (employee) {
    return employee.name;
});

console.log(employeesNames);

console.log('=======================================');

console.log('9 - Use filter to get only employees who earn more than 4500. ');

var employeesFiltered = employees.filter(function (employee) {
    return employee.salary > 4500;
});

console.log(employeesFiltered);

console.log('=======================================');

console.log('10 - Use reduce to calculate the total Salaries. ');

console.log(
    employees.reduce(function (acc, employee) {
        return acc + employee.salary;
    }, 0),
);

console.log('=======================================');

console.log(
    '11 -  Create a pure function that increases an employee salary by 10%. ',
);

function increaseSalaryBy10Percent(employee) {
    return (employee.salary += employee.salary * 0.1);
}

console.log(
    `Ahmed Salary after the increase of 10% : ${increaseSalaryBy10Percent(employees[0])}`,
);

console.log('=======================================');

console.log(
    '12 - Add a new employee to EmpArray immutably (without changing the original use map). ',
);

var newEmployees = employees
    .map(function (employee) {
        return structuredClone(employee);
    })
    .concat({ id: 7, name: 'Magdy', salary: 10000, department: 'Dev' });
console.log('Original Array : ', employees);
console.log('Copied Array : ', newEmployees);

console.log('=======================================');

console.log('13 - Write a higher-order function applyBonus(fn)). ');

function highOrderBonusApply(employee, lowerOrderFunction) {
    employee.salary += lowerOrderFunction();
}

highOrderBonusApply(employees[0], function () {
    return 3000;
});
console.log(`Ahmed salary after applying 3000 bonus is ${employees[0].salary}`);

console.log('=======================================');

console.log(
    '14 - Filter employees by department using a reusable curried function. ',
);

function filterDepartment(department) {
    return function filterEmployees(employees) {
        return employees.filter(function (employee) {
            return employee.department == department;
        });
    };
}

var filterByIT = filterDepartment('IT');
var filteredEmployees = filterByIT(employees);

console.log(filteredEmployees);

// another way
console.log(filterDepartment('IT')(employees));

console.log('=======================================');

console.log(
    '15 - Use map to update salaries (+5%) without modifying the original. ',
);

var newEmployees2 = employees.map(function (employee) {
    var newEmployee = structuredClone(employee);
    newEmployee.salary += newEmployee.salary * 0.05;
    return newEmployee;
});

console.log('Original Array : ', employees);
console.log('New Array : ', newEmployees2);
