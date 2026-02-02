import Car from './Car.js';

export default class EV extends Car {
    #charge;
    constructor(name, speed, charge) {
        super(name, speed);
        this.#charge = charge;
    }

    chargeBattery(chargeTo) {
        this.#charge = chargeTo;
    }

    accelerate() {
        this.speed += 20;
        this.#charge--;
        console.log(
            `${this.name} going at ${this.speed} KM/H, with a charge of ${this.#charge}%`,
        );
    }

    break() {
        this.speed -= 10;
        console.log(
            `${this.name} going at ${this.speed} KM/H, with a charge of ${this.#charge}%`,
        );
    }
}
