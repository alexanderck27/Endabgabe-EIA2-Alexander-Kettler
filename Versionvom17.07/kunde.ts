namespace Eisdiele {
    export class Kunde extends Moveable { // Klasse für Kunden
        private order: string[] = [];     // Bestellung des Kunden
        private waitingTime: number = 0;  // Wartezeit des Kunden
        private state: "entering" | "waiting" | "ordering" | "seating" | "eating" | "paying" | "leaving" = "entering"; // Zustand des Kunden
        private smileyColor: string = "green"; // Farbe des Smileys
        private target: { x: number, y: number }; // Ziel des Kunden
        private static customerQueue: Kunde[] = []; // Warteschlange für Kunden
        private moodInterval: any; // Timer für den Stimmungswechsel

        constructor(position: { x: number, y: number }, velocity: { x: number, y: number }, private canvasWidth: number, private canvasHeight: number) { // Konstruktor
            super(position, velocity);  // Konstruktor der Elternklasse aufrufen
            this.target = { x: canvasWidth / 1.7, y: canvasHeight / 2 }; // Ziel ist die Mitte des Canvas
            Kunde.customerQueue.push(this); // Füge den Kunden zur Warteschlange hinzu

            this.startMoodTimer(); // Starte den Timer für den Stimmungswechsel
        }

        public draw(crc2: CanvasRenderingContext2D): void { // Zeichnet den Kunden
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

        public update(allCustomers: Kunde[]): void { // Updated den Kunden
            if (this.state === "entering" || this.state === "seating" || this.state === "leaving" || (this.state === "paying" && this.position.x !== this.target.x && this.position.y !== this.target.y)) { // Bewegt den Kunden zum Ziel
                this.moveTowardsTarget(allCustomers); // wenn er sich bewegen soll
            }
            this.updateSmiley(); // Aktualisiert die Farbe des Smileys
        }

        private moveTowardsTarget(allCustomers: Kunde[]): void { // Bewegt den Kunden zum Ziel
            const dx = this.target.x - this.position.x; // Differenz in X
            const dy = this.target.y - this.position.y; // Differenz in Y
            const distance = Math.sqrt(dx * dx + dy * dy); // Distanz zum Ziel

            if (distance > 1) { // Wenn der Kunde noch nicht am Ziel ist
                this.position.x += (dx / distance) * this.velocity.x; // Bewege den Kunden in X-Richtung
                this.position.y += (dy / distance) * this.velocity.y; // Bewege den Kunden in Y-Richtung
            } else { // Wenn der Kunde am Ziel ist
                this.velocity.x = 0; // Wenn der Kunde am Ziel ist, stoppe x die Bewegung
                this.velocity.y = 0; // Wenn der Kunde am Ziel ist, stoppe y die Bewegung

                if (this.state === "entering") { // Wenn der Kunde gerade hereinkommt
                    this.state = "waiting"; // Ändere den Zustand in "waiting"
                } else if (this.state === "seating") { // Wenn der Kunde gerade sitzt
                    this.state = "eating"; // Ändere den Zustand in "eating"
                    setTimeout(() => this.setState("paying"), 20000); // 20 Sekunden essen
                } else if (this.state === "paying") { // Wenn der Kunde gerade bezahlt und nicht mehr in Bewegung ist
                    // Bleibt im Zustand "paying" und wartet auf Klick
                } else if (this.state === "leaving") { // Wenn der Kunde gerade geht
                    const index = allCustomers.indexOf(this); // Finde den Index des Kunden in der Liste
                    if (index > -1) { // Wenn der Kunde in der Liste ist
                        allCustomers.splice(index, 1); // Entfernt den Kunden aus der Liste
                    }
                    this.stopMoodTimer(); // Stoppe den Timer, wenn der Kunde die Szene verlässt
                }
            }
        }

        private updateSmiley(): void { // Aktualisiert die Farbe des Smileys
            if (this.waitingTime > 40) { // Wenn die Wartezeit zu lang ist
                this.smileyColor = "red"; // Ändere die Farbe des Smileys in Rot
            } else if (this.waitingTime > 20) { // Wenn die Wartezeit lang ist
                this.smileyColor = "orange"; // Ändere die Farbe des Smileys in Orange
            } else { // Wenn die Wartezeit kurz ist
                this.smileyColor = "green"; // Ändere die Farbe des Smileys in Grün
            }
        }

        public setState(newState: "entering" | "waiting" | "ordering" | "seating" | "eating" | "paying" | "leaving"): void { // Ändert den Zustand des Kunden
            this.state = newState; // Setzt den Zustand auf den neuen Zustand
            if (newState === "seating") { // Wenn der Kunde sich setzt
                this.target = this.findFreeChair(); // Suche einen freien Stuhl
                this.velocity = { x: 2, y: 2 }; // Setze die Geschwindigkeit
            } else if (newState === "paying") { // Wenn der Kunde bezahlt
                this.target = { x: 1100, y: 880 }; // Position der Registrierkasse
                this.velocity = { x: 2, y: 2 }; // Setze die Geschwindigkeit
            } else if (newState === "leaving") { // Wenn der Kunde geht
                this.target = { x: 2000, y: this.canvasHeight / 2 }; // Ausgangspunkt
                this.velocity = { x: 2, y: 2 }; // Setze die Geschwindigkeit
            }
        }

        public generateOrder(): void { // Generiert eine zufällige Bestellung
            const iceCreamFlavors = ["Schokolade", "Himbeere", "Zitrone", "Mango"]; // Eiscreme-Sorten
            const numScoops = Math.floor(Math.random() * 3) + 1; // Zufällige Anzahl von Kugeln
            this.order = []; // Leere Bestellung
            for (let i = 0; i < numScoops; i++) { // Füge zufällige Sorten hinzu
                const randomFlavor = iceCreamFlavors[Math.floor(Math.random() * iceCreamFlavors.length)]; // Zufällige Sorte
                this.order.push(randomFlavor); // Füge die Sorte zur Bestellung hinzu
            }
        }

        public getOrder(): string[] { // Gibt die Bestellung des Kunden zurück
            return this.order; // Gibt die Bestellung zurück
        }

        public incrementWaitingTime(): void { // Erhöht die Wartezeit
            this.waitingTime++; // Erhöht die Wartezeit um 1
            this.updateSmiley(); // Aktualisiert die Farbe des Smileys
        }

        // public resetMood(): void { // Setzt die Wartezeit zurück und ändert die Farbe zu Grün
        //     this.waitingTime = 0;
        //     this.smileyColor = "green";
        // }

        public getState(): "entering" | "waiting" | "ordering" | "seating" | "eating" | "paying" | "leaving" { // Gibt den Zustand des Kunden zurück
            return this.state; // Gibt den Zustand zurück
        }

        public getPosition(): { x: number, y: number } { // Gibt die Position des Kunden zurück
            return this.position; // Gibt die Position zurück
        }

        private findFreeChair(): { x: number, y: number } { // Sucht einen freien Stuhl
            const chairs = [ // Liste von Stühlen
                { x: 1560, y: 300 }, // Positionen des 1. Stuhls
                { x: 1540, y: 650 }, // Positionen des 2. Stuhls
                { x: 1400, y: 150 }, // Positionen des 3. Stuhls
                { x: 1395, y: 820 }, // Positionen des 4. Stuhls
                { x: 1695, y: 820 }, // Positionen des 5. Stuhls
            ];
            return chairs[Math.floor(Math.random() * chairs.length)]; // Zufälligen Stuhl zurückgeben
        }

        private startMoodTimer(): void { // Startet den Timer für den Stimmungswechsel
            this.moodInterval = setInterval(() => {
                this.incrementWaitingTime(); // Erhöht die Wartezeit um 1
            }, 500); // Alle 10 Sekunden
        }

        private stopMoodTimer(): void { // Stoppt den Timer für den Stimmungswechsel
            clearInterval(this.moodInterval);
        }
    }
}
