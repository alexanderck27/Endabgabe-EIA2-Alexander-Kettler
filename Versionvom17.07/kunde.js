"use strict";
/// <reference path="Moveable.ts" />
var Eisdiele;
(function (Eisdiele) {
    class Kunde extends Eisdiele.Moveable {
        canvasWidth;
        canvasHeight;
        order = [];
        waitingTime = 0;
        state = "entering";
        smileyColor = "green";
        target;
        constructor(position, velocity, canvasWidth, canvasHeight) {
            super(position, velocity);
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.target = { x: canvasWidth / 2, y: canvasHeight / 2 }; // Ziel ist die Mitte des Canvas
        }
        draw(crc2) {
            crc2.save();
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, 20, 0, 2 * Math.PI);
            crc2.fillStyle = this.smileyColor;
            crc2.fill();
            crc2.stroke();
            crc2.restore();
        }
        update(allCustomers) {
            if (this.state === "entering" || this.state === "seating" || this.state === "leaving") {
                this.moveTowardsTarget(allCustomers);
            }
            this.updateSmiley();
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
                if (this.state === "entering") {
                    this.state = "waiting";
                }
                else if (this.state === "seating") {
                    this.state = "eating";
                    setTimeout(() => this.setState("paying"), 20000); // 20 Sekunden essen
                }
                else if (this.state === "leaving") {
                    const index = allCustomers.indexOf(this);
                    if (index > -1) {
                        allCustomers.splice(index, 1); // Entfernt den Kunden aus der Liste
                    }
                }
            }
        }
        updateSmiley() {
            if (this.waitingTime > 40) {
                this.smileyColor = "red";
            }
            else if (this.waitingTime > 20) {
                this.smileyColor = "yellow";
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
                this.target = { x: 900, y: 880 }; // Position der Registrierkasse
                this.velocity = { x: 2, y: 2 };
            }
            else if (newState === "leaving") {
                this.target = { x: this.canvasWidth, y: this.canvasHeight / 2 }; // Ausgang
                this.velocity = { x: 2, y: 0 };
            }
        }
        generateOrder() {
            const iceCreamFlavors = ["Schokolade", "Himbeere", "Zitrone", "Mango"];
            const numScoops = Math.floor(Math.random() * 3) + 1;
            this.order = [];
            for (let i = 0; i < numScoops; i++) {
                const randomFlavor = iceCreamFlavors[Math.floor(Math.random() * iceCreamFlavors.length)];
                this.order.push(randomFlavor);
            }
        }
        getOrder() {
            return this.order;
        }
        incrementWaitingTime() {
            this.waitingTime++;
        }
        getState() {
            return this.state;
        }
        getPosition() {
            return this.position;
        }
        findFreeChair() {
            const chairs = [
                { x: 1540, y: 280 },
                { x: 1520, y: 630 },
                { x: 1380, y: 130 },
                { x: 1375, y: 800 },
            ];
            return chairs[Math.floor(Math.random() * chairs.length)];
        }
    }
    Eisdiele.Kunde = Kunde;
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=kunde.js.map