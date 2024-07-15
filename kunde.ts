import { Drawable } from "../drawables";
import { Vector } from "./vector";

export enum CustomerType {
    Normal,
    VIP
}

export class Customer extends Drawable {
    constructor(
        public position: Vector,
        public speed: Vector,
        public direction: Vector,
        public type: CustomerType,
        public mood: string
    ) {
        super(position);
    }

    update(): void {
        // Update Logik für den Kunden
    }

    draw(): void {
        // Zeichnen des Kunden
        crc2.save();
        crc2.fillStyle = "blue"; // Beispiel Farbe
        crc2.beginPath();
        crc2.arc(this.position.x, this.position.y, 20, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();
    }
}
