"use strict";
var Eisdiele;
(function (Eisdiele) {
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
    Eisdiele.drawBackground = drawBackground;
    function drawIceCreamParlor() {
        // Zeichnen der Theke
        Eisdiele.crc2.save(); // Speichern des aktuellen Zustands
        Eisdiele.crc2.fillStyle = "#8B4513"; // Braun
        // Setzen der Rahmenbreite
        const borderWidth = 80; // Dicke des Rahmens
        // Setzen der Rahmenfarbe
        Eisdiele.crc2.strokeStyle = "grey"; // Farbe des Rahmens
        // Setzen der Linienbreite
        Eisdiele.crc2.lineWidth = borderWidth;
        // Zeichnen des Rahmens
        Eisdiele.crc2.strokeRect(0, 0, Eisdiele.crc2.canvas.width, Eisdiele.crc2.canvas.height);
        Eisdiele.crc2.fillRect(800, 100, 300, 650); // Theke
        Eisdiele.crc2.restore(); // Wiederherstellen des gespeicherten Zustands
        // Zeichnen des Tresens
        Eisdiele.crc2.save(); // Speichern des aktuellen Zustands
        Eisdiele.crc2.fillStyle = "#d2b48c"; // Hellbraun
        Eisdiele.crc2.fillRect(810, 110, 280, 630); // Tresen
        Eisdiele.crc2.restore(); // Wiederherstellen des gespeicherten Zustands
        // Zeichnen des Hintergrunds für Bestellauswahl
        Eisdiele.crc2.save(); // Speichern des aktuellen Zustands
        Eisdiele.crc2.fillStyle = "blue"; // Blau
        Eisdiele.crc2.fillRect(110, 60, 500, 870); // Hintergrund
        Eisdiele.crc2.restore(); // Wiederherstellen des gespeicherten Zustands
        // Kasten für "Bestellung" zeichnen
        Eisdiele.crc2.save(); // Speichern des aktuellen Zustands
        Eisdiele.crc2.fillStyle = "red"; // Helle Hintergrundfarbe für den Kasten
        Eisdiele.crc2.fillRect(150, 100, 410, 50); // Position und Größe des Kastens
        Eisdiele.crc2.fillStyle = "#000000"; // Textfarbe
        Eisdiele.crc2.font = "35px 'Brush Script MT'"; // Schriftart und -größe
        Eisdiele.crc2.fillText("Bestellung", 310, 130); // Text und Position
        Eisdiele.crc2.restore(); // Wiederherstellen des gespeicherten Zustands
        // Startposition des Grids mit Abstand zum Rand
        const gridStartX = 150; //Pixel vom linken Rand
        const gridStartY = 190; //Pixel vom oberen Rand
        // Größe jedes Kästchens
        const boxWidth = 200;
        const boxHeight = 200;
        // Abstand zwischen den Kästchen
        const boxMargin = 10;
        // Zeichnen des 2x3 Grids
        for (let row = 0; row < 3; row++) { // Für jede Zeile
            for (let col = 0; col < 2; col++) { // Für jede Spalte
                const x = gridStartX + col * (boxWidth + boxMargin); // Berechnung der x-Position
                const y = gridStartY + row * (boxHeight + boxMargin); // Berechnung der y-Position
                Eisdiele.crc2.save(); // Speichern des aktuellen Zustands
                Eisdiele.crc2.fillStyle = "red"; // Farbe der Kästchen
                Eisdiele.crc2.fillRect(x, y, boxWidth, boxHeight); // Zeichnen des Kästchens
                Eisdiele.crc2.restore(); // Wiederherstellen des gespeicherten Zustands
            }
        }
        // Position der Buttons unterhalb des Grids
        const buttonsY = gridStartY + 3 * (boxHeight + boxMargin) + 20; // Unterhalb des Grids mit 20px Abstand
        const buttonWidth = 100; // Breite der Buttons
        const buttonHeight = 50; // Höhe der Buttons
        // Button 1: Haken, Bestätigung
        Eisdiele.crc2.save();
        Eisdiele.crc2.fillStyle = "#4CAF50"; // Grüne Farbe für den Haken-Button
        Eisdiele.crc2.fillRect(250, buttonsY, buttonWidth, buttonHeight); // Zeichnen des Buttons
        Eisdiele.crc2.fillStyle = "#FFFFFF"; // Weiße Farbe für den Text
        Eisdiele.crc2.font = "30px Arial"; // Schriftart und -größe
        Eisdiele.crc2.fillText("✓", 285, buttonsY + 35); // Position des Haken-Symbols zentriert im Button
        Eisdiele.crc2.restore();
        // Button 2: X, für Abbruch
        Eisdiele.crc2.save();
        Eisdiele.crc2.fillStyle = "#F44336"; // Rote Farbe für den X-Button
        Eisdiele.crc2.fillRect(370, buttonsY, buttonWidth, buttonHeight); // Zeichnen des Buttons
        Eisdiele.crc2.fillStyle = "#FFFFFF"; // Weiße Farbe für den Text
        Eisdiele.crc2.font = "30px Arial"; // Schriftart und -größe
        Eisdiele.crc2.fillText("✗", 405, buttonsY + 35); // Position des X-Symbols zentriert im Button
        Eisdiele.crc2.restore();
    }
    document.addEventListener("DOMContentLoaded", () => {
        const canvas = document.getElementById("myCanvas"); // Canvas-Element
        Eisdiele.crc2 = canvas.getContext("2d"); // 2D-Kontext des Canvas-Elements
        drawScene(); // Szene zeichnen
    });
    function drawScene() {
        drawBackground(Eisdiele.crc2); // Hintergrund zeichnen
        // Zeichnen aller Objekte
        for (const obj of Eisdiele.allObjects) { // Schleife über alle Objekte
            obj.draw(); // Objekt zeichnen
        }
    }
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=drawables.js.map