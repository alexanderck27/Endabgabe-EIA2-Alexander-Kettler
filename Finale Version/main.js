"use strict";
var Eisdiele;
(function (Eisdiele) {
    let crc2;
    let allCustomers = [];
    let totalEarnings = 0;
    let spawnInterval = 10000; // Initiale Spawn-Zeit von 10000 ms
    document.addEventListener("DOMContentLoaded", () => {
        const canvas = document.getElementById("myCanvas");
        crc2 = canvas.getContext("2d");
        Eisdiele.drawBackground(crc2); // Korrekte Referenz auf drawBackground
        startGame();
        canvas.addEventListener("click", handleCanvasClick); // Event-Handler für Klicks auf den Canvas
    });
    // Spiel starten
    function startGame() {
        setInterval(gameLoop, 1000 / 40); // 40 FPS Game Loop
        spawnCustomer(); // Initialer Kunden-Spawn
    }
    // Game Loop
    function gameLoop() {
        crc2.clearRect(0, 0, crc2.canvas.width, crc2.canvas.height); // canvas leeren
        Eisdiele.drawBackground(crc2); // Hintergrund zeichnen
        updateCustomers(); // Smiley zeichnen
    }
    // Neue Smileys spawnen
    function spawnCustomer() {
        const newCustomer = new Eisdiele.Kunde({ x: crc2.canvas.width, y: crc2.canvas.height / 2 }, { x: 10, y: 0 }, crc2.canvas.width, crc2.canvas.height); // Startet rechts
        allCustomers.push(newCustomer); // Fügt den Kunden zur Liste hinzu
        newCustomer.draw(crc2); // Zeichne den Kunden
        // Reduziere die Spawn-Zeit um 20 ms, aber nicht weniger als 500 ms
        spawnInterval = Math.max(spawnInterval - 400, 500); // Geschwindigkeit hier einstellen
        // Setze den Timer für den nächsten Kunden-Spawn
        setTimeout(spawnCustomer, spawnInterval);
    }
    function updateCustomers() {
        for (const customer of allCustomers) { // Schleife über alle Kunden
            customer.update(allCustomers); // Update den Kunden
            customer.draw(crc2); // Zeichne den Kunden
        }
    }
    function handleCanvasClick(event) {
        const canvas = event.target; // Canvas-Element, auf das geklickt wurde
        const x = event.clientX - canvas.offsetLeft; // X-Position des Klicks
        const y = event.clientY - canvas.offsetTop; // Y-Position des Klicks
        for (const customer of allCustomers) { // Überprüft, ob ein Kunde an der geklickten Position ist
            if (isCustomerClicked(customer, x, y) && customer.getState() !== "waiting") { // Wenn ja, ändere den Zustand des Kunden außer er wartet
                if (customer.getState() === "waiting") {
                    customer.setState("ordering");
                    customer.generateOrder(); // Generiere eine Bestellung
                }
                else if (customer.getState() === "ordering") {
                    customer.setState("seating");
                }
                else if (customer.getState() === "eating") {
                    customer.setState("paying");
                }
                else if (customer.getState() === "paying") {
                    totalEarnings += customer.getOrder().length; // erhöhe die Einnahmen um die Anzahl der Bestellungen
                    customer.setState("leaving");
                }
            }
        }
    }
    function isCustomerClicked(customer, x, y) {
        const dx = customer.getPosition().x - x; // (z.B. um den Bestellvorgang zu starten)
        const dy = customer.getPosition().y - y; // oder um zu bezahlen
        return dx * dx + dy * dy <= 50 * 50; // Kunden haben einen Radius von 50
    }
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=main.js.map