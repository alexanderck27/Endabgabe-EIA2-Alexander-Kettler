"use strict";
var Eisdiele;
(function (Eisdiele) {
    class Moveable {
        position; // Position des Objekts
        velocity; // Geschwindigkeit des Objekts
        constructor(position, velocity) {
            this.position = position; // Setze die Position
            this.velocity = velocity; // Setze die Geschwindigkeit
        }
        move() {
            this.position.x += this.velocity.x; // Bewege das Objekt in X-Richtung
            this.position.y += this.velocity.y; // Bewege das Objekt in Y-Richtung
        }
    }
    Eisdiele.Moveable = Moveable;
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=Moveable.js.map