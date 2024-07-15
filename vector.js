"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector = void 0;
class Vector {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    normalize() {
        const length = Math.sqrt(this.x * this.x + this.y * this.y);
        return new Vector(this.x / length, this.y / length);
    }
    scale(factor) {
        return new Vector(this.x * factor, this.y * factor);
    }
}
exports.Vector = Vector;
//# sourceMappingURL=vector.js.map