/// <reference path="Moveable.ts" />
namespace Eisdiele {
    export class Kunde extends Moveable {
        private order: string[] = [];
        private waitingTime: number = 0;
        private state: "entering" | "waiting" | "ordering" | "seating" | "eating" | "paying" | "leaving" = "entering";
        private smileyColor: string = "green";
        private target: { x: number, y: number };

        constructor(position: { x: number, y: number }, velocity: { x: number, y: number }, private canvasWidth: number, private canvasHeight: number) {
            super(position, velocity);
            this.target = { x: canvasWidth / 2, y: canvasHeight / 2 }; // Ziel ist die Mitte des Canvas
        }

        public draw(crc2: CanvasRenderingContext2D): void {
            crc2.save();
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, 20, 0, 2 * Math.PI);
            crc2.fillStyle = this.smileyColor;
            crc2.fill();
            crc2.stroke();
            crc2.restore();
        }

        public update(allCustomers: Kunde[]): void {
            if (this.state === "entering" || this.state === "seating" || this.state === "leaving") {
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

                if (this.state === "entering") {
                    this.state = "waiting";
                } else if (this.state === "seating") {
                    this.state = "eating";
                    setTimeout(() => this.setState("paying"), 20000); // 20 Sekunden essen
                } else if (this.state === "leaving") {
                    const index = allCustomers.indexOf(this);
                    if (index > -1) {
                        allCustomers.splice(index, 1); // Entfernt den Kunden aus der Liste
                    }
                }
            }
        }

        private updateSmiley(): void {
            if (this.waitingTime > 40) {
                this.smileyColor = "red";
            } else if (this.waitingTime > 20) {
                this.smileyColor = "yellow";
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
                this.target = { x: 900, y: 880 }; // Position der Registrierkasse
                this.velocity = { x: 2, y: 2 };
            } else if (newState === "leaving") {
                this.target = { x: this.canvasWidth, y: this.canvasHeight / 2 }; // Ausgang
                this.velocity = { x: 2, y: 0 };
            }
        }

        public generateOrder(): void {
            const iceCreamFlavors = ["Schokolade", "Himbeere", "Zitrone", "Mango"];
            const numScoops = Math.floor(Math.random() * 3) + 1;
            this.order = [];
            for (let i = 0; i < numScoops; i++) {
                const randomFlavor = iceCreamFlavors[Math.floor(Math.random() * iceCreamFlavors.length)];
                this.order.push(randomFlavor);
            }
        }

        public getOrder(): string[] {
            return this.order;
        }

        public incrementWaitingTime(): void {
            this.waitingTime++;
        }

        public getState(): "entering" | "waiting" | "ordering" | "seating" | "eating" | "paying" | "leaving" {
            return this.state;
        }

        public getPosition(): { x: number, y: number } {
            return this.position;
        }

        private findFreeChair(): { x: number, y: number } {
            const chairs = [
                { x: 1540, y: 280 },
                { x: 1520, y: 630 },
                { x: 1380, y: 130 },
                { x: 1375, y: 800 },
            ];
            return chairs[Math.floor(Math.random() * chairs.length)];
        }
    }
}
