"use strict";
// Remove the unused namespace declaration
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSmileyAnimation = exports.Smiley = exports.Moveable = void 0;
class Moveable {
    position; // Position
    velocity; // Geschwindigkeit
    constructor(position, velocity) {
        this.position = position; // Position setzen
        this.velocity = velocity; // Geschwindigkeit setzen
    }
    move() {
        this.position.add(this.velocity); // Position um Geschwindigkeit erhöhen
    }
}
exports.Moveable = Moveable;
class Smiley extends Moveable {
    radius = 20; // Größe des Smileys
    constructor(position, velocity) {
        super(position, velocity);
    }
    draw(crc2) {
        crc2.beginPath();
        crc2.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        crc2.fillStyle = "yellow";
        crc2.fill();
    }
}
exports.Smiley = Smiley;
let smileys = [];
const canvasWidth = 800; // Breite des Canvas, anpassen
const canvasCenterX = canvasWidth / 2;
const startY = 100; // Startposition Y, anpassen
function startSmileyAnimation(crc2) {
    setInterval(() => {
        let startPosition = new Vector(canvasWidth, startY); // Startposition rechts
        let velocity = new Vector(-2, 0); // Bewegung nach links
        let newSmiley = new Smiley(startPosition, velocity); // Neuer Smiley
        smileys.push(newSmiley); // Hinzufügen zum Array
    }, 10000); // Intervall 10 Sekunden
    function update() {
        smileys.forEach(smiley => {
            if (smiley.position.x > canvasCenterX || smileys.indexOf(smiley) === smileys.length - 1) { // Wenn Smiley rechts oder letzter Smiley
                smiley.move(); // Bewegen
            }
        });
        draw(crc2); // Zeichnen
        requestAnimationFrame(update); // Nächster Frame
    }
    function draw(crc2) {
        crc2.clearRect(0, 0, crc2.canvas.width, crc2.canvas.height); // Canvas bereinigen 
        smileys.forEach(smiley => {
            smiley.draw(crc2); // Smiley zeichnen
        });
    }
    update(); // Startet die Update-Schleife
}
exports.startSmileyAnimation = startSmileyAnimation;
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