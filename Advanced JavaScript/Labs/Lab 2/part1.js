var person = {
    id: 1,
    name: 'Empty',
};

var employee = Object.create(person);

Object.defineProperty(employee, 'Salary', {
    set function(value) {
        this._salary = value + value * 0.2;
    },
    get function() {
        return this._salary;
    },
});

var HREmployee = Object.create(employee, {
    location: {
        value: 'Empty',
    },
});

console.log('1 - Test prototype chain');
console.log('1.1 - employee object');
console.log(employee);
console.log(employee.__proto__);
console.log(employee.__proto__.__proto__);
console.log(employee.__proto__.__proto__.__proto__);
console.log('1.2 - HREmployee object');
console.log(HREmployee);
console.log(HREmployee.__proto__);
console.log(HREmployee.__proto__.__proto__);
console.log(HREmployee.__proto__.__proto__.__proto__);
console.log(HREmployee.__proto__.__proto__.__proto__.__proto__);
console.log('=======================================');

console.log(
    '2 - Try to access person ID and Person Name using HREmployee object',
);
console.log(HREmployee.id);
console.log(HREmployee.name);
console.log('=======================================');

console.log(
    '3 - Define Name And ID Properties with values For HREmployee Object then test if it accessible with person object',
);
HREmployee.name = 'Ahmed Ramadan';
HREmployee.id = 99;
console.log('name : ' + HREmployee.name);
console.log('id : ' + HREmployee.id);
console.log('=======================================');

console.log(
    '4 - Define Age Property with Person Object and test if it accessible with HREmployee Object',
);
person.age = 27;
console.log('age : ' + HREmployee.age);
console.log('=======================================');

console.log(
    '5 - After Try previous ,try create the previous objects again but using defineProperties to create each object property',
);
var person2 = Object.create(null);
Object.defineProperties(person2, {
    id: {
        value: 1,
        writable: true,
        configurable: true,
        enumerable: true,
    },
    name: {
        value: 'Empty',
        writable: true,
        configurable: true,
        enumerable: true,
    },
    age: {
        value: 27,
        writable: true,
        configurable: true,
        enumerable: true,
    },
});

var employee2 = Object.create(person2);
Object.defineProperties(employee2, {
    salary: {
        value: 1,
        writable: true,
        configurable: true,
        enumerable: true,
    },
});

var HREmployee2 = Object.create(employee2);
Object.defineProperties(HREmployee2, {
    id: {
        value: 99,
        writable: true,
        configurable: true,
        enumerable: true,
    },
    name: {
        value: 'Ahmed Ramadan',
        writable: true,
        configurable: true,
        enumerable: true,
    },
    location: {
        value: 'Empty',
        writable: true,
        configurable: true,
        enumerable: true,
    },
});

console.log(person2, employee2, HREmployee2);
console.log('=======================================');
