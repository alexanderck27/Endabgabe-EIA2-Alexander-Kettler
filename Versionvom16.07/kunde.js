"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Eisdiele;
(function (Eisdiele) {
    Eisdiele.allObjects = []; // Array für alle Objekte
    class Smiley {
        color = "blue"; // Startfarbe als Beispiel
        draw(crc2) {
            // Gesicht
            crc2.beginPath();
            crc2.arc(150, 150, 50, 0, 2 * Math.PI);
            crc2.fillStyle = this.color;
            crc2.fill();
            crc2.stroke();
            // Augen
            crc2.beginPath();
            crc2.arc(130, 135, 5, 0, 2 * Math.PI);
            crc2.arc(170, 135, 5, 0, 2 * Math.PI);
            crc2.fillStyle = "black";
            crc2.fill();
            // Mund
            crc2.beginPath();
            crc2.arc(150, 160, 25, 0, Math.PI);
            crc2.stroke();
        }
        changeColor() {
            this.color = this.color === "blue" ? "red" : "blue";
        }
    }
    Eisdiele.Smiley = Smiley;
    // Hinzufügen eines Smiley-Objekts zum Array
    Eisdiele.allObjects.push(new Smiley());
    function drawAll() {
        Eisdiele.crc2.clearRect(0, 0, Eisdiele.crc2.canvas.width, Eisdiele.crc2.canvas.height); // Canvas bereinigen
        Eisdiele.allObjects.forEach(obj => obj.draw(Eisdiele.crc2));
    }
    Eisdiele.drawAll = drawAll;
    // Farbwechsel alle 10 Sekunden
    setInterval(() => {
        Eisdiele.allObjects.forEach(obj => {
            if (obj instanceof Smiley) {
                obj.changeColor();
            }
        });
        drawAll();
    }, 10000);
    // Klick-Ereignis, um die Farbe auf Grün zurückzusetzen
    document.addEventListener("click", () => {
        Eisdiele.allObjects.forEach(obj => {
            if (obj instanceof Smiley) {
                obj.color = "green";
            }
        });
        drawAll();
    });
    // Initialzeichnung
    document.addEventListener("DOMContentLoaded", () => {
        const canvas = document.getElementById("myCanvas");
        Eisdiele.crc2 = canvas.getContext("2d");
        drawAll();
    });
    class Customer extends moveable_1.Moveable {
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
// Die Implementierung von Moveable und Vector importieren und benutzen
const moveable_1 = require("./moveable");
// Zusätzliche Klassen, falls notwendig
class Circle {
    draw(crc2) {
        crc2.beginPath();
        crc2.arc(100, 100, 50, 0, 2 * Math.PI);
        crc2.fillStyle = "black";
        crc2.fill();
    }
}
// Hinzufügen eines Circle-Objekts zum Array und Zeichnen aller Objekte
Eisdiele.allObjects.push(new Circle());
//# sourceMappingURL=kunde.js.map