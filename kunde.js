"use strict";
class Customer extends Moveable {
    order; // Bestellung
    mood; // Stimmung
    moodTimer; // Timer für Stimmung
    constructor(_position, _velocity) {
        super(_position, _velocity);
        this.order = this.generateOrder();
        this.mood = "happy"; // Initiale Stimmung
        this.moodTimer = 0; // Timer, um die Stimmung zu verfolgen
    }
    generateOrder() {
        let orderSize = getRandomInt(1, 3);
        let order = [];
        for (let i = 0; i < orderSize; i++) {
            let flavorIndex = getRandomInt(0, IceCream.flavors.length - 1);
            let flavor = IceCream.flavors[flavorIndex].flavor;
            let color = IceCream.flavors[flavorIndex].color;
            order.push(new IceCream(flavor, color));
        }
        return order;
    }
    updateMood() {
        this.moodTimer++;
        if (this.moodTimer > 300) { // Beispiel-Zeitspanne für Stimmungswechsel
            if (this.mood === "happy") {
                this.mood = "neutral";
            }
            else if (this.mood === "neutral") {
                this.mood = "angry";
            }
        }
    }
}
let crc2;
let allObjects = []; // Array für alle Objekte
class Smiley {
    draw(crc2) {
        // Gesicht
        crc2.beginPath();
        crc2.arc(150, 150, 50, 0, 2 * Math.PI);
        crc2.fillStyle = "yellow";
        crc2.fill();
        crc2.stroke();
        // Augen
        crc2.beginPath();
        crc2.arc(130, 135, 5, 0, 2 * Math.PI);
        crc2.fillStyle = "black";
        crc2.fill();
        // Mund
        crc2.beginPath();
        crc2.arc(150, 160, 25, 0, Math.PI);
        crc2.stroke();
    }
}
class Circle {
    draw(crc2) {
        crc2.beginPath();
        crc2.arc(100, 100, 50, 0, 2 * Math.PI);
        crc2.fillStyle = "black";
        crc2.fill();
    }
}
// Hinzufügen eines Smiley-Objekts zum Array und Zeichnen aller Objekte
allObjects.push(new Smiley());
// Funktion zum Zeichnen aller Objekte
function drawAll() {
    allObjects.forEach(obj => obj.draw(crc2));
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//# sourceMappingURL=kunde.js.map