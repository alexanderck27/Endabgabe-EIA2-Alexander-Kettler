"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawBackground = exports.allObjects = exports.crc2 = void 0;
exports.allObjects = [];
function drawBackground() {
    exports.crc2.save();
    exports.crc2.fillStyle = "#b3d9ff"; // Himmelblau
    exports.crc2.fillRect(0, 0, 1920, 1080);
    exports.crc2.restore();
    drawIceCreamParlor();
}
exports.drawBackground = drawBackground;
function drawIceCreamParlor() {
    // Zeichnen der Theke
    exports.crc2.save();
    exports.crc2.fillStyle = "#8B4513"; // Braun
    exports.crc2.fillRect(150, 100, 300, 350);
    exports.crc2.restore();
    // Zeichnen des Tresens
    exports.crc2.save();
    exports.crc2.fillStyle = "#d2b48c"; // Hellbraun
    exports.crc2.fillRect(160, 110, 280, 330);
    exports.crc2.restore();
    // Zeichnen von Eisbehältern
    const behälterPositionen = [
        { x: 170, y: 120 }, { x: 230, y: 120 },
        { x: 230, y: 180 }, { x: 230, y: 240 },
        { x: 170, y: 180 }, { x: 170, y: 240 },
    ];
    behälterPositionen.forEach(pos => {
        exports.crc2.save();
        exports.crc2.fillStyle = "black";
        exports.crc2.fillRect(pos.x, pos.y, 50, 50);
        exports.crc2.restore();
    });
    drawChairs();
}
function drawChairs() {
    const chairPositions = [
        new Chair(new Vector(425, 420), 0),
        new Chair(new Vector(400, 340), 120),
        new Chair(new Vector(520, 380), 240),
        new Chair(new Vector(415, 155), 0),
        new Chair(new Vector(410, 50), 120),
        new Chair(new Vector(500, 100), 240),
        new Chair(new Vector(705, 520), 300),
        new Chair(new Vector(620, 450), 90),
        new Chair(new Vector(710, 430), 200),
        new Chair(new Vector(655, 180), 330),
        new Chair(new Vector(600, 100), 90),
        new Chair(new Vector(700, 90), 220)
    ];
    chairPositions.forEach(chair => {
        chair.draw();
    });
}
//# sourceMappingURL=drawables.js.map