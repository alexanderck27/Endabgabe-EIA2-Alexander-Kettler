"use strict";
var Eisdiele;
(function (Eisdiele) {
    class Customer extends Eisdiele.Moveable {
        order; // Bestellung
        mood; // Stimmung
        moodTimer; // Timer für Stimmung
        constructor(_position, _velocity) {
            super(_position, _velocity); // Aufruf des Konstruktors der Elternklasse
            this.order = this.generateOrder(); // Bestellung generieren
            this.mood = "happy"; // Initiale Stimmung
            this.moodTimer = 0; // Timer, um die Stimmung zu verfolgen
        }
        generateOrder() {
            let orderSize = getRandomInt(1, 3); // Zufällige Anzahl von Kugeln 
            let order = []; // Array für die Bestellung
            for (let i = 0; i < orderSize; i++) { // Schleife über die Anzahl der Kugeln
                let flavorIndex = getRandomInt(0, IceCream.flavors.length - 1); // Zufälliger Index für Geschmack
                let flavor = IceCream.flavors[flavorIndex].flavor; // Geschmack
                let color = IceCream.flavors[flavorIndex].color; // Farbe 
                order.push(new IceCream(flavor, color)); // Kugel hinzufügen
            }
            return order;
        }
        updateMood() {
            this.moodTimer++; // Timer erhöhen
            if (this.moodTimer > 300) { // Beispiel-Zeitspanne für Stimmungswechsel
                if (this.mood === "happy") { // Wenn die Stimmung glücklich ist
                    this.mood = "neutral"; // Stimmung auf neutral setzen
                }
                else if (this.mood === "neutral") { // Wenn die Stimmung neutral ist
                    this.mood = "angry"; // Stimmung auf wütend setzen
                }
            }
        }
    }
    Eisdiele.Customer = Customer;
    class IceCream {
        static flavors = [{ flavor: "Vanilla", color: "Yellow" }, { flavor: "Chocolate", color: "Brown" }]; // Geschmacksrichtungen
        flavor; // Geschmack
        color; // Farbe
        constructor(flavor, color) {
            this.flavor = flavor; // Geschmack setzen
            this.color = color; // Farbe setzen
        }
    }
    Eisdiele.IceCream = IceCream;
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    Eisdiele.getRandomInt = getRandomInt;
})(Eisdiele || (Eisdiele = {}));
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
    return Math.floor(Math.random() * (max - min + 1)) + min; // Der maximale Wert ist inklusive, der minimale nicht
}
//# sourceMappingURL=kunde.js.map