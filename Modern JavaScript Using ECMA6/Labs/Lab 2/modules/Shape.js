export default class Shape {
    #color;

    constructor(color) {
        if (this.constructor.name == 'Shape')
            throw new Error("Abstract class can't be instantiated");
        this.color = color;
    }

    set color(color) {
        this.#color = color;
    }

    get color() {
        return this.#color;
    }

    printColor() {
        console.log(`this shape color is ${this.color}`);
    }

    calcArea() {
        return 0;
    }

    calcPerimeter() {
        return 0;
    }

    
}
