console.log('part 3');

// 1-Use A constructor function to implement an Electric Car (Called EV) as a CHILD “class”
// of Car Besides a Name and Current Speed ,the EV also has the Current battery charge in %
// (‘charge’ property );

function Car(name, speed) {
    this.name = name;
    this.speed = speed;
}

function EV(name, speed, charge) {
    Car.call(this, name, speed);
    this.charge = charge;
}

EV.prototype = Object.create(Car);
EV.prototype.constructor = EV;

// 2-Implement a ‘chargeBattery’ method which takes an arguments ‘chargeTo’ and sets the
// battery charge to this value;

EV.prototype.chargeBattery = function (chargeTo) {
    this.charge = chargeTo;
};

// 3-Implement an ‘accelerate’ method that will increase the car’s speed by 20, and decrease
// the charge by 1% ,then log a message like this :
// ‘Tesla going at 149 km/h, with a charge of 22%’

EV.prototype.accelerate = function () {
    this.speed += 20;
    this.charge--;
    console.log(
        `${this.name} going at ${this.speed} KM/H, with a charge of ${this.charge}%`,
    );
};

EV.prototype.break = function () {
    this.speed -= 10;
    console.log(
        `${this.name} going at ${this.speed} KM/H, with a charge of ${this.charge}%`,
    );
};
// 4- Create an electric car object and experiment with calling ‘accelerate‘, ’brake’ and ‘chargeBattery’
// (charge to 90%). Notice what happens when you ‘ accelerate
// DATA CAR 1 :’ Tesla’ going at 120 km/h , with a charge of 23%

var ev = new EV('Tesla', 120, 20);

ev.chargeBattery(90);
ev.accelerate();
ev.accelerate();
ev.break();

console.log('======================');
