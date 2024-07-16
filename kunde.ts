
namespace Eisdiele {
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
            this.color = color;                     // Farbe setzen
        }
    }

    export function getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}


interface Drawable {
    draw(crc2: CanvasRenderingContext2D): void;
}


let crc2: CanvasRenderingContext2D;
let allObjects: Drawable[] = []; // Array für alle Objekte

class Smiley implements Drawable { // Implementierung des Drawable-Interfaces
    draw(crc2: CanvasRenderingContext2D): void {
        // Gesicht
        crc2.beginPath();
        crc2.arc(150, 150, 50, 0, 2 * Math.PI);
        crc2.fillStyle = "yellow";
        crc2.fill();
        crc2.stroke();

        // Augen
        crc2.beginPath();
        crc2.arc(130, 135, 5, 0, 2 * Math.PI);
        crc2.fillStyle = "black";
        crc2.fill();

        // Mund
        crc2.beginPath();
        crc2.arc(150, 160, 25, 0, Math.PI);
        crc2.stroke();
    }
}

class Circle implements Drawable {
    draw(crc2: CanvasRenderingContext2D): void {
        crc2.beginPath();
        crc2.arc(100, 100, 50, 0, 2 * Math.PI);
        crc2.fillStyle = "black";
        crc2.fill();
    }
}

// Hinzufügen eines Smiley-Objekts zum Array und Zeichnen aller Objekte
allObjects.push(new Smiley());

// Funktion zum Zeichnen aller Objekte
function drawAll(): void {
    allObjects.forEach(obj => obj.draw(crc2));
}

function getRandomInt(min: number, max: number): number { // Zufallszahl zwischen min (inklusive) und max (inklusive)
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // Der maximale Wert ist inklusive, der minimale nicht
}
