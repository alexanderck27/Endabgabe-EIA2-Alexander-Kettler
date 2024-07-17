// Remove the unused namespace declaration

export class Moveable { // Klasse Moveable
    position: Vector;   // Position
    velocity: Vector;   // Geschwindigkeit

    constructor(position: Vector, velocity: Vector) { // Konstruktor
        this.position = position;                     // Position setzen
        this.velocity = velocity;                    // Geschwindigkeit setzen
    }

    move(): void {                        // Bewegen
        this.position.add(this.velocity); // Position um Geschwindigkeit erhöhen
    }
}

export class Smiley extends Moveable {
        radius: number = 20; // Größe des Smileys

        constructor(position: Vector, velocity: Vector) {
            super(position, velocity);
        }

        draw(crc2: CanvasRenderingContext2D): void {
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
            crc2.fillStyle = "yellow";
            crc2.fill();
        }
    }

    let smileys: Smiley[] = [];
    const canvasWidth = 800; // Breite des Canvas, anpassen
    const canvasCenterX = canvasWidth / 2;
    const startY = 100; // Startposition Y, anpassen






    export function startSmileyAnimation(crc2: CanvasRenderingContext2D): void { // Animation starten
        setInterval(() => {                                                      // Smileys alle 10 Sekunden hinzufügen
            let startPosition = new Vector(canvasWidth, startY);                 // Startposition rechts
            let velocity = new Vector(-2, 0);                                    // Bewegung nach links
            let newSmiley = new Smiley(startPosition, velocity);                 // Neuer Smiley
            smileys.push(newSmiley);                                             // Hinzufügen zum Array
        }, 10000);                                                               // Intervall 10 Sekunden

        function update(): void {                                                                            // Update-Schleife
            smileys.forEach(smiley => {                                                                      // Schleife über alle Smileys
                if (smiley.position.x > canvasCenterX || smileys.indexOf(smiley) === smileys.length - 1) {   // Wenn Smiley rechts oder letzter Smiley
                    smiley.move();                                                                           // Bewegen
                }
            });
            draw(crc2);                                                                                       // Zeichnen
            requestAnimationFrame(update);                                                                    // Nächster Frame
        }

        function draw(crc2: CanvasRenderingContext2D): void {                        // Zeichnen
            crc2.clearRect(0, 0, crc2.canvas.width, crc2.canvas.height);             // Canvas bereinigen 
            smileys.forEach(smiley => {                                              // Schleife über alle Smileys
                smiley.draw(crc2);                                                   // Smiley zeichnen
            });
        }

        update(); // Startet die Update-Schleife
    }








class Vector {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(other: Vector): void {
        this.x += other.x;
        this.y += other.y;
    }
}

