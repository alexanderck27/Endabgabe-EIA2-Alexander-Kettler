class Customer extends Moveable { // Erbt von Moveable
    order: IceCream[]; // Bestellung
    mood: string; // Stimmung
    moodTimer: number; // Timer für Stimmung
    
    constructor(_position: Vector, _velocity: Vector) {
        super(_position, _velocity);
        this.order = this.generateOrder();
        this.mood = "happy"; // Initiale Stimmung
        this.moodTimer = 0; // Timer, um die Stimmung zu verfolgen
    }
    
    generateOrder(): IceCream[] {
        let orderSize: number = getRandomInt(1, 3);
        let order: IceCream[] = [];
        for (let i = 0; i < orderSize; i++) {
            let flavorIndex: number = getRandomInt(0, IceCream.flavors.length - 1);
            let flavor: string = IceCream.flavors[flavorIndex].flavor;
            let color: string = IceCream.flavors[flavorIndex].color;
            order.push(new IceCream(flavor, color));
        }
        return order;
    }
    
    updateMood(): void {
        this.moodTimer++;
        if (this.moodTimer > 300) { // Beispiel-Zeitspanne für Stimmungswechsel
            if (this.mood === "happy") {
                this.mood = "neutral";
            } else if (this.mood === "neutral") {
                this.mood = "angry";
            }
        }
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

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
