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
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        }
    }
    Eisdiele.Moveable = Moveable;
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=Moveable.js.map