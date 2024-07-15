"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Moveable = void 0;
class Moveable {
    position;
    velocity;
    constructor(position, velocity) {
        this.position = position;
        this.velocity = velocity;
    }
    move() {
        this.position.add(this.velocity);
    }
}
exports.Moveable = Moveable;
class Vector {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(other) {
        this.x += other.x;
        this.y += other.y;
    }
}
//# sourceMappingURL=Moveable.js.map