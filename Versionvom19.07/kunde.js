"use strict";
var Eisdiele;
(function (Eisdiele) {
    // Array für Eissorten
    const iceCreamFlavors = [
        { color: "#FFC0CB", name: "Himbeere" },
        { color: "#FFD700", name: "Mango" },
        { color: "#ADD8E6", name: "Blaubeere" },
        { color: "#90EE90", name: "Pistazie" }
    ];
    // Klasse für den Kunden
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
        hasReceivedOrder = false; // Flag um zu prüfen, ob der Kunde seine Bestellung erhalten hat
        static totalEarnings = 0; // Gesamteinnahmen
        static selectedOrder = []; // Temporäre Bestellung, die vom Benutzer ausgewählt wird
        static orderConfirmed = false; // Flag, um zu prüfen, ob die Bestellung bestätigt wurde
        // Konstruktor für den Kunden
        constructor(position, velocity, canvasWidth, canvasHeight) {
            super(position, velocity);
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.target = { x: this.canvasWidth / 1.7, y: this.canvasHeight / 2 };
            Kunde.customerQueue.push(this);
            this.startMoodTimer(); // Starte den Timer für den Stimmungswechsel
        }
        // Methode zum Zeichnen des Kunden
        draw(crc2) {
            crc2.save();
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, 50, 0, 2 * Math.PI); // Kopf
            crc2.fillStyle = this.smileyColor; // Setze die Füllfarbe des Smileys
            crc2.fill();
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
            this.drawSelectedOrder(crc2); // Zeichne die temporäre Bestellung im Grid
            this.drawEarnings(crc2); // Zeichne den Einnahmenbereich
            //crc2.fillText(`Canvas Width: ${this.canvasWidth}`, 10, 10); // Verwende canvasWidth, um die Warnung zu vermeiden
        }
        // Methode zum Zeichnen der Bestellung des Kunden
        drawOrder(crc2) {
            const startX = 150;
            const startY = 190 + (2 * (200 + 10));
            const rectWidth = 200;
            const rectHeight = 200;
            const spacing = 10;
            crc2.save();
            for (let i = 0; i < this.order.length; i++) {
                const flavor = iceCreamFlavors.find(f => f.color === this.order[i]); // Finde die Eissorte basierend auf der Farbe
                if (flavor) {
                    const x = startX;
                    const y = startY - i * (rectHeight + spacing);
                    crc2.fillStyle = flavor.color; // Setze die Füllfarbe des Rechtecks
                    crc2.fillRect(x, y, rectWidth, rectHeight); // Fülle das Rechteck
                    crc2.strokeStyle = "black"; // Setze die Randfarbe des Rechtecks
                    crc2.lineWidth = 2; // Setze die Breite des Randes
                    crc2.strokeRect(x, y, rectWidth, rectHeight); // Zeichne den Rand des Rechtecks
                    crc2.fillStyle = "black"; // Setze die Farbe des Textes
                    crc2.font = "35px 'Brush Script MT'"; // Setze die Schriftart und -größe
                    crc2.fillText(flavor.name, x + rectWidth / 4, y + rectHeight / 2); // Zeichne die Beschriftung im Rechteck
                }
            }
            crc2.restore();
        }
        // Methode zum Zeichnen der temporären Bestellung im Grid
        drawSelectedOrder(crc2) {
            const startX = 360;
            const startY = 190 + 2 * (200 + 10);
            const rectWidth = 200;
            const rectHeight = 200;
            const spacing = 10;
            crc2.save();
            for (let i = 0; i < Kunde.selectedOrder.length; i++) {
                const flavor = iceCreamFlavors.find(f => f.color === Kunde.selectedOrder[i]); // Finde die Eissorte basierend auf der Farbe
                if (flavor) {
                    const x = startX;
                    const y = startY - i * (rectHeight + spacing);
                    crc2.fillStyle = flavor.color; // Setze die Füllfarbe des Rechtecks
                    crc2.fillRect(x, y, rectWidth, rectHeight); // Fülle das Rechteck
                    crc2.strokeStyle = "black"; // Setze die Randfarbe des Rechtecks
                    crc2.lineWidth = 2; // Setze die Breite des Randes
                    crc2.strokeRect(x, y, rectWidth, rectHeight); // Zeichne den Rand des Rechtecks
                }
            }
            crc2.restore();
        }
        // Methode zum Zeichnen des Einnahmenbereichs
        drawEarnings(crc2) {
            const x = 750;
            const y = 170;
            const width = 410;
            const height = 50;
            crc2.save();
            crc2.fillStyle = "#1B98E0";
            crc2.fillRect(x, y, width, height);
            crc2.fillStyle = "black";
            crc2.font = "30px 'Brush Script MT'";
            crc2.fillText(`Einnahmen: ${Kunde.totalEarnings.toFixed(2)}€`, x + 10, y + 35);
            crc2.restore();
        }
        // Methode zur Überprüfung, ob der Kunde seine Bestellung erhalten hat
        receiveOrder() {
            this.hasReceivedOrder = true;
        }
        // Methode zum Aktualisieren des Kunden
        update(allCustomers) {
            if (this.state === "entering" || this.state === "seating" || this.state ===
                "leaving" || (this.state === "paying" && this.position.x !== this.target.x &&
                this.position.y !== this.target.y)) {
                this.moveTowardsTarget(allCustomers); // Bewege den Kunden zum Ziel
            }
            this.updateSmiley(); // Aktualisiere den Smiley
            // Überprüfe, ob die Bestellung bestätigt wurde und ändere den Zustand entsprechend
            if (this.state === "waiting" && Kunde.orderConfirmed) {
                if (this.isOrderMatching()) { // Wenn die Bestellung übereinstimmt
                    this.setState("seating"); // Setze den Zustand auf "seating"
                    this.receiveOrder(); // Kunde hat die Bestellung erhalten
                    Kunde.orderConfirmed = false; // Setze die Bestätigung zurück
                    Kunde.selectedOrder = []; // Leere die temporäre Bestellung
                }
                else {
                    Kunde.orderConfirmed = false; // Setze die Bestätigung zurück
                    this.showGameOverAlert(); // Zeige die Game-Over-Nachricht
                }
            }
        }
        // Methode zum Bewegen des Kunden zum Ziel
        moveTowardsTarget(allCustomers) {
            const dx = this.target.x - this.position.x; // Berechne die Differenz in X-Richtung
            const dy = this.target.y - this.position.y; // Berechne die Differenz in Y-Richtung
            const distance = Math.sqrt(dx * dx + dy * dy); // Berechne die Distanz zum Ziel
            if (distance > 1) {
                this.position.x += (dx / distance) * this.velocity.x; // Aktualisiere die Position in X-Richtung
                this.position.y += (dy / distance) * this.velocity.y; // Aktualisiere die Position in Y-Richtung
            }
            else {
                this.velocity.x = 0; // Setze die Geschwindigkeit in X-Richtung auf 0
                this.velocity.y = 0; // Setze die Geschwindigkeit in Y-Richtung auf 0
                if (this.state === "entering" && !this.hasGeneratedOrder) {
                    this.state = "waiting"; // Setze den Zustand auf "waiting"
                    this.generateOrder(); // Generiere die Bestellung
                    this.hasGeneratedOrder = true; // Setze das Flag, dass die Bestellung generiert wurde
                }
                else if (this.state === "seating") {
                    this.state = "eating"; // Setze den Zustand auf "eating"
                    setTimeout(() => this.setState("paying"), 10000); // Setze den Zustand auf "paying" nach 10 Sekunden
                }
                else if (this.state === "paying") {
                    // Bleibt im Zustand "paying" und wartet auf Klick
                }
                else if (this.state === "leaving") {
                    const index = allCustomers.indexOf(this); // Finde den Index des Kunden
                    if (index > -1) {
                        allCustomers.splice(index, 1); // Entferne den Kunden aus der Liste
                    }
                    this.stopMoodTimer(); // Stoppe den Timer für den Stimmungswechsel
                }
            }
        }
        // Methode zum Aktualisieren des Smileys
        updateSmiley() {
            if (this.waitingTime >= 6.5) {
                this.smileyColor = "red"; // Setze die Farbe auf rot, wenn die Wartezeit >= 6.5 ist
            }
            else if (this.waitingTime >= 5) {
                this.smileyColor = "orange"; // Setze die Farbe auf orange, wenn die Wartezeit >= 5 ist
            }
            else {
                this.smileyColor = "green"; // Setze die Farbe auf grün, wenn die Wartezeit < 5 ist
            }
        }
        // Methode zum Setzen des Zustands des Kunden
        setState(newState) {
            this.state = newState; // Setze den neuen Zustand
            if (newState === "seating") {
                this.target = this.findFreeChair(); // Finde einen freien Stuhl
                this.velocity = { x: 2, y: 2 }; // Geschwindigkeit
            }
            else if (newState === "paying") {
                this.target = { x: 1100, y: 880 }; // Setze das Ziel auf die Kasse
                this.velocity = { x: 2, y: 2 }; // Geschwindigkeit
            }
            else if (newState === "leaving") {
                this.target = { x: 2000, y: this.canvasHeight / 2 }; // Setze das Ziel auf den Ausgang
                this.velocity = { x: 2, y: 2 }; // Geschwindigkeit
            }
        }
        // Methode zum Generieren der Bestellung des Kunden
        generateOrder() {
            const numScoops = Math.floor(Math.random() * 3) + 1; // Anzahl der Kugeln (1-3)
            this.order = []; // Leere die Bestellung
            for (let i = 0; i < numScoops; i++) {
                const randomFlavor = iceCreamFlavors[Math.floor(Math.random() * iceCreamFlavors.length)]; // Wähle eine zufällige Eissorte
                this.order.push(randomFlavor.color); // Füge die Farbe zur Bestellung hinzu
            }
        }
        // Methode zum Abrufen der Bestellung des Kunden
        getOrder() {
            return this.order; // Rückgabe der Bestellung
        }
        // Methode zum Inkrementieren der Wartezeit des Kunden
        incrementWaitingTime() {
            this.waitingTime++; // Inkrementiere die Wartezeit
            this.updateSmiley(); // Aktualisiere den Smiley
        }
        // Methode zum Zurücksetzen der Stimmung des Kunden
        resetMood() {
            this.waitingTime = 0; // Setze die Wartezeit auf 0
            this.smileyColor = "green"; // Setze die Smiley-Farbe auf grün
        }
        // Methode zum Abrufen des Zustands des Kunden
        getState() {
            return this.state; // Rückgabe des Zustands
        }
        // Methode zum Abrufen der Position des Kunden
        getPosition() {
            return this.position; // Rückgabe der Position
        }
        // Methode zum Finden eines freien Stuhls
        findFreeChair() {
            const chairs = [
                { x: 1560, y: 300 },
                { x: 1540, y: 650 },
                { x: 1400, y: 150 },
                { x: 1395, y: 820 },
                { x: 1695, y: 820 }
            ];
            return chairs[Math.floor(Math.random() * chairs.length)]; // Rückgabe eines zufälligen Stuhls
        }
        // Methode zum Starten des Timers für den Stimmungswechsel
        startMoodTimer() {
            this.moodInterval = setInterval(() => {
                this.incrementWaitingTime(); // Inkrementiere die Wartezeit
            }, 5000); // Alle 5 Sekunden
        }
        // Methode zum Stoppen des Timers für den Stimmungswechsel
        stopMoodTimer() {
            clearInterval(this.moodInterval); // Stoppe den Timer
        }
        // Methode zum Überprüfen, ob die Bestellung übereinstimmt
        isOrderMatching() {
            if (this.order.length !== Kunde.selectedOrder.length) {
                return false; // Rückgabe false, wenn die Längen nicht übereinstimmen
            }
            for (let i = 0; i < this.order.length; i++) {
                if (this.order[i] !== Kunde.selectedOrder[i]) {
                    return false; // Rückgabe false, wenn eine Bestellung nicht übereinstimmt
                }
            }
            return true; // Rückgabe true, wenn alle Bestellungen übereinstimmen
        }
        // Methode zum Anzeigen der Game-Over-Nachricht
        showGameOverAlert() {
            const earnings = Kunde.totalEarnings.toFixed(2); // Formatiere die Einnahmen
            alert(`Die Bestellung war falsch! Der Kunde ist gegangen! \nDu hast heute ${earnings}€ verdient.\nStarte von vorne und sehe wie weit du dich verbessern kannst...`);
            location.reload(); // Spiel neu starten
        }
        // Event-Listener für Klicks auf die Eissorten, die Bestätigungs- und Abbruch-Buttons und die Smilies
        static setupEventListeners() {
            const canvas = document.getElementById("myCanvas");
            canvas.addEventListener("click", (event) => {
                const rect = canvas.getBoundingClientRect();
                const x = event.clientX - rect.left; // X-Position des Klicks
                const y = event.clientY - rect.top; // Y-Position des Klicks
                // Überprüfe, ob auf eine der Eisfelder auf dem Tresen geklickt wurde
                const boxWidth = 100;
                const boxHeight = 50;
                const spacing = 10;
                const startX = 850 + spacing;
                let startY = 360 + spacing;
                for (let i = 0; i < iceCreamFlavors.length; i++) { // Schleife über alle Eissorten
                    const flavor = iceCreamFlavors[i];
                    if (x > startX && x < startX + boxWidth && y > startY && y < startY + boxHeight) {
                        if (Kunde.selectedOrder.length < 3) { // Wenn die Bestellung weniger als 3 Kugeln hat
                            Kunde.selectedOrder.push(flavor.color); // Füge die Farbe zur ausgewählten Bestellung hinzu
                        }
                    }
                    startY += boxHeight + spacing; // Aktualisiere die Y-Position für die nächste Box
                }
                // Überprüfe, ob auf den grünen Kasten (Bestätigen) geklickt wurde
                const buttonsY = 190 + 3 * (200 + 10) + 20;
                if (x > 250 && x < 250 + 100 && y > buttonsY && y < buttonsY + 50) {
                    Kunde.orderConfirmed = true; // Setze das Flag, dass die Bestellung bestätigt wurde
                }
                // Überprüfe, ob auf den roten Kasten (Abbrechen) geklickt wurde
                if (x > 370 && x < 370 + 100 && y > buttonsY && y < buttonsY + 50) {
                    Kunde.selectedOrder = []; // Leere die ausgewählte Bestellung
                }
                // Überprüfe, ob auf einen Smiley an der Kasse geklickt wurde
                Kunde.customerQueue.forEach(kunde => {
                    if (kunde.state === "paying" && x > kunde.position.x - 50 && x < kunde.position.x + 50 && y > kunde.position.y - 50 && y < kunde.position.y + 50) {
                        kunde.handlePayment(); // Verarbeite die Zahlung
                    }
                });
            });
        }
        // Methode zum Verarbeiten der Zahlung des Kunden
        handlePayment() {
            if (this.smileyColor === "green") {
                Kunde.totalEarnings += this.order.length; // Füge die Einnahmen hinzu
            }
            else if (this.smileyColor === "orange") {
                Kunde.totalEarnings += this.order.length / 2; // Füge die Hälfte der Einnahmen hinzu
            }
            this.setState("leaving"); // Setze den Zustand auf "leaving"
        }
    }
    Eisdiele.Kunde = Kunde;
    // Initialisiere die Event-Listener, wenn das Dokument geladen ist
    document.addEventListener("DOMContentLoaded", () => {
        alert("Willkommen zum Spiel: Eisdealer!\n\nZiel des Spiels: Bediene die Kunden und erhöhe die Tageseinnahmen.\n\nAnleitung:\n1. Kunden betreten den Laden und bestellen ihr Eis.\n2. Klicke auf die Eissorten auf dem Tresen, um die Bestellung zusammenzustellen.\n3. Bestätige die Bestellung, um sie dem Kunden zu geben.\n4. Der Kunde isst und kommt danach zur Kasse.\n5. Vermeide Fehler bei den Bestellungen, sonst verlierst du den Kunden.\n\nAber Achtung, der Andrang der Kunden nimmt langsam zu! Außerdem zahlen die Kunden weniger, wenn ihre Stimmung sinkt.\n\nAls kleiner Tip:\nDie Kunden sind sehr vergesslich, wenn du Kunden anklickst noch während sie essen, zahlen sie bei dir und nochmal an der Kasse!\n\nViel Spaß!");
        Kunde.setupEventListeners();
    });
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=kunde.js.map