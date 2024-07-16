"use strict";
var Eisdiele;
(function (Eisdiele) {
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
    Eisdiele.Moveable = Moveable;
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
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=Moveable.js.map