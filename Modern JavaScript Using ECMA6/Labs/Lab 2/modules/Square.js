import Rect from './Rect.js';

export default class Square extends Rect {
    static instancesCount=0;
    constructor(color, width) {
        super(color, width, width);
        Square.instancesCount++;
    }

    printColor() {
        console.log(`this square color is ${this.color}`);
    }

    calcArea() {
        return this.width * this.width;
    }

    calcPerimeter() {
        return 4 * this.width;
    }

    toString() {
        return `Square => color : ${this.color} - perimeter : ${this.calcPerimeter()} - area : ${this.calcArea()}`;
    }

    static getInstancesCount = function () {
        return Square.instancesCount;
    };
    
}
