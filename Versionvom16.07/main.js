"use strict";
var Eisdiele;
(function (Eisdiele) {
    window.addEventListener("load", handleLoad);
    Eisdiele.allObjects = [];
    function handleLoad(_event) {
        const canvas = document.querySelector("#myCanvas");
        if (!canvas)
            return;
        Eisdiele.crc2 = canvas.getContext("2d");
        canvas.addEventListener("click", handleClick);
        generateContent();
        drawBackground();
        setInterval(animate, 40);
    }
    function generateContent() {
        // Implementierung der Logik zur Inhaltsinitialisierung
    }
    function animate() {
        drawBackground(); // Hintergrund zeichnen
        for (let object of Eisdiele.allObjects) { // Schleife über alle Objekte
            object.update(); // Objekt updaten
            object.draw(); // Objekt zeichnen
        }
    }
    function handleClick(_event) {
        console.log("canvas is clicked"); // Konsolenausgabe 
    }
    function drawBackground() {
        // Implementierung der Logik zum Zeichnen des Hintergrunds
    }
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=main.js.map