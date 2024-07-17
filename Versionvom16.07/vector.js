"use strict";
var Eisdiele;
(function (Eisdiele) {
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
    Eisdiele.Vector = Vector;
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=vector.js.map