console.log('Part 1');

// 1- Using Constructor function to create Shape Base Abstract Class which contains color property
// And PrintColor method and CalcArea and calcPerimeter which will return Zero in Shape Base Class
// Define them on Shape prototype object Using Prototype',

function Shape(color) {
    if (this.constructor.name == 'Shape')
        throw new Error('Shape is abstract class');
    this.color = color;
}

Shape.prototype.printColor = function () {
    console.log(`Shape color is : ${this.color}`);
};

Shape.prototype.calcArea = function () {
    return 0;
};

Shape.prototype.calcPerimeter = function () {
    return 0;
};

// 2- Define Rect Class Which inherits from Shape Abstract Class Using Prototype
// inheritance Define Width and Height Properties for Rect Class

function Rect(color, width, height) {
    Shape.call(this, color);
    this.width = width;
    this.height = height;

    Rect.instancesCounter++;
}

Rect.prototype = Object.create(Shape);
Rect.prototype.constructor = Rect;

Rect.prototype.printColor = function () {
    console.log(`Rect color is : ${this.color}`);
};

Rect.prototype.calcArea = function () {
    return this.height * this.width;
};

Rect.prototype.calcPerimeter = function () {
    return 2 * this.height + 2 * this.width;
};

Rect.prototype.toString = function () {
    return `Rect with width : ${this.width} and height : ${this.height}`;
};

// 3- Define Square Class Which inherits from Rect Class - override CalcArea ,
// calcPerimeter , printColor , toString which will display color , area and perimeter in rect
// and square classes

function Square(color, width) {
    Rect.call(this, color, width, width);
    Square.instancesCounter++;
}

Square.prototype = Object.create(Rect);
Square.prototype.constructor = Square;

Square.prototype.printColor = function () {
    console.log(`Square color is : ${this.color}`);
};

Square.prototype.calcArea = function () {
    return this.width * this.width;
};

Square.prototype.calcPerimeter = function () {
    return 4 * this.width;
};

Square.prototype.toString = function () {
    return `Square with width : ${this.width}`;
};

// 5- Define static property and static method like following case for Rect and Square classes
// to get number of objects created from rect and square Types

Rect.instancesCounter = 0;

Rect.getInstancesCount = function () {
    return Rect.instancesCounter;
};

Square.instancesCounter = 0;

Square.getInstancesCount = function () {
    return Square.instancesCounter;
};

// 4- create array object which will contains set of objects from rect and square classes then
// display it’s areas

var shapes = [];

shapes.push(new Rect('Blue', 30, 10));
shapes.push(new Square('Red', 20));
shapes.push(new Rect('Yellow', 20, 10));
shapes.push(new Square('Green', 10));

console.log(shapes);

shapes.forEach(function (shape) {
    console.log(shape.toString() + ' Area : ' + shape.calcArea());
});

console.log(
    `Number of objects created from Rect class : ${Rect.getInstancesCount()}`,
);

console.log(
    `Number of objects created from Square class : ${Square.getInstancesCount()}`,
);

console.log("======================")