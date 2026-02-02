import Shape from './Shape.js';

export default class Circle extends Shape {
    #radius;
    #x;
    #y;

    constructor(color, radius, x, y) {
        super(color);
        this.radius = radius;
        this.x = x;
        this.y = y;
    }

    set radius(radius) {
        this.#radius = radius;
    }

    get radius() {
        return this.#radius;
    }

    set x(x) {
        this.#x = x;
    }

    get x() {
        return this.#x;
    }

    set y(y) {
        this.#y = y;
    }

    get y() {
        return this.#y;
    }

    printColor() {
        console.log(`this circle color is ${this.color}`);
    }

    calcArea() {
        return 3.14 * this.radius * this.radius;
    }

    calcPerimeter() {
        return 2 * 3.14 * this.radius;
    }

    toString() {
        return `Circle => color : ${this.color} - perimeter : ${this.calcPerimeter()} - area : ${this.calcArea()}`;
    }
}
