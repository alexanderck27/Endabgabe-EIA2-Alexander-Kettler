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
        }

        private drawOrder(crc2: CanvasRenderingContext2D): void {
            const startX = 150;
            const startY = 190;
            const rectWidth = 200;
            const rectHeight = 200;
            const spacing = 10;

            crc2.save();
            for (let i = 0; i < this.order.length; i++) {
                const color = this.order[i];
                const x = startX;
                const y = startY + i * (rectHeight + spacing);

                crc2.fillStyle = color;
                crc2.fillRect(x, y, rectWidth, rectHeight);
                crc2.strokeStyle = "black";
                crc2.lineWidth = 2;
                crc2.strokeRect(x, y, rectWidth, rectHeight);

                crc2.fillStyle = "black";
                crc2.font = "30px Arial";
                crc2.fillText(`Eis ${i + 1}`, x + rectWidth / 2, y + rectHeight / 2);
            }
            crc2.restore();
        }

        public update(allCustomers: Kunde[]): void {
            if (this.state === "entering" || this.state === "seating" || this.state === "leaving" || (this.state === "paying" && this.position.x !== this.target.x && this.position.y !== this.target.y)) {
                this.moveTowardsTarget(allCustomers);
            }
            this.updateSmiley();
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
            const iceCreamColors = ["#FFC0CB", "#FFD700", "#ADD8E6", "#90EE90"];
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

        private startMoodTimer(): void {
            this.moodInterval = setInterval(() => {
                this.incrementWaitingTime();
            }, 5000); // Alle 5 Sekunden
        }

        private stopMoodTimer(): void {
            clearInterval(this.moodInterval);
        }
    }
}
