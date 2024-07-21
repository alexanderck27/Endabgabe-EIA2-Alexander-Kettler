namespace Eisdiele {
    
    // Array für Eissorten----------------------------------------Hier die Eissorten ändern-----------------------------------------------------
    const iceCreamFlavors = [
        { color: "#FFC0CB", name: "Himbeere" },
        { color: "#FFD700", name: "Mango" },
        { color: "#ADD8E6", name: "Blaubeere" },
        { color: "#90EE90", name: "Pistazie" }
    ];

    



    // Klasse für den Kunden
    export class Kunde extends Moveable {
        private order: string[] = []; // Bestellung des Kunden
        private waitingTime: number = 0; // Wartezeit des Kunden
        private state: "entering" | "waiting" | "ordering" | "seating" | "eating" | "paying" | "leaving" = "entering"; // Zuständ des Kunden
        private smileyColor: string = "green"; // Normalfarbe des Smileys
        private target: { x: number, y: number }; // Ziel des Kunden
        private static customerQueue: Kunde[] = []; // Warteschlange für Kunden
        private moodInterval: any; // Timer für den Stimmungswechsel
        private hasGeneratedOrder: boolean = false; // Flag um zu prüfen, ob die Bestellung generiert wurde
        public hasReceivedOrder: boolean = false; // Flag um zu prüfen, ob der Kunde seine Bestellung erhalten hat
        private static totalEarnings: number = 0; // Gesamteinnahmen
        private static selectedOrder: string[] = []; // Ausgewählte Bestellung
        private static orderConfirmed: boolean = false; // Flag, um zu prüfen, ob die Bestellung bestätigt wurde



        // Konstruktor für den Kunden
        constructor(position: { x: number, y: number }, velocity: { x: number, y: number }, private canvasWidth: number, private canvasHeight: number) {
            super(position, velocity);
            this.target = { x: this.canvasWidth / 1.7, y: canvasHeight / 2 };
            Kunde.customerQueue.push(this);
            this.startMoodTimer(); // Startet den Timer für den Stimmungswechsel
        }






        // Zeichnet den Smiley

        public draw(crc2: CanvasRenderingContext2D): void {
            crc2.save();
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, 50, 0, 2 * Math.PI); // Kopf
            crc2.fillStyle = this.smileyColor; 
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
                this.drawOrder(crc2); // Zeichnet die Bestellung, wenn der Kunde im wartezustand ist
            }

            this.drawSelectedOrder(crc2); // Zeichnet die temporäre Bestellung im Grid
            this.drawEarnings(crc2); // Zeichnet den Einnahmenbereich

            
        }





        // Zeichnet die Bestellung des Smileys

        private drawOrder(crc2: CanvasRenderingContext2D): void { //Posizion des Grids
            const startX = 150;
            const startY = 190 + (2 * (200 + 10));
            const rectWidth = 200;
            const rectHeight = 200;
            const spacing = 10;

            crc2.save();
            for (let i = 0; i < this.order.length; i++) {
                const flavor = iceCreamFlavors.find(f => f.color === this.order[i]); // Finde die Eissorte im Array basierend auf der Farbe
                if (flavor) {
                    const x = startX;
                    const y = startY - i * (rectHeight + spacing);

                    crc2.fillStyle = flavor.color; //Style des Rechtecks
                    crc2.fillRect(x, y, rectWidth, rectHeight); 
                    crc2.strokeStyle = "black";
                    crc2.lineWidth = 2; 
                    crc2.strokeRect(x, y, rectWidth, rectHeight); 

                    crc2.fillStyle = "black"; 
                    crc2.font = "35px 'Brush Script MT'"; 
                    crc2.fillText(flavor.name, x + rectWidth / 4, y + rectHeight / 2);
                }
            }
            crc2.restore();
        }








        // Zeichnet die eingegebene Bestellung im Grid

        private drawSelectedOrder(crc2: CanvasRenderingContext2D): void { //Position des Grids
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

                    crc2.fillStyle = flavor.color; 
                    crc2.fillRect(x, y, rectWidth, rectHeight); 
                    crc2.strokeStyle = "black"; 
                    crc2.lineWidth = 2; 
                    crc2.strokeRect(x, y, rectWidth, rectHeight); 
                }
            }
            crc2.restore();
        }








        // Zeichnet den Kasten mit den Tageseinnahmen

        private drawEarnings(crc2: CanvasRenderingContext2D): void {
            const x = 750;
            const y = 170;
            const width = 410;
            const height = 50;

            crc2.save();
            crc2.fillStyle = "#1B98E0";
            crc2.fillRect(x, y, width, height);
            crc2.fillStyle = "black";
            crc2.font = "30px 'Brush Script MT'";
            crc2.fillText(`Einnahmen: ${Kunde.totalEarnings.toFixed(2)}€`, x + 10, y + 35); //hier die aktuelle Einnahme
            crc2.restore();
        }





        // Überprüfung, ob der Kunde seine Bestellung erhalten hat
        public receiveOrder(): void {
            this.hasReceivedOrder = true;
        }


        // Aktualisiert den Kunden

        public update(allCustomers: Kunde[]): void {
            if (this.state === "entering" || this.state === "seating" || this.state === 
           "leaving" || (this.state === "paying" && this.position.x !== this.target.x && 
           this.position.y !== this.target.y)) {
            this.moveTowardsTarget(allCustomers); // Bewegt den Kunden zum Ziel
            }
            this.updateSmiley(); // Aktualisiet den Smiley
            if (this.state === "waiting" && Kunde.orderConfirmed) {// Überprüft, ob die Be stellung bestätigt wurde 
            if (this.isOrderMatching()) { // Wenn die Bestellung übereinstimmt...
            this.setState("seating"); // Setze den Zustand auf "seating"
            this.receiveOrder(); // Kunde hat die Bestellung erhalten...
            Kunde.orderConfirmed = false; // Setze die Bestätigung zurück
            Kunde.selectedOrder = []; // Leere die temporäre Bestellung
            } else {
            Kunde.orderConfirmed = false; // Setze die Bestätigung zurück
            this.showGameOverAlert(); // Game-Over-Nachricht
            }
            }
           }









        // Bewegung des Kunden

        private moveTowardsTarget(allCustomers: Kunde[]): void {
            const dx = this.target.x - this.position.x; // Differenz in X-Richtung
            const dy = this.target.y - this.position.y; // Differenz in Y-Richtung
            const distance = Math.sqrt(dx * dx + dy * dy); // Berechnet die Distanz zum Ziel

            if (distance > 1) { // wenn eine Distanz zum Ziel vorhanden ist
                this.position.x += (dx / distance) * this.velocity.x; 
                this.position.y += (dy / distance) * this.velocity.y; 
            } else { // wenn keine Distanz zum Ziel vorhanden ist
                this.velocity.x = 0; 
                this.velocity.y = 0; 

                if (this.state === "entering" && !this.hasGeneratedOrder) {
                    this.state = "waiting"; 
                    this.generateOrder(); // Generiert die Bestellung
                    this.hasGeneratedOrder = true; // Setzt ddie Flag, dass die Bestellung generiert wurde

                } else if (this.state === "seating") {
                    this.state = "eating"; // Setzt den Zustand auf "eating"
                    setTimeout(() => this.setState("paying"), 10000); // nach 10 Sekunden auf "paying" setzen

                } else if (this.state === "paying") {
                    // wartet auf Klick

                } else if (this.state === "leaving") {
                    const index = allCustomers.indexOf(this); // Findet den Index des Kunden

                    if (index > -1) {
                        allCustomers.splice(index, 1); // Entfernt den Kunden aus der Liste
                    }
                    this.stopMoodTimer(); // Stoppt den Timer für den Stimmungswechsel
                }
            }
        }






        // Aktualisiert den Smiley

        private updateSmiley(): void {
            if (this.waitingTime >= 6.5) {
                this.smileyColor = "red"; // Farbe auf rot, wenn die Wartezeit >= 6.5 ist

            } else if (this.waitingTime >= 5) {
                this.smileyColor = "orange"; // Farbe auf orange, wenn die Wartezeit >= 5 ist

            } else {
                this.smileyColor = "green"; // Farbe auf grün, wenn die Wartezeit < 5 ist
            }
        }








        // Definiert den Zustand des Kunden
        public setState(newState: "entering" | "waiting" | "ordering" | "seating" | "eating" | "paying" | "leaving"): void {
            this.state = newState; // definiert den neuen Zustand

            if (newState === "seating") {
                this.target = this.findFreeChair(); // Finde einen  Stuhl
                this.velocity = { x: 2, y: 2 }; 

            } else if (newState === "paying") {
                this.target = { x: 1100, y: 880 }; // Setze das Ziel auf die Kasse
                this.velocity = { x: 2, y: 2 };

            } else if (newState === "leaving") {
                this.target = { x: 2000, y: this.canvasHeight / 2 }; // Setze das Ziel auf den Ausgang
                this.velocity = { x: 2, y: 2 }; 
            }
        }






        // Generiert die Bestellung des Kunden

        public generateOrder(): void {
            const numScoops = Math.floor(Math.random() * 3) + 1; // Anzahl der Kugeln (1-3)
            this.order = []; 
            for (let i = 0; i < numScoops; i++) {
                const randomFlavor = iceCreamFlavors[Math.floor(Math.random() * iceCreamFlavors.length)]; // Wähle eine zufällige Eissorte
                this.order.push(randomFlavor.color);                                                // Füge die Eissorte zur Bestellung hinzu
            }
        }




        // Abrufen der Bestellung des Kunden

        public getOrder(): string[] {
            return this.order; // Rückgabe der Bestellung
        }




        // Erhöht die Wartezeit des Kunden

        public incrementWaitingTime(): void {
            this.waitingTime++; 
            this.updateSmiley(); // Aktualisiert den Smiley
        }





        // Zurücksetzen der Stimmung des Kunden (funktioniert noch nicht)

        public resetMood(): void {
            this.waitingTime = 0; // Setze die Wartezeit auf 0
            this.smileyColor = "green"; // Setze die Smiley-Farbe auf grün
        }

        // Abrufen des Zustands des Kunden

        public getState(): "entering" | "waiting" | "ordering" | "seating" | "eating" | "paying" | "leaving" {
            return this.state; // Rückgabe des Zustands
        }

        // Abrufen der Position des Kunden

        public getPosition(): { x: number, y: number } {
            return this.position; // Rückgabe der Position
        }





        // Findet eines freien Stuhl

        private findFreeChair(): { x: number, y: number } {
            const chairs = [
                { x: 1560, y: 300 },
                { x: 1540, y: 650 },
                { x: 1400, y: 150 },
                { x: 1395, y: 820 },
                { x: 1695, y: 820 }
            ];
            return chairs[Math.floor(Math.random() * chairs.length)]; // Auswahl eines zufälligen Stuhls
        }






        // Startet den Timer für den Stimmungswechsel
        private startMoodTimer(): void {
            this.moodInterval = setInterval(() => {
                this.incrementWaitingTime(); // Wartezeit
            }, 5000); // Alle 5 Sekunden
        }

        // Stoppt den Timer für den Stimmungswechsel

        private stopMoodTimer(): void {
            clearInterval(this.moodInterval); // Stoppt den Timer
        }






        // Überprüfen, ob die Bestellung übereinstimmt

        private isOrderMatching(): boolean {
            if (this.order.length !== Kunde.selectedOrder.length) { // Überprüft die Längen der Bestellungen
                return false; // Rückgabe false, wenn es nicht übereinstimmen
            }
            for (let i = 0; i < this.order.length; i++) {
                if (this.order[i] !== Kunde.selectedOrder[i]) { // Überprüft die Farben der Kugeln
                    return false; // Rückgabe false, wenn es nicht übereinstimmt
                }
            }
            return true; // Rückgabe true, wenn alle Bestellungen übereinstimmen
        }





        // Anzeigen der Game-Over-Nachricht

        private showGameOverAlert(): void {
            const earnings = Kunde.totalEarnings.toFixed(2); // Formatiere die Einnahmen
            alert(`Die Bestellung war falsch! Der Kunde ist gegangen! \nDu hast heute ${earnings}€ verdient.\nStarte von vorne und sehe wie weit du dich verbessern kannst...`);
            location.reload(); // Spiel neu starten
        }






        // Event-Listener für Klicks auf die Eissorten, die Bestätigungs- und Abbruch-Buttons und die Smilies

        public static setupEventListeners(): void {
            const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;

            canvas.addEventListener("click", (event) => {
                const rect = canvas.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top; 

                // Überprüft, ob auf eine der Eisfelder auf dem Tresen geklickt wurde
                const boxWidth = 100;
                const boxHeight = 50;
                const spacing = 10;
                const startX = 850 + spacing;
                let startY = 360 + spacing;

                for (let i = 0; i < iceCreamFlavors.length; i++) { // Schleife über alle Eissorten
                    const flavor = iceCreamFlavors[i];
                    if (x > startX && x < startX + boxWidth && y > startY && y < startY + boxHeight) {
                        if (Kunde.selectedOrder.length < 3) { // Bestellung mit weniger als 3 Kugeln hat
                            Kunde.selectedOrder.push(flavor.color); // Fügt die Farbe zur ausgewählten Bestellung hinzu
                        }
                    }
                    startY += boxHeight + spacing; // Aktualisiere die Y-Position für die nächste Box
                }



                // Überprüft ob auf den grünen Kasten geklickt wurde
                const buttonsY = 190 + 3 * (200 + 10) + 20;
                if (x > 250 && x < 250 + 100 && y > buttonsY && y < buttonsY + 50) {
                    Kunde.orderConfirmed = true; // Setzt die Flag, dass die Bestellung bestätigt wurde
                }



                // Überprüft, ob auf den roten Kasten geklickt wurde
                if (x > 370 && x < 370 + 100 && y > buttonsY && y < buttonsY + 50) {
                    Kunde.selectedOrder = []; // Lert die ausgewählte Bestellung
                }




                // Überprüft, ob auf einen Smiley an der Kasse geklickt wurde
                Kunde.customerQueue.forEach(kunde => {
                    if (kunde.state === "paying" && x > kunde.position.x - 50 && x < kunde.position.x + 50 && y > kunde.position.y - 50 && y < kunde.position.y + 50) {
                        kunde.handlePayment(); 
                    }
                });
            });
        }




        // Verarbeitet die Zahlung des Kunden

        private handlePayment(): void {
            if (this.smileyColor === "green") {
                Kunde.totalEarnings += this.order.length; // Fügt die vollen Einnahmen hinzu
            } else if (this.smileyColor === "orange") {
                Kunde.totalEarnings += this.order.length / 2; // Fügt nur die Hälfte der Einnahmen hinzu
                //bei m roten Smiley wird nichts hinzugefügt
            }
            this.setState("leaving"); // Setzt den Zustand auf "leaving"
        }
    }



   // Initialisiert die Event-Listener, wenn das Dokument geladen ist
    document.addEventListener("DOMContentLoaded", () => {
    alert("Willkommen zum Spiel: Eisdealer!\n\nZiel des Spiels: Bediene die Kunden und erhöhe die Tageseinnahmen.\n\nAnleitung:\n1. Kunden betreten den Laden und bestellen ihr Eis.\n2. Klicke auf die Eissorten auf dem Tresen, um die Bestellung zusammenzustellen.\n3. Bestätige die Bestellung, um sie dem Kunden zu geben.\n4. Der Kunde isst und kommt danach zur Kasse.\n5. Vermeide Fehler bei den Bestellungen, sonst verlierst du den Kunden.\n\nAber Achtung, der Andrang der Kunden nimmt langsam zu! Außerdem zahlen die Kunden weniger, wenn ihre Stimmung sinkt.\n\nAls kleiner Tip:\nDie Kunden sind sehr vergesslich, wenn du Kunden anklickst noch während sie essen, zahlen sie bei dir und nochmal an der Kasse!\n\nViel Spaß!");
    Kunde.setupEventListeners();
   });

}
