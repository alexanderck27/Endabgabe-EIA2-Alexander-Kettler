
namespace Eisdiele {
export class Moveable {
    position: Vector;
    velocity: Vector;

    constructor(position: Vector, velocity: Vector) {
        this.position = position;
        this.velocity = velocity;
    }

    move(): void {
        this.position.add(this.velocity);
    }
}

class Vector {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(other: Vector): void {
        this.x += other.x;
        this.y += other.y;
    }
}
}
