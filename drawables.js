"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawBackground = exports.allObjects = exports.crc2 = void 0;
exports.allObjects = []; // Array für alle Objekte
function drawBackground(crc2) {
    crc2.save(); // Speichern des aktuellen Zustands
    const size = 50; // Größe eines Karos
    const rows = Math.ceil(crc2.canvas.height / size); // Anzahl der Reihen
    const cols = Math.ceil(crc2.canvas.width / size); // Anzahl der Spalten
    for (let row = 0; row < rows; row++) { // Schleife über alle Reihen
        for (let col = 0; col < cols; col++) { // Schleife über alle Spalten
            crc2.fillStyle = (row + col) % 2 === 0 ? "#ffffff" : "#000000"; // Wechsel zwischen Schwarz und Weiß
            crc2.fillRect(col * size, row * size, size, size); // Zeichnen eines Quadrats
        }
    }
    crc2.restore(); // Wiederherstellen des gespeicherten Zustands
    drawIceCreamParlor(); // Eisladen zeichnen
}
exports.drawBackground = drawBackground;
function drawIceCreamParlor() {
    // Zeichnen der Theke
    exports.crc2.save(); // Speichern des aktuellen Zustands
    exports.crc2.fillStyle = "#8B4513"; // Braun
    exports.crc2.fillRect(150, 100, 300, 350); // Theke
    exports.crc2.restore(); // Wiederherstellen des gespeicherten Zustands
    // Zeichnen des Tresens
    exports.crc2.save(); // Speichern des aktuellen Zustands
    exports.crc2.fillStyle = "#d2b48c"; // Hellbraun
    exports.crc2.fillRect(160, 110, 280, 330); // Tresen
    exports.crc2.restore(); // Wiederherstellen des gespeicherten Zustands
    const behälterPositionen = [
        { x: 170, y: 240 }, { x: 230, y: 240 },
        { x: 290, y: 240 } // Hinzugefügte fehlende Position für Konsistenz
    ];
    behälterPositionen.forEach(pos => {
        exports.crc2.save();
        exports.crc2.fillStyle = "black";
        exports.crc2.fillRect(pos.x, pos.y, 50, 50);
        exports.crc2.restore();
    });
}
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("myCanvas");
    exports.crc2 = canvas.getContext("2d");
    drawScene();
});
function drawScene() {
    drawBackground(exports.crc2);
    // Zeichnen aller Objekte
    for (const obj of exports.allObjects) {
        obj.draw(exports.crc2);
    }
}
//# sourceMappingURL=drawables.js.map