import Rect from './modules/Rect.js';
import Square from './modules/Square.js';
import Car from './modules/Car.js';
import EV from './modules/EV.js';

var shapes = [];

shapes.push(new Rect('Blue', 30, 10));
shapes.push(new Square('Red', 20));
shapes.push(new Rect('Yellow', 20, 10));
shapes.push(new Square('Green', 10));

console.log(shapes);

console.log(
    `Number of objects created from Rect class : ${Rect.getInstancesCount()}`,
);

console.log(
    `Number of objects created from Square class : ${Square.getInstancesCount()}`,
);

var car1 = new Car('BMW', 120);
var car2 = new Car('Mercedes', 95);

Car.getCreatedCarsInfo();

car1.accelerate();
car1.break();
car1.break();

car2.accelerate();
car2.accelerate();
car2.break();

var ev = new EV('Tesla', 120, 20);

ev.chargeBattery(90);
ev.accelerate();
ev.accelerate();
ev.break();