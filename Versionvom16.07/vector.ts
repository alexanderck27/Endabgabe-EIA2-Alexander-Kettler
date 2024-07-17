namespace Eisdiele {
export class Vector {
    constructor(public x: number, public y: number) {}

    normalize(): Vector {
        const length = Math.sqrt(this.x * this.x + this.y * this.y);
        return new Vector(this.x / length, this.y / length);
    }

    scale(factor: number): Vector {
        return new Vector(this.x * factor, this.y * factor);
    }
}
}