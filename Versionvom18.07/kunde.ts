namespace Eisdiele {
    export class Kunde extends Moveable {
        private order: string[] = []; // Bestellung des Kunden
        private waitingTime: number = 0; // Wartezeit des Kunden
        private state: "entering" | "waiting" | "ordering" | "seating" | "eating" | "paying" | "leaving" = "entering"; // Zustand des Kunden
        private smileyColor: string = "green"; // Farbe des Smileys
        private target: { x: number, y: number }; // Ziel des Kunden
        private static customerQueue: Kunde[] = []; // Warteschlange für Kunden
        private moodInterval: any; // Timer für den Stimmungswechsel
        private hasGeneratedOrder: boolean = false; // Flag um zu prüfen, ob die Bestellung generiert wurde
        private static totalEarnings: number = 0; // Gesamteinnahmen

        private static selectedOrder: string[] = []; // Temporäre Bestellung, die vom Benutzer ausgewählt wird
        private static orderConfirmed: boolean = false; // Flag, um zu prüfen, ob die Bestellung bestätigt wurde

        constructor(position: { x: number, y: number }, velocity: { x: number, y: number }, private canvasWidth: number, private canvasHeight: number) {
            super(position, velocity);
            this.target = { x: canvasWidth / 1.7, y: canvasHeight / 2 };
            Kunde.customerQueue.push(this);

            this.startMoodTimer(); // Starte den Timer für den Stimmungswechsel
        }

        public draw(crc2: CanvasRenderingContext2D): void { // Zeichnet den Kunden
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

            // Zeichne den Einnahmenbereich
            this.drawEarnings(crc2);
        }

        private drawOrder(crc2: CanvasRenderingContext2D): void {  // Zeichnet die Bestellung des Kunden 
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
                switch(color) {
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

        private drawSelectedOrder(crc2: CanvasRenderingContext2D): void {
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
            crc2.fillText(`Einnahmen: ${Kunde.totalEarnings}€`, x + 10, y + 35);
            crc2.restore();
        }

        public update(allCustomers: Kunde[]): void {
            if (this.state === "entering" || this.state === "seating" || this.state === "leaving" || (this.state === "paying" && this.position.x !== this.target.x && this.position.y !== this.target.y)) {
                this.moveTowardsTarget(allCustomers);
            }
            this.updateSmiley();

            // Überprüfe, ob die Bestellung bestätigt wurde und ändere den Zustand entsprechend
            if (this.state === "waiting" && Kunde.orderConfirmed) {
                if (this.isOrderMatching()) {
                    this.setState("seating");
                    Kunde.orderConfirmed = false;
                    Kunde.selectedOrder = [];
                } else {
                    Kunde.orderConfirmed = false;
                    this.showGameOverAlert();
                }
            }
        }

        private moveTowardsTarget(allCustomers: Kunde[]): void {
            const dx = this.target.x - this.position.x;
            const dy = this.target.y - this.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 1) {
                this.position.x += (dx / distance) * this.velocity.x;
                this.position.y += (dy / distance) * this.velocity.y;
            } else {
                this.velocity.x = 0;
                this.velocity.y = 0;

                if (this.state === "entering" && !this.hasGeneratedOrder) {
                    this.state = "waiting";
                    this.generateOrder();
                    this.hasGeneratedOrder = true;
                } else if (this.state === "seating") {
                    this.state = "eating";
                    setTimeout(() => this.setState("paying"), 20000); // 20 Sekunden essen
                } else if (this.state === "paying") {
                    // Bleibt im Zustand "paying" und wartet auf Klick
                } else if (this.state === "leaving") {
                    const index = allCustomers.indexOf(this);
                    if (index > -1) {
                        allCustomers.splice(index, 1);
                    }
                    this.stopMoodTimer();
                }
            }
        }

        private updateSmiley(): void {
            if (this.waitingTime >= 10) {
                this.smileyColor = "red";
            } else if (this.waitingTime >= 5) {
                this.smileyColor = "orange";
            } else {
                this.smileyColor = "green";
            }
        }

        public setState(newState: "entering" | "waiting" | "ordering" | "seating" | "eating" | "paying" | "leaving"): void {
            this.state = newState;
            if (newState === "seating") {
                this.target = this.findFreeChair();
                this.velocity = { x: 2, y: 2 };
            } else if (newState === "paying") {
                this.target = { x: 1100, y: 880 };
                this.velocity = { x: 2, y: 2 };
            } else if (newState === "leaving") {
                this.target = { x: 2000, y: this.canvasHeight / 2 };
                this.velocity = { x: 2, y: 2 };
            }
        }

        public generateOrder(): void {
            const iceCreamColors = [
                "#FFC0CB", // Rosa steht für Himbeere
                "#FFD700", // Gelb steht für Mango
                "#ADD8E6", // Hellblau steht für Blaubeere
                "#90EE90"  // Hellgrün steht für Pistazie
            ]; 
            const numScoops = Math.floor(Math.random() * 3) + 1;
            this.order = [];
            for (let i = 0; i < numScoops; i++) {
                const randomColor = iceCreamColors[Math.floor(Math.random() * iceCreamColors.length)];
                this.order.push(randomColor);
            }
        }

        public getOrder(): string[] {
            return this.order;
        }

        public incrementWaitingTime(): void {
            this.waitingTime++;
            this.updateSmiley();
        }

        public resetMood(): void {
            this.waitingTime = 0;
            this.smileyColor = "green";
        }

        public getState(): "entering" | "waiting" | "ordering" | "seating" | "eating" | "paying" | "leaving" {
            return this.state;
        }

        public getPosition(): { x: number, y: number } {
            return this.position;
        }

        private findFreeChair(): { x: number, y: number } {
            const chairs = [
                { x: 1560, y: 300 },
                { x: 1540, y: 650 },
                { x: 1400, y: 150 },
                { x: 1395, y: 820 },
                { x: 1695, y: 820 },
            ];
            return chairs[Math.floor(Math.random() * chairs.length)];
        }

        private startMoodTimer(): void { // Startet den Timer für den Stimmungswechsel
            this.moodInterval = setInterval(() => { // Alle xxxx Millisekunden
                this.incrementWaitingTime(); // Inkrementiere die Wartezeit
            }, 5000); // Alle xxxx Frames
        }

        private stopMoodTimer(): void { // Stoppt den Timer für den Stimmungswechsel
            clearInterval(this.moodInterval); // Timer stoppen
        }

        private isOrderMatching(): boolean {
            if (this.order.length !== Kunde.selectedOrder.length) {
                return false;
            }
            for (let i = 0; i < this.order.length; i++) {
                if (this.order[i] !== Kunde.selectedOrder[i]) {
                    return false;
                }
            }
            return true;
        }

        private showGameOverAlert(): void {
            alert("Die Bestellung war falsch! Der Kunde ist gegangen! Starte von vorne.");
            location.reload(); // Spiel neu starten
        }

        // Event-Listener für Klicks auf farbige Boxen und Buttons
        public static setupEventListeners(): void {
            const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;

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

                // Überprüfe, ob auf einen Smiley an der Kasse geklickt wurde
                Kunde.customerQueue.forEach(kunde => {
                    if (kunde.state === "paying" && x > kunde.position.x - 50 && x < kunde.position.x + 50 && y > kunde.position.y - 50 && y < kunde.position.y + 50) {
                        kunde.handlePayment();
                    }
                });
            });
        }

        private handlePayment(): void {
            if (this.smileyColor !== "red") {
                Kunde.totalEarnings += this.order.length;
            }
            this.setState("leaving");
        }
    }

    // Event-Listener initialisieren, wenn das Dokument geladen ist
    document.addEventListener("DOMContentLoaded", () => {
        Kunde.setupEventListeners();
    });
}
