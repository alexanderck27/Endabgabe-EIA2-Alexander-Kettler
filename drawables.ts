export interface Drawable {
    draw(crc2: CanvasRenderingContext2D): void;
}

export let crc2: CanvasRenderingContext2D; // 2D-Kontext des Canvas
export let allObjects: Drawable[] = []; // Array für alle Objekte

export function drawBackground(crc2: CanvasRenderingContext2D): void { // Hintergrund zeichnen
    crc2.save(); // Speichern des aktuellen Zustands
    const size = 50; // Größe eines Karos
    const rows = Math.ceil(crc2.canvas.height / size); // Anzahl der Reihen
    const cols = Math.ceil(crc2.canvas.width / size); // Anzahl der Spalten

    for (let row = 0; row < rows; row++) { // Schleife über alle Reihen
        for (let col = 0; col < cols; col++) { // Schleife über alle Spalten
            crc2.fillStyle = (row + col) % 2 === 0 ? "#ffffff" : "#000000"; // Wechsel zwischen Schwarz und Weiß
            crc2.fillRect(col * size, row * size, size, size);  // Zeichnen eines Quadrats
        }
    }

    crc2.restore(); // Wiederherstellen des gespeicherten Zustands
    drawIceCreamParlor(); // Eisladen zeichnen
}

function drawIceCreamParlor(): void { // Eisladen zeichnen
    // Zeichnen der Theke
    crc2.save(); // Speichern des aktuellen Zustands
    crc2.fillStyle = "#8B4513";  // Braun
    crc2.fillRect(150, 100, 300, 350); // Theke
    crc2.restore(); // Wiederherstellen des gespeicherten Zustands

    // Zeichnen des Tresens
    crc2.save(); // Speichern des aktuellen Zustands
    crc2.fillStyle = "#d2b48c";  // Hellbraun
    crc2.fillRect(160, 110, 280, 330); // Tresen
    crc2.restore(); // Wiederherstellen des gespeicherten Zustands

    const behälterPositionen = [
        { x: 170, y: 240 }, { x: 230, y: 240 },
        { x: 290, y: 240 }  // Hinzugefügte fehlende Position für Konsistenz
    ];

    behälterPositionen.forEach(pos => {
        crc2.save();
        crc2.fillStyle = "black";
        crc2.fillRect(pos.x, pos.y, 50, 50);
        crc2.restore();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    crc2 = canvas.getContext("2d")!;
    drawScene();
});

function drawScene() {
    drawBackground(crc2);
    // Zeichnen aller Objekte
    for (const obj of allObjects) {
        obj.draw(crc2);
    }
}
