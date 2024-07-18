"use strict";
var Eisdiele;
(function (Eisdiele) {
    class Kunde extends Eisdiele.Moveable {
        canvasWidth;
        canvasHeight;
        order = []; // Bestellung des Kunden
        waitingTime = 0; // Wartezeit des Kunden
        state = "entering"; // Zustand des Kunden
        smileyColor = "green"; // Farbe des Smileys
        target; // Ziel des Kunden
        static customerQueue = []; // Warteschlange für Kunden
        moodInterval; // Timer für den Stimmungswechsel
        hasGeneratedOrder = false; // Flag um zu prüfen, ob die Bestellung generiert wurde
        static selectedOrder = []; // Temporäre Bestellung, die vom Benutzer ausgewählt wird
        static orderConfirmed = false; // Flag, um zu prüfen, ob die Bestellung bestätigt wurde
        constructor(position, velocity, canvasWidth, canvasHeight) {
            super(position, velocity);
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.target = { x: canvasWidth / 1.7, y: canvasHeight / 2 };
            Kunde.customerQueue.push(this);
            this.startMoodTimer(); // Starte den Timer für den Stimmungswechsel
        }
        draw(crc2) {
            crc2.save();
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, 50, 0, 2 * Math.PI); // Kopf
            crc2.fillStyle = this.smileyColor; // Smiley-Farbe
            crc2.fill(); // Kopf füllen
            crc2.stroke();
            crc2.closePath();
            crc2.beginPath();
            crc2.arc(this.position.x - 15, this.position.y - 10, 5, 0, 2 * Math.PI); // Linkes Auge
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.closePath();
            crc2.beginPath();
            crc2.arc(this.position.x + 15, this.position.y - 10, 5, 0, 2 * Math.PI); // Rechtes Auge
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.closePath();
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y + 10, 20, 0, Math.PI, false); // Lächelnder Mund
            crc2.strokeStyle = "black";
            crc2.stroke();
            crc2.closePath();
            crc2.restore();
            if (this.state === "waiting") {
                this.drawOrder(crc2); // Zeichne die Bestellung, wenn der Kunde wartet
            }
            // Zeichne die temporäre Bestellung im Grid
            this.drawSelectedOrder(crc2);
        }
        drawOrder(crc2) {
            const startX = 150;
            const startY = 190 + (2 * (200 + 10)); // Von unten anfangen zu zeichnen
            const rectWidth = 200;
            const rectHeight = 200;
            const spacing = 10;
            crc2.save();
            for (let i = 0; i < this.order.length; i++) { // Schleife über alle Bestellungen
                const color = this.order[i]; // Farbe des Eises
                const x = startX; // X-Position des Rechtecks
                const y = startY - i * (rectHeight + spacing); // Y-Position des Rechtecks, von unten nach oben
                crc2.fillStyle = color; // Farbe des Eises
                crc2.fillRect(x, y, rectWidth, rectHeight); // Rechteck füllen      
                crc2.strokeStyle = "black"; // Randfarbe
                crc2.lineWidth = 2; // Linienbreite
                crc2.strokeRect(x, y, rectWidth, rectHeight); // Rechteck
                crc2.fillStyle = "black"; // Text im Bestellfeld
                crc2.font = "35px 'Brush Script MT'"; // Schriftgröße und -art
                let label = "";
                switch (color) {
                    case "#FFC0CB":
                        label = "Himbeere";
                        break;
                    case "#FFD700":
                        label = "Mango";
                        break;
                    case "#ADD8E6":
                        label = "Blaubeere";
                        break;
                    case "#90EE90":
                        label = "Pistazie";
                        break;
                }
                crc2.fillText(label, x + rectWidth / 4, y + rectHeight / 2);
            }
            crc2.restore();
        }
        drawSelectedOrder(crc2) {
            const startX = 360; // Start X für die rechte Spalte
            const startY = 190 + 2 * (200 + 10); // Von unten anfangen zu zeichnen
            const rectWidth = 200;
            const rectHeight = 200;
            const spacing = 10;
            crc2.save();
            for (let i = 0; i < Kunde.selectedOrder.length; i++) {
                const color = Kunde.selectedOrder[i];
                const x = startX;
                const y = startY - i * (rectHeight + spacing);
                crc2.fillStyle = color;
                crc2.fillRect(x, y, rectWidth, rectHeight);
                crc2.strokeStyle = "black";
                crc2.lineWidth = 2;
                crc2.strokeRect(x, y, rectWidth, rectHeight);
            }
            crc2.restore();
        }
        update(allCustomers) {
            if (this.state === "entering" || this.state === "seating" || this.state === "leaving" || (this.state === "paying" && this.position.x !== this.target.x && this.position.y !== this.target.y)) {
                this.moveTowardsTarget(allCustomers);
            }
            this.updateSmiley();
            // Überprüfe, ob die Bestellung bestätigt wurde und ändere den Zustand entsprechend
            if (this.state === "waiting" && Kunde.orderConfirmed) {
                this.setState("seating");
                Kunde.orderConfirmed = false;
                Kunde.selectedOrder = [];
            }
        }
        moveTowardsTarget(allCustomers) {
            const dx = this.target.x - this.position.x;
            const dy = this.target.y - this.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance > 1) {
                this.position.x += (dx / distance) * this.velocity.x;
                this.position.y += (dy / distance) * this.velocity.y;
            }
            else {
                this.velocity.x = 0;
                this.velocity.y = 0;
                if (this.state === "entering" && !this.hasGeneratedOrder) {
                    this.state = "waiting";
                    this.generateOrder();
                    this.hasGeneratedOrder = true;
                }
                else if (this.state === "seating") {
                    this.state = "eating";
                    setTimeout(() => this.setState("paying"), 20000); // 20 Sekunden essen
                }
                else if (this.state === "paying") {
                    // Bleibt im Zustand "paying" und wartet auf Klick
                }
                else if (this.state === "leaving") {
                    const index = allCustomers.indexOf(this);
                    if (index > -1) {
                        allCustomers.splice(index, 1);
                    }
                    this.stopMoodTimer();
                }
            }
        }
        updateSmiley() {
            if (this.waitingTime >= 10) {
                this.smileyColor = "red";
            }
            else if (this.waitingTime >= 5) {
                this.smileyColor = "orange";
            }
            else {
                this.smileyColor = "green";
            }
        }
        setState(newState) {
            this.state = newState;
            if (newState === "seating") {
                this.target = this.findFreeChair();
                this.velocity = { x: 2, y: 2 };
            }
            else if (newState === "paying") {
                this.target = { x: 1100, y: 880 };
                this.velocity = { x: 2, y: 2 };
            }
            else if (newState === "leaving") {
                this.target = { x: 2000, y: this.canvasHeight / 2 };
                this.velocity = { x: 2, y: 2 };
            }
        }
        generateOrder() {
            const iceCreamColors = [
                "#FFC0CB", // Rosa steht für Himbeere
                "#FFD700", // Gelb steht für Mango
                "#ADD8E6", // Hellblau steht für Blaubeere
                "#90EE90" // Hellgrün steht für Pistazie
            ];
            const numScoops = Math.floor(Math.random() * 3) + 1;
            this.order = [];
            for (let i = 0; i < numScoops; i++) {
                const randomColor = iceCreamColors[Math.floor(Math.random() * iceCreamColors.length)];
                this.order.push(randomColor);
            }
        }
        getOrder() {
            return this.order;
        }
        incrementWaitingTime() {
            this.waitingTime++;
            this.updateSmiley();
        }
        resetMood() {
            this.waitingTime = 0;
            this.smileyColor = "green";
        }
        getState() {
            return this.state;
        }
        getPosition() {
            return this.position;
        }
        findFreeChair() {
            const chairs = [
                { x: 1560, y: 300 },
                { x: 1540, y: 650 },
                { x: 1400, y: 150 },
                { x: 1395, y: 820 },
                { x: 1695, y: 820 },
            ];
            return chairs[Math.floor(Math.random() * chairs.length)];
        }
        startMoodTimer() {
            this.moodInterval = setInterval(() => {
                this.incrementWaitingTime(); // Inkrementiere die Wartezeit
            }, 1000); // Alle xxxx Frames
        }
        stopMoodTimer() {
            clearInterval(this.moodInterval); // Timer stoppen
        }
        // Event-Listener für Klicks auf farbige Boxen und Buttons
        static setupEventListeners() {
            const canvas = document.getElementById("myCanvas");
            canvas.addEventListener("click", (event) => {
                const rect = canvas.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                // Überprüfe, ob auf eine der farbigen Boxen geklickt wurde
                const boxWidth = 100;
                const boxHeight = 50;
                const spacing = 10;
                const startX = 850 + spacing;
                let startY = 360 + spacing;
                const iceCreamColors = ["#FFC0CB", "#FFD700", "#ADD8E6", "#90EE90"];
                for (let i = 0; i < iceCreamColors.length; i++) {
                    if (x > startX && x < startX + boxWidth && y > startY && y < startY + boxHeight) {
                        if (Kunde.selectedOrder.length < 3) {
                            Kunde.selectedOrder.push(iceCreamColors[i]);
                        }
                    }
                    startY += boxHeight + spacing;
                }
                // Überprüfe, ob auf den grünen Kasten (Bestätigen) geklickt wurde
                const buttonsY = 190 + 3 * (200 + 10) + 20;
                if (x > 250 && x < 250 + 100 && y > buttonsY && y < buttonsY + 50) {
                    Kunde.orderConfirmed = true;
                }
                // Überprüfe, ob auf den roten Kasten (Abbrechen) geklickt wurde
                if (x > 370 && x < 370 + 100 && y > buttonsY && y < buttonsY + 50) {
                    Kunde.selectedOrder = [];
                }
            });
        }
    }
    Eisdiele.Kunde = Kunde;
    // Event-Listener initialisieren, wenn das Dokument geladen ist
    document.addEventListener("DOMContentLoaded", () => {
        Kunde.setupEventListeners();
    });
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=kunde.js.map