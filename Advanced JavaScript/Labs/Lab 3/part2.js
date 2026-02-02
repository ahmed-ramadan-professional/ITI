console.log('part 2');

// 1- Use a constructor function to implement A Car .
// A Car has a Name and a Speed property. The Speed property is the Current Speed of the Car in Km/h

function Car(name, speed) {
    this.name = name;
    this.speed = speed;
}

// 2- Implement an ‘accelerate’ method will increase the car’s speed by 10,and log then new
// speed to console

Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(`${this.name} - Current Speed : ${this.speed} KM/H`);
};

// 3-Implement a ‘brake’ method that will decrease the car’s speed by 5,and log the new
// speed to the console;

Car.prototype.break = function () {
    this.speed -= 5;
    console.log(`${this.name} - Current Speed : ${this.speed} KM/H`);
};

// 3- Create 2 car objects and experiment with calling ‘accelerate’ and ‘brake’ multiple times
// on each of them.

var car1 = new Car('BMW', 120);
var car2 = new Car('Mercedes', 95);

car1.accelerate();
car1.break();
car1.break();

car2.accelerate();
car2.accelerate();
car2.break();

console.log("======================")
