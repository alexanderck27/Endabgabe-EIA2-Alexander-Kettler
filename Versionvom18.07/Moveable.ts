namespace Eisdiele {                                      // Ändere die Farbe des Smileys in Gelb
    export abstract class Moveable implements Drawable {  // Abstrakte Klasse für bewegbare Objekte
        protected position: { x: number, y: number };     // Position des Objekts
        protected velocity: { x: number, y: number };     // Geschwindigkeit des Objekts

        constructor(position: { x: number, y: number }, velocity: { x: number, y: number }) { // Konstruktor
            this.position = position;                                                         // Setze die Position
            this.velocity = velocity;                                                        // Setze die Geschwindigkeit
        }

        public move(): void { // Bewegt das Objekt
            this.position.x += this.velocity.x; // Bewege das Objekt in X-Richtung
            this.position.y += this.velocity.y; // Bewege das Objekt in Y-Richtung
        }

        abstract draw(crc2: CanvasRenderingContext2D): void; // Abstrakte Methode zum Zeichnen
    }
}
