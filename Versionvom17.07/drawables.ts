namespace Eisdiele {
    // Interface für alle Objekte, die gezeichnet werden können
    export interface Drawable {
        draw(crc2: CanvasRenderingContext2D): void; // Zeichnen-Methode, die den Canvas-Kontext als Parameter erhält
    }

    // Funktion zum Zeichnen des Hintergrunds
    export function drawBackground(crc2: CanvasRenderingContext2D): void { 
        crc2.save(); // Speichert den aktuellen Zustand des Canvas
        const size = 50; // Größe eines einzelnen Karos
        const rows = Math.ceil(crc2.canvas.height / size); // Anzahl der Reihen, die benötigt werden, um den Canvas zu füllen
        const cols = Math.ceil(crc2.canvas.width / size); // Anzahl der Spalten, die benötigt werden, um den Canvas zu füllen

        // Schleife über alle Reihen
        for (let row = 0; row < rows; row++) {                                  
            // Schleife über alle Spalten
            for (let col = 0; col < cols; col++) {                              
                crc2.fillStyle = (row + col) % 2 === 0 ? "#ffffff" : "#000000"; // Setzt die Farbe abwechselnd auf Schwarz und Weiß
                crc2.fillRect(col * size, row * size, size, size); // Zeichnet ein Quadrat
            }
        }

        crc2.restore(); // Stellt den gespeicherten Zustand des Canvas wieder her
        drawIceCreamParlor(crc2); // Zeichnet den Eisladen
    }

    // Funktion zum Zeichnen des Eisladen
    function drawIceCreamParlor(crc2: CanvasRenderingContext2D): void {  
        crc2.save(); // Speichert den aktuellen Zustand des Canvas
        crc2.fillStyle = "#8B4513"; // Setzt die Farbe auf Braun
        const borderWidth = 80; // Dicke des Rahmens
        crc2.strokeStyle = "grey"; // Setzt die Farbe des Rahmens auf Grau
        crc2.lineWidth = borderWidth; // Setzt die Dicke des Rahmens
        crc2.strokeRect(0, 0, crc2.canvas.width, crc2.canvas.height); // Zeichnet einen Rahmen um den gesamten Canvas

        crc2.fillRect(800, 300, 220, 450); // Zeichnet die Theke
        crc2.restore(); // Stellt den gespeicherten Zustand des Canvas wieder her

        crc2.save(); // Speichert den aktuellen Zustand des Canvas
        crc2.fillStyle = "#d2b48c"; // Setzt die Farbe auf Hellbraun
        crc2.fillRect(810, 310, 200, 430); // Zeichnet den Tresen
        crc2.restore(); // Stellt den gespeicherten Zustand des Canvas wieder her

        crc2.save(); // Speichert den aktuellen Zustand des Canvas
        crc2.fillStyle = "#d2b48c"; // Setzt die Farbe auf Hellbraun
        crc2.fillRect(800, 800, 200, 200); // Zeichnet den kleineren Tresen für die Kasse

        crc2.strokeStyle = "#8b4513"; // Setzt die Farbe des Rahmens auf Dunkelbraun
        crc2.lineWidth = 10; // Setzt die Dicke des Rahmens
        crc2.strokeRect(800, 800, 200, 200); // Zeichnet den Rahmen um den kleineren Tresen
        crc2.restore(); // Stellt den gespeicherten Zustand des Canvas wieder her

        // Farben für die vier Eissorten
        const colors = ["#FFC0CB", "#FFD700", "#ADD8E6", "#90EE90"]; 
        const rectWidth = 100; // Breite der Rechtecke
        const rectHeight = 50; // Höhe der Rechtecke
        const spacing = 10; // Abstand zwischen den Rechtecken
        const startX = 850 + spacing; // Startposition X
        let startY = 360 + spacing; // Startposition Y

        crc2.save(); // Speichert den aktuellen Zustand des Canvas
        // Schleife zum Zeichnen der vier Eissorten
        for (let i = 0; i < colors.length; i++) {
            crc2.fillStyle = colors[i]; // Setzt die Füllfarbe
            crc2.fillRect(startX, startY, rectWidth, rectHeight); // Zeichnet das Rechteck

            crc2.strokeStyle = "black"; // Setzt die Farbe des Rahmens auf Schwarz
            crc2.lineWidth = 2; // Setzt die Dicke des Rahmens
            crc2.strokeRect(startX, startY, rectWidth, rectHeight); // Zeichnet den Rahmen

            // Text hinzufügen
            const text = `Eis ${i + 1}`; // Text für jede Box
            crc2.save(); // Speichert den aktuellen Zustand des Canvas
            crc2.translate(startX + rectWidth / 3.7, startY + rectHeight / 2); // Verschiebt den Ursprung zur Mitte der Box
            crc2.rotate(-Math.PI / 2); // Dreht um -90 Grad
            crc2.textAlign = "center"; // Zentriert den Text
            crc2.fillStyle = "black"; // Setzt die Textfarbe auf Schwarz
            crc2.fillText(text, 0, 0); // Zeichnet den Text
            crc2.restore(); // Stellt den gespeicherten Zustand des Canvas wieder her

            startY += rectHeight + spacing; // Aktualisiert die Y-Position für das nächste Rechteck
        }
        crc2.restore(); // Stellt den gespeicherten Zustand des Canvas wieder her

        crc2.save(); // Speichert den aktuellen Zustand des Canvas

        // Verschiebt den Ursprung zur Mitte der Registrierkasse
        crc2.translate(900, 880); 
        crc2.rotate(-Math.PI / 2); // Dreht um -90 Grad
        crc2.translate(-900, -880); 

        crc2.fillStyle = "#696969"; // Setzt die Farbe auf Dunkelgrau
        crc2.fillRect(850, 850, 100, 60); // Zeichnet den Grundkörper der Registrierkasse

        crc2.fillStyle = "#808080"; // Setzt die Farbe auf Mittelgrau
        crc2.fillRect(855, 855, 40, 30); // Zeichnet das Tastenfeld der Registrierkasse

        crc2.fillStyle = "#FFFFFF"; // Setzt die Farbe auf Weiß
        crc2.fillRect(900, 855, 45, 20); // Zeichnet die Anzeige der Registrierkasse

        crc2.fillStyle = "#000000"; // Setzt die Farbe auf Schwarz
        crc2.font = "10px Arial"; // Setzt die Schriftart und -größe
        crc2.fillText("Total", 905, 865); // Zeichnet den Text auf der Anzeige

        crc2.restore(); // Stellt den gespeicherten Zustand des Canvas wieder her

        crc2.save(); // Speichert den aktuellen Zustand des Canvas
        crc2.fillStyle = "#605856"; // Setzt die Farbe auf Dunkelgrau
        crc2.fillRect(110, 60, 500, 870); // Zeichnet den Hintergrund für die Bestellauswahl
        crc2.restore(); // Stellt den gespeicherten Zustand des Canvas wieder her

        crc2.strokeStyle = "darkgrey"; // Setzt die Farbe des Rahmens auf Dunkelgrau
        crc2.lineWidth = 5; // Setzt die Dicke des Rahmens
        crc2.strokeRect(110, 60, 500, 870); // Zeichnet den Rahmen um den Kasten

        crc2.save(); // Speichert den aktuellen Zustand des Canvas
        crc2.fillStyle = "#605856"; // Setzt die Farbe auf Dunkelgrau
        crc2.fillRect(710, 60, 500, 200); // Zeichnet den Hintergrund für den Einnahmencounter
        crc2.restore(); // Stellt den gespeicherten Zustand des Canvas wieder her

        crc2.strokeStyle = "darkgrey"; // Setzt die Farbe des Rahmens auf Dunkelgrau
        crc2.lineWidth = 5; // Setzt die Dicke des Rahmens
        crc2.strokeRect(710, 60, 500, 200); // Zeichnet den Rahmen um den Kasten

        crc2.fillStyle = "#000000"; // Setzt die Textfarbe auf Schwarz
        crc2.font = "35px 'Brush Script MT'"; // Setzt die Schriftart und -größe
        crc2.fillText("Tageseinnahmen", 860, 130); // Zeichnet den Text für die Tageseinnahmen

        crc2.restore(); // Stellt den gespeicherten Zustand des Canvas wieder her
        crc2.fillStyle = "#1B98E0"; // Setzt die Farbe auf Blau
        crc2.fillRect(750, 100, 410, 50); // Zeichnet den Kasten für die Tageseinnahmen

        crc2.fillStyle = "#000000"; // Setzt die Textfarbe auf Schwarz
        crc2.font = "35px 'Brush Script MT'"; // Setzt die Schriftart und -größe
        crc2.fillText("Tageseinnahmen:", 860, 130); // Zeichnet den Text für die Tageseinnahmen
        crc2.restore(); // Stellt den gespeicherten Zustand des Canvas wieder her

        crc2.restore(); // Stellt den gespeicherten Zustand des Canvas wieder her
        crc2.fillStyle = "#1B98E0"; // Setzt die Farbe auf Blau
        crc2.fillRect(750, 170, 410, 50); // Zeichnet den Kasten für den Betrag

        crc2.fillStyle = "#000000"; // Setzt die Textfarbe auf Schwarz
        crc2.font = "35px 'Brush Script MT'"; // Setzt die Schriftart und -größe
        crc2.fillText("1$", 930, 205); // Zeichnet den Betrag
        crc2.restore(); // Stellt den gespeicherten Zustand des Canvas wieder her

        crc2.save(); // Speichert den aktuellen Zustand des Canvas

        crc2.beginPath(); // Beginnt einen neuen Pfad
        crc2.arc(730, 500, 50, 0, 2 * Math.PI); // Zeichnet das Smiley-Gesicht
        crc2.fillStyle = "white"; // Setzt die Farbe auf Weiß
        crc2.fill(); // Füllt den Smiley
        crc2.stroke(); // Zeichnet den Umriss des Smiley

        crc2.beginPath(); // Beginnt einen neuen Pfad
        crc2.fillStyle = "black"; // Setzt die Farbe auf Schwarz
        crc2.arc(735, 485, 5, 0, 2 * Math.PI); // Zeichnet das linke Auge
        crc2.arc(755, 485, 5, 0, 2 * Math.PI); // Zeichnet das rechte Auge
        crc2.fill(); // Füllt die Augen

        crc2.beginPath(); // Beginnt einen neuen Pfad
        crc2.arc(730, 500, 35, 0, Math.PI, false); // Zeichnet den lächelnden Mund
        crc2.strokeStyle = "black"; // Setzt die Farbe auf Schwarz
        crc2.stroke(); // Zeichnet den Umriss des Mundes

        crc2.restore(); // Stellt den gespeicherten Zustand des Canvas wieder her

        crc2.save(); // Speichert den aktuellen Zustand des Canvas

        crc2.beginPath(); // Beginnt einen neuen Pfad
        crc2.arc(1130, 500, 50, 0, 2 * Math.PI); // Zeichnet das Smiley-Gesicht
        crc2.fillStyle = "green"; // Setzt die Farbe auf Grün
        crc2.fill(); // Füllt den Smiley
        crc2.stroke(); // Zeichnet den Umriss des Smiley

        crc2.beginPath(); // Beginnt einen neuen Pfad
        crc2.fillStyle = "black"; // Setzt die Farbe auf Schwarz
        crc2.arc(1110, 485, 5, 0, 2 * Math.PI); // Zeichnet das linke Auge
        crc2.arc(1125, 485, 5, 0, 2 * Math.PI); // Zeichnet das rechte Auge
        crc2.fill(); // Füllt die Augen

        crc2.beginPath(); // Beginnt einen neuen Pfad
        crc2.arc(1130, 500, 35, 0, Math.PI, false); // Zeichnet den lächelnden Mund
        crc2.strokeStyle = "black"; // Setzt die Farbe auf Schwarz
        crc2.stroke(); // Zeichnet den Umriss des Mundes

        crc2.restore(); // Stellt den gespeicherten Zustand des Canvas wieder her

        crc2.save(); // Speichert den aktuellen Zustand des Canvas

        crc2.beginPath(); // Beginnt einen neuen Pfad
        crc2.arc(1330, 500, 50, 0, 2 * Math.PI); // Zeichnet das Smiley-Gesicht
        crc2.fillStyle = "red"; // Setzt die Farbe auf Rot
        crc2.fill(); // Füllt den Smiley
        crc2.stroke(); // Zeichnet den Umriss des Smiley

        crc2.beginPath(); // Beginnt einen neuen Pfad
        crc2.fillStyle = "black"; // Setzt die Farbe auf Schwarz
        crc2.arc(1310, 485, 5, 0, 2 * Math.PI); // Zeichnet das linke Auge
        crc2.arc(1325, 485, 5, 0, 2 * Math.PI); // Zeichnet das rechte Auge
        crc2.fill(); // Füllt die Augen

        crc2.beginPath(); // Beginnt einen neuen Pfad
        crc2.arc(1330, 500, 35, 0, Math.PI, false); // Zeichnet den lächelnden Mund
        crc2.strokeStyle = "black"; // Setzt die Farbe auf Schwarz
        crc2.stroke(); // Zeichnet den Umriss des Mundes

        crc2.restore(); // Stellt den gespeicherten Zustand des Canvas wieder her

        crc2.save(); // Speichert den aktuellen Zustand des Canvas
        crc2.fillStyle = "#8B4513"; // Setzt die Farbe auf Braun
        crc2.fillRect(1880, 400, 200, 200); // Zeichnet die Tür
        crc2.restore(); // Stellt den gespeicherten Zustand des Canvas wieder her

        crc2.save(); // Speichert den aktuellen Zustand des Canvas    
        crc2.fillStyle = "#1B98E0"; // Setzt die Farbe auf Blau
        crc2.fillRect(150, 100, 410, 50); // Zeichnet den Kasten für "Bestellung"

        crc2.strokeStyle = "#000000"; // Setzt die Farbe des Rahmens auf Schwarz
        crc2.lineWidth = 5; // Setzt die Dicke des Rahmens
        crc2.strokeRect(150, 100, 410, 50); // Zeichnet den Rahmen um den Kasten

        crc2.fillStyle = "#000000"; // Setzt die Textfarbe auf Schwarz
        crc2.font = "35px 'Brush Script MT'"; // Setzt die Schriftart und -größe
        crc2.fillText("Bestellung", 310, 130); // Zeichnet den Text "Bestellung"
        crc2.restore(); // Stellt den gespeicherten Zustand des Canvas wieder her
        crc2.fillStyle = "#1B98E0"; // Setzt die Farbe auf Blau
        crc2.fillRect(150, 100, 410, 50); // Zeichnet den Kasten für "Bestellung"
        crc2.fillStyle = "#000000"; // Setzt die Textfarbe auf Schwarz
        crc2.font = "35px 'Brush Script MT'"; // Setzt die Schriftart und -größe
        crc2.fillText("Bestellung", 310, 130); // Zeichnet den Text "Bestellung"
        crc2.restore(); // Stellt den gespeicherten Zustand des Canvas wieder her

        const gridStartX = 150; // Startposition X des Grids
        const gridStartY = 190; // Startposition Y des Grids

        const boxWidth = 200; // Breite jedes Kästchens
        const boxHeight = 200; // Höhe jedes Kästchens

        const boxMargin = 10; // Abstand zwischen den Kästchen

        // Schleife zum Zeichnen des 2x3 Grids
        for (let row = 0; row < 3; row++) { 
            for (let col = 0; col < 2; col++) { 
                const x = gridStartX + col * (boxWidth + boxMargin); // Berechnet die x-Position
                const y = gridStartY + row * (boxHeight + boxMargin); // Berechnet die y-Position

                crc2.save(); // Speichert den aktuellen Zustand des Canvas
                crc2.fillStyle = "#1B98E0"; // Setzt die Farbe auf Blau
                crc2.fillRect(x, y, boxWidth, boxHeight); // Zeichnet das Kästchen
                crc2.restore(); // Stellt den gespeicherten Zustand des Canvas wieder her
            }
        }

        const buttonsY = gridStartY + 3 * (boxHeight + boxMargin) + 20; // Position der Buttons unterhalb des Grids
        const buttonWidth = 100; // Breite der Buttons
        const buttonHeight = 50; // Höhe der Buttons

        crc2.save(); // Speichert den aktuellen Zustand des Canvas
        crc2.fillStyle = "#4CAF50"; // Setzt die Farbe auf Grün
        crc2.fillRect(250, buttonsY, buttonWidth, buttonHeight); // Zeichnet den Haken-Button
        crc2.fillStyle = "#FFFFFF"; // Setzt die Textfarbe auf Weiß
        crc2.font = "30px Arial"; // Setzt die Schriftart und -größe
        crc2.fillText("✓", 285, buttonsY + 35); // Zeichnet das Haken-Symbol
        crc2.restore(); // Stellt den gespeicherten Zustand des Canvas wieder her

        crc2.save(); // Speichert den aktuellen Zustand des Canvas
        crc2.fillStyle = "#F44336"; // Setzt die Farbe auf Rot
        crc2.fillRect(370, buttonsY, buttonWidth, buttonHeight); // Zeichnet den X-Button
        crc2.fillStyle = "#FFFFFF"; // Setzt die Textfarbe auf Weiß
        crc2.font = "30px Arial"; // Setzt die Schriftart und -größe
        crc2.fillText("✗", 405, buttonsY + 35); // Zeichnet das X-Symbol
        crc2.restore(); // Stellt den gespeicherten Zustand des Canvas wieder her

        crc2.save(); // Speichert den aktuellen Zustand des Canvas
        crc2.fillStyle = "#8B4513"; // Setzt die Farbe auf Braun
        crc2.beginPath(); // Beginnt einen neuen Pfad
        crc2.arc(1560, 840, 100, 0, 2 * Math.PI); // Zeichnet den runden Tisch
        crc2.fill(); // Füllt den Tisch
        crc2.restore(); // Stellt den gespeicherten Zustand des Canvas wieder her

        crc2.save(); // Speichert den aktuellen Zustand des Canvas
        crc2.fillStyle = "#8B4513"; // Setzt die Farbe auf Braun
        crc2.beginPath(); // Beginnt einen neuen Pfad
        crc2.arc(1600, 170, 100, 0, 2 * Math.PI); // Zeichnet den runden Tisch
        crc2.fill(); // Füllt den Tisch
        crc2.restore(); // Stellt den gespeicherten Zustand des Canvas wieder her

        crc2.save(); // Speichert den aktuellen Zustand des Canvas
        crc2.fillStyle = "#D2691E"; // Setzt die Farbe auf Helleres Braun
        crc2.fillRect(1540, 280, 80, 80); // Zeichnet die Sitzfläche des Stuhls
        crc2.fillStyle = "#A0522D"; // Setzt die Farbe auf Dunkleres Braun
        crc2.fillRect(1540, 360, 80, 20); // Zeichnet die Lehne des Stuhls
        crc2.fillRect(1530, 280, 10, 80); // Zeichnet die linke Armlehne des Stuhls
        crc2.fillRect(1620, 280, 10, 80); // Zeichnet die rechte Armlehne des Stuhls
        crc2.restore(); // Stellt den gespeicherten Zustand des Canvas wieder her

        crc2.save(); // Speichert den aktuellen Zustand des Canvas
        crc2.fillStyle = "#D2691E"; // Setzt die Farbe auf Helleres Braun
        crc2.fillRect(1520, 630, 80, 80); // Zeichnet die Sitzfläche des Stuhls
        crc2.fillStyle = "#A0522D"; // Setzt die Farbe auf Dunkleres Braun
        crc2.fillRect(1520, 610, 80, 20); // Zeichnet die Lehne des Stuhls
        crc2.fillRect(1510, 630, 10, 80); // Zeichnet die linke Armlehne des Stuhls
        crc2.fillRect(1600, 630, 10, 80); // Zeichnet die rechte Armlehne des Stuhls
        crc2.restore(); // Stellt den gespeicherten Zustand des Canvas wieder her

        crc2.save(); // Speichert den aktuellen Zustand des Canvas
        crc2.fillStyle = "#D2691E"; // Setzt die Farbe auf Helleres Braun
        crc2.fillRect(1380, 130, 80, 80); // Zeichnet die Sitzfläche des Stuhls
        crc2.fillStyle = "#A0522D"; // Setzt die Farbe auf Dunkleres Braun

        crc2.translate(1340 + 40, 280 + 40); // Verschiebt den Ursprung zum Mittelpunkt der Sitzfläche
        crc2.rotate(Math.PI / 2); // Dreht um 90 Grad
        crc2.translate(-(1340 + 40), -(280 + 40)); // Verschiebt den Ursprung zurück

        crc2.fillRect(1190, 320, 80, 20); // Zeichnet die Lehne des Stuhls
        crc2.fillRect(1180, 240, 10, 80); // Zeichnet die linke Armlehne des Stuhls
        crc2.fillRect(1270, 240, 10, 80); // Zeichnet die rechte Armlehne des Stuhls
        crc2.restore(); // Stellt den gespeicherten Zustand des Canvas wieder her

        crc2.save(); // Speichert den aktuellen Zustand des Canvas
        crc2.fillStyle = "#D2691E"; // Setzt die Farbe auf Helleres Braun
        crc2.fillRect(1375, 800, 80, 80); // Zeichnet die Sitzfläche des Stuhls
        crc2.fillStyle = "#A0522D"; // Setzt die Farbe auf Dunkleres Braun

        crc2.translate(1340 + 40, 280 + 40); // Verschiebt den Ursprung zum Mittelpunkt der Sitzfläche
        crc2.rotate(Math.PI / 2); // Dreht um 90 Grad
        crc2.translate(-(1340 + 40), -(280 + 40)); // Verschiebt den Ursprung zurück

        crc2.fillRect(1860, 325, 80, 20); // Zeichnet die Lehne des Stuhls
        crc2.fillRect(1940, 245, 10, 80); // Zeichnet die linke Armlehne des Stuhls
        crc2.fillRect(1850, 245, 10, 80); // Zeichnet die rechte Armlehne des Stuhls
        crc2.restore(); // Stellt den gespeicherten Zustand des Canvas wieder her

        crc2.save(); // Speichert den aktuellen Zustand des Canvas
        crc2.fillStyle = "#D2691E"; // Setzt die Farbe auf Helleres Braun
        crc2.fillRect(1665, 800, 80, 80); // Zeichnet die Sitzfläche des Stuhls
        crc2.fillStyle = "#A0522D"; // Setzt die Farbe auf Dunkleres Braun

        crc2.translate(1340 + 40, 280 + 40); // Verschiebt den Ursprung zum Mittelpunkt der Sitzfläche
        crc2.rotate(Math.PI / 2); // Dreht um 90 Grad
        crc2.translate(-(1340 + 40), -(280 + 40)); // Verschiebt den Ursprung zurück

        crc2.fillRect(1860, -65, 80, 20); // Zeichnet die Lehne des Stuhls
        crc2.fillRect(1940, -45, 10, 80); // Zeichnet die linke Armlehne des Stuhls
        crc2.fillRect(1850, -45, 10, 80); // Zeichnet die rechte Armlehne des Stuhls
        crc2.restore(); // Stellt den gespeicherten Zustand des Canvas wieder her

        crc2.save(); // Speichert den aktuellen Zustand des Canvas
        crc2.beginPath(); // Beginnt einen neuen Pfad
        crc2.moveTo(850, 700); // Setzt den Startpunkt
        crc2.lineTo(830, 645); // Zeichnet die rechte Seite der Waffel
        crc2.lineTo(870, 645); // Zeichnet die linke Seite der Waffel
        crc2.closePath(); // Schließt den Pfad
        crc2.fillStyle = "#A0522D"; // Setzt die Farbe auf Hellbraun
        crc2.fill(); // Füllt die Waffel

        crc2.beginPath(); // Beginnt einen neuen Pfad
        crc2.arc(850, 608, 20, 0, 2 * Math.PI); // Zeichnet die mittlere Kugel
        crc2.fillStyle = "#FFD700"; // Setzt die Farbe auf Goldgelb
        crc2.fill(); // Füllt die Kugel

        crc2.beginPath(); // Beginnt einen neuen Pfad
        crc2.arc(840, 630, 20, 0, 2 * Math.PI); // Zeichnet die obere Kugel
        crc2.fillStyle = "#8A2BE2"; // Setzt die Farbe auf Blauviolett
        crc2.fill(); // Füllt die Kugel

        crc2.beginPath(); // Beginnt einen neuen Pfad
        crc2.arc(865, 630, 20, 0, 2 * Math.PI); // Zeichnet die untere Kugel
        crc2.fillStyle = "#FF6347"; // Setzt die Farbe auf Tomatenrot
        crc2.fill(); // Füllt die Kugel

        crc2.restore(); // Stellt den gespeicherten Zustand des Canvas wieder her
    }

    // Event-Listener für das DOMContentLoaded-Event
    document.addEventListener("DOMContentLoaded", () => {                        
        const canvas = document.getElementById("myCanvas") as HTMLCanvasElement; // Canvas-Element abrufen
        const crc2 = canvas.getContext("2d")!; // 2D-Kontext des Canvas-Elements abrufen
        drawScene(crc2); // Szene zeichnen
    });

    const allObjects: any[] = []; // Erstellen eines Arrays für alle zu zeichnenden Objekte

    // Funktion zum Zeichnen der Szene
    function drawScene(crc2: CanvasRenderingContext2D) {                      
        drawBackground(crc2); // Hintergrund zeichnen
        for (const obj of allObjects) { // Schleife über alle Objekte
            obj.draw(crc2); // Objekt zeichnen
        }
    }
}
