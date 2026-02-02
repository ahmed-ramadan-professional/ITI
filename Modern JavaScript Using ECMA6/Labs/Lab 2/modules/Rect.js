import Shape from './Shape.js';

export default class Rect extends Shape {
    #width;
    #height;
    static instancesCount=0;

    constructor(color, width, height) {
        super(color);
        this.width = width;
        this.height = height;
        Rect.instancesCount++;
    }

    set width(width) {
        if (width <= 0)
            throw new Error("Rect width can't be less or equal to zero");
        this.#width = width;
    }

    get width() {
        return this.#width;
    }

    set height(height) {
        if (height <= 0)
            throw new Error("Rect height can't be less or equal to zero");
        this.#height = height;
    }

    get height() {
        return this.#height;
    }

    printColor() {
        console.log(`this rect color is ${this.color}`);
    }

    calcArea() {
        return this.width * this.height;
    }

    calcPerimeter() {
        return 2 * this.width + 2 * this.height;
    }

    toString() {
        return `Rect => color : ${this.color} - perimeter : ${this.calcPerimeter()} - area : ${this.calcArea()}`;
    }

    static getInstancesCount = function () {
        return Rect.instancesCount;
    };
}
