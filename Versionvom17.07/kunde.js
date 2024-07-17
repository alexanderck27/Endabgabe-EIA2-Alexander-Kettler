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
        constructor(position, velocity, canvasWidth, canvasHeight) {
            super(position, velocity); // Konstruktor der Elternklasse aufrufen
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.target = { x: canvasWidth / 1.7, y: canvasHeight / 2 }; // Ziel ist die Mitte des Canvas
            Kunde.customerQueue.push(this); // Füge den Kunden zur Warteschlange hinzu
            this.startMoodTimer(); // Starte den Timer für den Stimmungswechsel
        }
        draw(crc2) {
            crc2.save(); // Aktuellen Zustand speichern
            crc2.beginPath(); // Neuer Pfad
            crc2.arc(this.position.x, this.position.y, 50, 0, 2 * Math.PI); // Kopf
            crc2.fillStyle = this.smileyColor; // Smiley-Farbe
            crc2.fill(); // Kopf füllen
            crc2.stroke(); // Kopf umranden
            crc2.closePath(); // Pfad schließen
            crc2.beginPath(); // Neuer Pfad
            crc2.arc(this.position.x - 15, this.position.y - 10, 5, 0, 2 * Math.PI); // Linkes Auge
            crc2.fillStyle = "black"; // Augenfarbe
            crc2.fill(); // Auge füllen
            crc2.closePath(); // Pfad schließen
            crc2.beginPath(); // Neuer Pfad
            crc2.arc(this.position.x + 15, this.position.y - 10, 5, 0, 2 * Math.PI); // Rechtes Auge
            crc2.fillStyle = "black"; // Augenfarbe
            crc2.fill(); // Auge füllen
            crc2.closePath(); // Pfad schließen
            crc2.beginPath(); // Neuer Pfad
            crc2.arc(this.position.x, this.position.y + 10, 20, 0, Math.PI, false); // Lächelnder Mund
            crc2.strokeStyle = "black"; // Mundfarbe
            crc2.stroke(); // Mund umranden
            crc2.closePath(); // Pfad schließen
            crc2.restore(); // Gespeicherten Zustand wiederherstellen
        }
        update(allCustomers) {
            if (this.state === "entering" || this.state === "seating" || this.state === "leaving" || (this.state === "paying" && this.position.x !== this.target.x && this.position.y !== this.target.y)) { // Bewegt den Kunden zum Ziel
                this.moveTowardsTarget(allCustomers); // wenn er sich bewegen soll
            }
            this.updateSmiley(); // Aktualisiert die Farbe des Smileys
        }
        moveTowardsTarget(allCustomers) {
            const dx = this.target.x - this.position.x; // Differenz in X
            const dy = this.target.y - this.position.y; // Differenz in Y
            const distance = Math.sqrt(dx * dx + dy * dy); // Distanz zum Ziel
            if (distance > 1) { // Wenn der Kunde noch nicht am Ziel ist
                this.position.x += (dx / distance) * this.velocity.x; // Bewege den Kunden in X-Richtung
                this.position.y += (dy / distance) * this.velocity.y; // Bewege den Kunden in Y-Richtung
            }
            else { // Wenn der Kunde am Ziel ist
                this.velocity.x = 0; // Wenn der Kunde am Ziel ist, stoppe x die Bewegung
                this.velocity.y = 0; // Wenn der Kunde am Ziel ist, stoppe y die Bewegung
                if (this.state === "entering") { // Wenn der Kunde gerade hereinkommt
                    this.state = "waiting"; // Ändere den Zustand in "waiting"
                }
                else if (this.state === "seating") { // Wenn der Kunde gerade sitzt
                    this.state = "eating"; // Ändere den Zustand in "eating"
                    setTimeout(() => this.setState("paying"), 20000); // 20 Sekunden essen
                }
                else if (this.state === "paying") { // Wenn der Kunde gerade bezahlt und nicht mehr in Bewegung ist
                    // Bleibt im Zustand "paying" und wartet auf Klick
                }
                else if (this.state === "leaving") { // Wenn der Kunde gerade geht
                    const index = allCustomers.indexOf(this); // Finde den Index des Kunden in der Liste
                    if (index > -1) { // Wenn der Kunde in der Liste ist
                        allCustomers.splice(index, 1); // Entfernt den Kunden aus der Liste
                    }
                    this.stopMoodTimer(); // Stoppe den Timer, wenn der Kunde die Szene verlässt
                }
            }
        }
        updateSmiley() {
            if (this.waitingTime > 40) { // Wenn die Wartezeit zu lang ist
                this.smileyColor = "red"; // Ändere die Farbe des Smileys in Rot
            }
            else if (this.waitingTime > 20) { // Wenn die Wartezeit lang ist
                this.smileyColor = "orange"; // Ändere die Farbe des Smileys in Orange
            }
            else { // Wenn die Wartezeit kurz ist
                this.smileyColor = "green"; // Ändere die Farbe des Smileys in Grün
            }
        }
        setState(newState) {
            this.state = newState; // Setzt den Zustand auf den neuen Zustand
            if (newState === "seating") { // Wenn der Kunde sich setzt
                this.target = this.findFreeChair(); // Suche einen freien Stuhl
                this.velocity = { x: 2, y: 2 }; // Setze die Geschwindigkeit
            }
            else if (newState === "paying") { // Wenn der Kunde bezahlt
                this.target = { x: 1100, y: 880 }; // Position der Registrierkasse
                this.velocity = { x: 2, y: 2 }; // Setze die Geschwindigkeit
            }
            else if (newState === "leaving") { // Wenn der Kunde geht
                this.target = { x: 2000, y: this.canvasHeight / 2 }; // Ausgangspunkt
                this.velocity = { x: 2, y: 2 }; // Setze die Geschwindigkeit
            }
        }
        generateOrder() {
            const iceCreamFlavors = ["Schokolade", "Himbeere", "Zitrone", "Mango"]; // Eiscreme-Sorten
            const numScoops = Math.floor(Math.random() * 3) + 1; // Zufällige Anzahl von Kugeln
            this.order = []; // Leere Bestellung
            for (let i = 0; i < numScoops; i++) { // Füge zufällige Sorten hinzu
                const randomFlavor = iceCreamFlavors[Math.floor(Math.random() * iceCreamFlavors.length)]; // Zufällige Sorte
                this.order.push(randomFlavor); // Füge die Sorte zur Bestellung hinzu
            }
        }
        getOrder() {
            return this.order; // Gibt die Bestellung zurück
        }
        incrementWaitingTime() {
            this.waitingTime++; // Erhöht die Wartezeit um 1
            this.updateSmiley(); // Aktualisiert die Farbe des Smileys
        }
        // public resetMood(): void { // Setzt die Wartezeit zurück und ändert die Farbe zu Grün
        //     this.waitingTime = 0;
        //     this.smileyColor = "green";
        // }
        getState() {
            return this.state; // Gibt den Zustand zurück
        }
        getPosition() {
            return this.position; // Gibt die Position zurück
        }
        findFreeChair() {
            const chairs = [
                { x: 1560, y: 300 }, // Positionen des 1. Stuhls
                { x: 1540, y: 650 }, // Positionen des 2. Stuhls
                { x: 1400, y: 150 }, // Positionen des 3. Stuhls
                { x: 1395, y: 820 }, // Positionen des 4. Stuhls
                { x: 1695, y: 820 }, // Positionen des 5. Stuhls
            ];
            return chairs[Math.floor(Math.random() * chairs.length)]; // Zufälligen Stuhl zurückgeben
        }
        startMoodTimer() {
            this.moodInterval = setInterval(() => {
                this.incrementWaitingTime(); // Erhöht die Wartezeit um 1
            }, 500); // Alle 10 Sekunden
        }
        stopMoodTimer() {
            clearInterval(this.moodInterval);
        }
    }
    Eisdiele.Kunde = Kunde;
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=kunde.js.map