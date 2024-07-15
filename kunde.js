"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = exports.CustomerType = void 0;
const drawables_1 = require("../drawables");
var CustomerType;
(function (CustomerType) {
    CustomerType[CustomerType["Normal"] = 0] = "Normal";
    CustomerType[CustomerType["VIP"] = 1] = "VIP";
})(CustomerType || (exports.CustomerType = CustomerType = {}));
class Customer extends drawables_1.Drawable {
    position;
    speed;
    direction;
    type;
    mood;
    constructor(position, speed, direction, type, mood) {
        super(position);
        this.position = position;
        this.speed = speed;
        this.direction = direction;
        this.type = type;
        this.mood = mood;
    }
    update() {
        // Update Logik für den Kunden
    }
    draw() {
        // Zeichnen des Kunden
        crc2.save();
        crc2.fillStyle = "blue"; // Beispiel Farbe
        crc2.beginPath();
        crc2.arc(this.position.x, this.position.y, 20, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();
    }
}
exports.Customer = Customer;
//# sourceMappingURL=kunde.js.map