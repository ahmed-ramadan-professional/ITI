export default class Car {
    #serialID;
    #name;
    #speed;
    static carsSerials = [];

    constructor(name, speed) {
        this.#serialID =
            Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
        this.#name = name;
        this.#speed = speed;
        Car.carsSerials.push(this.#serialID);
    }

    set name(name) {
        this.#name = name;
    }

    get name() {
        return this.#name;
    }

    set speed(speed) {
        this.#speed = speed;
    }

    get speed() {
        return this.#speed;
    }

    accelerate() {
        this.#speed += 10;
        console.log(`${this.#name} - Current Speed : ${this.#speed} KM/H`);
    }

    break() {
        this.#speed -= 5;
        console.log(`${this.#name} - Current Speed : ${this.#speed} KM/H`);
    }

    static getCreatedCarsInfo() {
        console.log(
            `Number of cars created : ${Car.carsSerials.length} and their serial IDs are : ${Car.carsSerials}`,
        );
    }
}
