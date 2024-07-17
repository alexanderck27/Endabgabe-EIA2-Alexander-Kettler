namespace Eisdiele {

    export interface Drawable {
        draw(crc2: CanvasRenderingContext2D): void;
    }

    export let crc2: CanvasRenderingContext2D;
    export let allObjects: Drawable[] = []; // Array für alle Objekte

    export class Smiley implements Drawable {
        color: string = "blue"; // Startfarbe als Beispiel

        draw(crc2: CanvasRenderingContext2D): void {
            // Gesicht
            crc2.beginPath();
            crc2.arc(150, 150, 50, 0, 2 * Math.PI);
            crc2.fillStyle = this.color;
            crc2.fill();
            crc2.stroke();

            // Augen
            crc2.beginPath();
            crc2.arc(130, 135, 5, 0, 2 * Math.PI);
            crc2.arc(170, 135, 5, 0, 2 * Math.PI);
            crc2.fillStyle = "black";
            crc2.fill();

            // Mund
            crc2.beginPath();
            crc2.arc(150, 160, 25, 0, Math.PI);
            crc2.stroke();
        }

        changeColor(): void {
            this.color = this.color === "blue" ? "red" : "blue";
        }
    }

    // Hinzufügen eines Smiley-Objekts zum Array
    allObjects.push(new Smiley());

    export function drawAll(): void {
        crc2.clearRect(0, 0, crc2.canvas.width, crc2.canvas.height); // Canvas bereinigen
        allObjects.forEach(obj => obj.draw(crc2));
    }

    // Farbwechsel alle 10 Sekunden
    setInterval(() => {
        allObjects.forEach(obj => {
            if (obj instanceof Smiley) {
                obj.changeColor();
            }
        });
        drawAll();
    }, 10000);

    // Klick-Ereignis, um die Farbe auf Grün zurückzusetzen
    document.addEventListener("click", () => {
        allObjects.forEach(obj => {
            if (obj instanceof Smiley) {
                obj.color = "green";
            }
        });
        drawAll();
    });

    // Initialzeichnung
    document.addEventListener("DOMContentLoaded", () => {
        const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
        crc2 = canvas.getContext("2d")!;
        drawAll();
    });

    export class Customer extends Moveable { // Erbt von Moveable
        order: IceCream[];                   // Bestellung
        mood: string;                        // Stimmung
        moodTimer: number;                   // Timer für Stimmung

        constructor(_position: Vector, _velocity: Vector) { // Konstruktor
            super(_position, _velocity);                    // Aufruf des Konstruktors der Elternklasse
            this.order = this.generateOrder();              // Bestellung generieren
            this.mood = "happy";                            // Initiale Stimmung
            this.moodTimer = 0;                             // Timer, um die Stimmung zu verfolgen
        }

        generateOrder(): IceCream[] {                                // Bestellung generieren 
            let orderSize: number = getRandomInt(1, 3);                                  // Zufällige Anzahl von Kugeln 
            let order: IceCream[] = [];                                                  // Array für die Bestellung
            for (let i = 0; i < orderSize; i++) {                                        // Schleife über die Anzahl der Kugeln
                let flavorIndex: number = getRandomInt(0, IceCream.flavors.length - 1);  // Zufälliger Index für Geschmack
                let flavor: string = IceCream.flavors[flavorIndex].flavor;               // Geschmack
                let color: string = IceCream.flavors[flavorIndex].color;                 // Farbe 
                order.push(new IceCream(flavor, color));                                 // Kugel hinzufügen
            }
            return order;
        }

        updateMood(): void {                   // Stimmung updaten
            this.moodTimer++;                                 // Timer erhöhen
            if (this.moodTimer > 300) {                       // Beispiel-Zeitspanne für Stimmungswechsel
                if (this.mood === "happy") {                  // Wenn die Stimmung glücklich ist
                    this.mood = "neutral";                    // Stimmung auf neutral setzen
                } else if (this.mood === "neutral") {         // Wenn die Stimmung neutral ist
                    this.mood = "angry";                      // Stimmung auf wütend setzen
                }
            }
        }
    }

    export class IceCream {                     // Klasse für Eis
        static flavors = [{ flavor: "Vanilla", color: "Yellow" }, { flavor: "Chocolate", color: "Brown" }]; // Geschmacksrichtungen
        flavor: string;                         // Geschmack
        color: string;                          // Farbe

        constructor(flavor: string, color: string) { // Konstruktor
            this.flavor = flavor;                    // Geschmack setzen
            this.color = color;                      // Farbe setzen
        }
    }

    export function getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

// Die Implementierung von Moveable und Vector importieren und benutzen
import { Moveable } from "./moveable";
import { Vector } from "./vector";

// Zusätzliche Klassen, falls notwendig
class Circle implements Eisdiele.Drawable {
    draw(crc2: CanvasRenderingContext2D): void {
        crc2.beginPath();
        crc2.arc(100, 100, 50, 0, 2 * Math.PI);
        crc2.fillStyle = "black";
        crc2.fill();
    }
}

// Hinzufügen eines Circle-Objekts zum Array und Zeichnen aller Objekte
Eisdiele.allObjects.push(new Circle());
