"use strict";
var Eisdiele;
(function (Eisdiele) {
    function drawBackground(crc2) {
        crc2.save(); // Speichern des aktuellen Zustands
        const size = 50; // Größe eines Karos
        const rows = Math.ceil(crc2.canvas.height / size); // Anzahl der Reihen
        const cols = Math.ceil(crc2.canvas.width / size); // Anzahl der Spalten
        for (let row = 0; row < rows; row++) { // Schleife über alle Reihen
            for (let col = 0; col < cols; col++) { // Schleife über alle Spalten
                crc2.fillStyle = (row + col) % 2 === 0 ? "#ffffff" : "#000000"; // Wechsel zwischen Schwarz und Weiß
                crc2.fillRect(col * size, row * size, size, size); // Zeichnen eines Quadrats
            }
        }
        crc2.restore(); // Wiederherstellen des gespeicherten Zustands
        drawIceCreamParlor(); // Eisladen zeichnen
    }
    Eisdiele.drawBackground = drawBackground;
    function drawIceCreamParlor() {
        // Zeichnen der Theke
        Eisdiele.crc2.save(); // Speichern des aktuellen Zustands
        Eisdiele.crc2.fillStyle = "#8B4513"; // Braun
        const borderWidth = 80; // Dicke des Rahmens
        Eisdiele.crc2.strokeStyle = "grey"; // Farbe des Rahmens
        Eisdiele.crc2.lineWidth = borderWidth; // Dicke des Rahmens
        Eisdiele.crc2.strokeRect(0, 0, Eisdiele.crc2.canvas.width, Eisdiele.crc2.canvas.height); // Rahmen um den gesamten Canvas
        Eisdiele.crc2.fillRect(800, 300, 220, 450); // Theke
        Eisdiele.crc2.restore(); // Wiederherstellen des gespeicherten Zustands
        // Zeichnen des Tresens
        Eisdiele.crc2.save(); // Speichern des aktuellen Zustands
        Eisdiele.crc2.fillStyle = "#d2b48c"; // Hellbraun
        Eisdiele.crc2.fillRect(810, 310, 200, 430); // Tresen
        Eisdiele.crc2.restore(); // Wiederherstellen des gespeicherten Zustands
        // Zeichnen des kleineren Tresens für die Kasse mit braunem Rand
        Eisdiele.crc2.save(); // Speichern des aktuellen Zustands
        Eisdiele.crc2.fillStyle = "#d2b48c"; // Hellbraun, gleiche Farbe wie der Haupttresen
        Eisdiele.crc2.fillRect(800, 800, 200, 200); // Position und Größe des kleineren Tresens
        Eisdiele.crc2.strokeStyle = "#8b4513"; // Dunkelbraun für den Rand
        Eisdiele.crc2.lineWidth = 10; // Dicke des Randes
        Eisdiele.crc2.strokeRect(800, 800, 200, 200); // Zeichnen des Randes um den kleineren Tresen
        Eisdiele.crc2.restore(); // Wiederherstellen des gespeicherten Zustands
        // Zeichnen von vier Eissorten im größeren Tresen, untereinander angeordnet
        const colors = ["#FFC0CB", "#FFD700", "#ADD8E6", "#90EE90"]; // Farben der Rechtecke
        const rectWidth = 100; // Breite der Rechtecke
        const rectHeight = 50; // Höhe der Rechtecke, angepasst um innerhalb der Theke zu bleiben
        const spacing = 10; // Abstand zwischen den Rechtecken
        const startX = 850 + spacing; // Startposition X, unverändert
        let startY = 360 + spacing; // Startposition Y, wird für jedes Rechteck aktualisiert
        Eisdiele.crc2.save(); // Speichern des aktuellen Zustands
        for (let i = 0; i < colors.length; i++) {
            Eisdiele.crc2.fillStyle = colors[i]; // Setzen der Füllfarbe
            Eisdiele.crc2.fillRect(startX, startY, rectWidth, rectHeight); // Zeichnen des Rechtecks
            Eisdiele.crc2.strokeStyle = "black"; // Farbe des Rahmens
            Eisdiele.crc2.lineWidth = 2; // Dicke des Rahmens
            Eisdiele.crc2.strokeRect(startX, startY, rectWidth, rectHeight); // Zeichnen des Rahmens
            // Text hinzufügen
            const text = `Eis ${i + 1}`; // Text, der zu jeder Box hinzugefügt wird
            Eisdiele.crc2.save(); // Speichern des Zustands vor der Rotation
            Eisdiele.crc2.translate(startX + rectWidth / 3.7, startY + rectHeight / 2); // Verschieben des Ursprungs zur Mitte der Box
            Eisdiele.crc2.rotate(-Math.PI / 2); // Drehen um -90 Grad
            Eisdiele.crc2.textAlign = "center"; // Zentrieren des Texts
            Eisdiele.crc2.fillStyle = "black"; // Textfarbe
            Eisdiele.crc2.fillText(text, 0, 0); // Zeichnen des Texts
            Eisdiele.crc2.restore(); // Wiederherstellen des Zustands vor der Rotation
            startY += rectHeight + spacing; // Update der Y-Position für das nächste Rechteck
        }
        Eisdiele.crc2.restore(); // Wiederherstellen des gespeicherten Zustands
        // Zeichnen einer alten Registrierkasse auf dem kleineren Tresen
        Eisdiele.crc2.save(); // Speichern des aktuellen Zustands
        // Ursprung der Transformationen in die Mitte der Registrierkasse verschieben
        Eisdiele.crc2.translate(900, 880); // Ursprüngliche Mitte der Kasse
        Eisdiele.crc2.rotate(-Math.PI / 2); // 90 Grad gegen den Uhrzeigersinn drehen
        Eisdiele.crc2.translate(-900, -880); // Ursprung zurück verschieben
        // Grundkörper der Registrierkasse
        Eisdiele.crc2.fillStyle = "#696969"; // Dunkelgrau für den Körper der Kasse
        Eisdiele.crc2.fillRect(850, 850, 100, 60); // Zentral auf dem Tresen positioniert
        // Tastenfeld der Registrierkasse
        Eisdiele.crc2.fillStyle = "#808080"; // Mittelgrau für das Tastenfeld
        Eisdiele.crc2.fillRect(855, 855, 40, 30); // Innerhalb des Körper der Kasse
        // Anzeige der Registrierkasse
        Eisdiele.crc2.fillStyle = "#FFFFFF"; // Weiß für die Anzeige
        Eisdiele.crc2.fillRect(900, 855, 45, 20); // Neben dem Tastenfeld
        // Text auf der Anzeige
        Eisdiele.crc2.fillStyle = "#000000"; // Schwarz für den Text
        Eisdiele.crc2.font = "10px Arial"; // Schriftart und -größe
        Eisdiele.crc2.fillText("Total", 905, 865); // Text und Position auf der Anzeige
        Eisdiele.crc2.restore(); // Wiederherstellen des gespeicherten Zustands
        // Zeichnen des Hintergrunds für Bestellauswahl
        Eisdiele.crc2.save(); // Speichern des aktuellen Zustands
        Eisdiele.crc2.fillStyle = "#605856"; // Dunkelgrau für den Hintergrund
        Eisdiele.crc2.fillRect(110, 60, 500, 870); // Hintergrund
        Eisdiele.crc2.restore(); // Wiederherstellen des gespeicherten Zustands
        // grauen Rahmen um den Kasten zeichnen
        Eisdiele.crc2.strokeStyle = "darkgrey"; // Rahmenfarbe: Schwarz
        Eisdiele.crc2.lineWidth = 5; // Dicke des Rahmens
        Eisdiele.crc2.strokeRect(110, 60, 500, 870); // Position und Größe des Rahmens
        // Zeichnen des Hintergrunds für den Einnahmencounter
        Eisdiele.crc2.save(); // Speichern des aktuellen Zustands
        Eisdiele.crc2.fillStyle = "#605856"; // Dunkelgrau für den Hintergrund
        Eisdiele.crc2.fillRect(710, 60, 500, 200); // Hintergrund
        Eisdiele.crc2.restore(); // Wiederherstellen des gespeicherten Zustands
        // grauen Rahmen um den Kasten zeichnen
        Eisdiele.crc2.strokeStyle = "darkgrey"; // Rahmenfarbe: Schwarz
        Eisdiele.crc2.lineWidth = 5; // Dicke des Rahmens
        Eisdiele.crc2.strokeRect(710, 60, 500, 200); // Position und Größe des Rahmens
        Eisdiele.crc2.fillStyle = "#000000"; // Textfarbe
        Eisdiele.crc2.font = "35px 'Brush Script MT'"; // Schriftart und -größe
        Eisdiele.crc2.fillText("Tageseinnahmen", 860, 130); // Text und Position
        Eisdiele.crc2.restore(); // Wiederherstellen des gespeicherten Zustands
        Eisdiele.crc2.fillStyle = "#1B98E0"; // Blau für den Kasten
        Eisdiele.crc2.fillRect(750, 100, 410, 50); // Position und Größe des Kastens
        Eisdiele.crc2.fillStyle = "#000000"; // Textfarbe
        Eisdiele.crc2.font = "35px 'Brush Script MT'"; // Schriftart und -größe
        Eisdiele.crc2.fillText("Tageseinnahmen:", 860, 130); // Text und Position
        Eisdiele.crc2.restore(); // Wiederherstellen des gespeicherten Zustands
        Eisdiele.crc2.restore(); // Wiederherstellen des gespeicherten Zustands
        Eisdiele.crc2.fillStyle = "#1B98E0"; // Blau für den Kasten
        Eisdiele.crc2.fillRect(750, 170, 410, 50); // Position und Größe des Kastens
        Eisdiele.crc2.fillStyle = "#000000"; // Textfarbe
        Eisdiele.crc2.font = "35px 'Brush Script MT'"; // Schriftart und -größe
        Eisdiele.crc2.fillText("1$", 930, 205); // Text und Position
        Eisdiele.crc2.restore(); // Wiederherstellen des gespeicherten Zustands
        // Smiley 1 zeichnen
        Eisdiele.crc2.save();
        // Gesicht
        Eisdiele.crc2.beginPath();
        Eisdiele.crc2.arc(730, 500, 50, 0, 2 * Math.PI); // Smiley-Gesicht, Position und Größe anpassen
        Eisdiele.crc2.fillStyle = "white"; // Weiße Farbe für das Smiley-Gesicht
        Eisdiele.crc2.fill();
        Eisdiele.crc2.stroke();
        // Augen
        Eisdiele.crc2.beginPath();
        Eisdiele.crc2.fillStyle = "black"; // Rote Farbe für die Augen
        Eisdiele.crc2.arc(735, 485, 5, 0, 2 * Math.PI); // Linkes Auge
        Eisdiele.crc2.arc(755, 485, 5, 0, 2 * Math.PI); // Rechtes Auge
        Eisdiele.crc2.fill();
        // Mund
        Eisdiele.crc2.beginPath();
        Eisdiele.crc2.arc(730, 500, 35, 0, Math.PI, false); // Lächelnder Mund
        Eisdiele.crc2.strokeStyle = "black"; // Schwarze Farbe für den Mund
        Eisdiele.crc2.stroke();
        Eisdiele.crc2.restore();
        // Smiley 2 zeichnen
        Eisdiele.crc2.save();
        // Gesicht
        Eisdiele.crc2.beginPath();
        Eisdiele.crc2.arc(1130, 500, 50, 0, 2 * Math.PI); // Smiley-Gesicht, Position und Größe anpassen
        Eisdiele.crc2.fillStyle = "green"; // Weiße Farbe für das Smiley-Gesicht
        Eisdiele.crc2.fill();
        Eisdiele.crc2.stroke();
        // Augen
        Eisdiele.crc2.beginPath();
        Eisdiele.crc2.fillStyle = "black"; // Rote Farbe für die Augen
        Eisdiele.crc2.arc(1110, 485, 5, 0, 2 * Math.PI); // Linkes Auge
        Eisdiele.crc2.arc(1125, 485, 5, 0, 2 * Math.PI); // Rechtes Auge
        Eisdiele.crc2.fill();
        // Mund
        Eisdiele.crc2.beginPath();
        Eisdiele.crc2.arc(1130, 500, 35, 0, Math.PI, false); // Lächelnder Mund
        Eisdiele.crc2.strokeStyle = "black"; // Schwarze Farbe für den Mund
        Eisdiele.crc2.stroke();
        Eisdiele.crc2.restore();
        // Smiley 3 zeichnen
        Eisdiele.crc2.save();
        // Gesicht
        Eisdiele.crc2.beginPath();
        Eisdiele.crc2.arc(1330, 500, 50, 0, 2 * Math.PI); // Smiley-Gesicht, Position und Größe anpassen
        Eisdiele.crc2.fillStyle = "red"; // Weiße Farbe für das Smiley-Gesicht
        Eisdiele.crc2.fill();
        Eisdiele.crc2.stroke();
        // Augen
        Eisdiele.crc2.beginPath();
        Eisdiele.crc2.fillStyle = "black"; // Rote Farbe für die Augen
        Eisdiele.crc2.arc(1310, 485, 5, 0, 2 * Math.PI); // Linkes Auge
        Eisdiele.crc2.arc(1325, 485, 5, 0, 2 * Math.PI); // Rechtes Auge
        Eisdiele.crc2.fill();
        // Mund
        Eisdiele.crc2.beginPath();
        Eisdiele.crc2.arc(1330, 500, 35, 0, Math.PI, false); // Lächelnder Mund
        Eisdiele.crc2.strokeStyle = "black"; // Schwarze Farbe für den Mund
        Eisdiele.crc2.stroke();
        Eisdiele.crc2.restore();
        // Zeichnen der Tür
        Eisdiele.crc2.save(); // Speichern des aktuellen Zustands
        Eisdiele.crc2.fillStyle = "#8B4513"; // Braun
        Eisdiele.crc2.fillRect(1880, 400, 200, 200); // Tresen
        Eisdiele.crc2.restore(); // Wiederherstellen des gespeicherten Zustands
        // Kasten für "Bestellung" zeichnen
        Eisdiele.crc2.save(); // Speichern des aktuellen Zustands    
        Eisdiele.crc2.fillStyle = "#1B98E0"; // Blau für den Kasten
        Eisdiele.crc2.fillRect(150, 100, 410, 50); // Position und Größe des Kastens
        // Schwarzen Rahmen um den Kasten zeichnen
        Eisdiele.crc2.strokeStyle = "#000000"; // Rahmenfarbe: Schwarz
        Eisdiele.crc2.lineWidth = 5; // Dicke des Rahmens
        Eisdiele.crc2.strokeRect(150, 100, 410, 50); // Position und Größe des Rahmens
        Eisdiele.crc2.fillStyle = "#000000"; // Textfarbe
        Eisdiele.crc2.font = "35px 'Brush Script MT'"; // Schriftart und -größe
        Eisdiele.crc2.fillText("Bestellung", 310, 130); // Text und Position
        Eisdiele.crc2.restore(); // Wiederherstellen des gespeicherten Zustands
        Eisdiele.crc2.fillStyle = "#1B98E0"; // Blau für den Kasten
        Eisdiele.crc2.fillRect(150, 100, 410, 50); // Position und Größe des Kastens
        Eisdiele.crc2.fillStyle = "#000000"; // Textfarbe
        Eisdiele.crc2.font = "35px 'Brush Script MT'"; // Schriftart und -größe
        Eisdiele.crc2.fillText("Bestellung", 310, 130); // Text und Position
        Eisdiele.crc2.restore(); // Wiederherstellen des gespeicherten Zustands
        // Startposition des Grids mit Abstand zum Rand
        const gridStartX = 150; //Pixel vom linken Rand
        const gridStartY = 190; //Pixel vom oberen Rand
        // Größe jedes Kästchens
        const boxWidth = 200;
        const boxHeight = 200;
        // Abstand zwischen den Kästchen
        const boxMargin = 10;
        // Zeichnen des 2x3 Grids
        for (let row = 0; row < 3; row++) { // Für jede Zeile
            for (let col = 0; col < 2; col++) { // Für jede Spalte
                const x = gridStartX + col * (boxWidth + boxMargin); // Berechnung der x-Position
                const y = gridStartY + row * (boxHeight + boxMargin); // Berechnung der y-Position
                Eisdiele.crc2.save(); // Speichern des aktuellen Zustands
                Eisdiele.crc2.fillStyle = "#1B98E0"; // Blau für die Kästchen
                Eisdiele.crc2.fillRect(x, y, boxWidth, boxHeight); // Zeichnen des Kästchens
                Eisdiele.crc2.restore(); // Wiederherstellen des gespeicherten Zustands
            }
        }
        // Position der Buttons unterhalb des Grids
        const buttonsY = gridStartY + 3 * (boxHeight + boxMargin) + 20; // Unterhalb des Grids mit 20px Abstand
        const buttonWidth = 100; // Breite der Buttons
        const buttonHeight = 50; // Höhe der Buttons
        // Button 1: Haken, Bestätigung
        Eisdiele.crc2.save();
        Eisdiele.crc2.fillStyle = "#4CAF50"; // Grüne Farbe für den Haken-Button
        Eisdiele.crc2.fillRect(250, buttonsY, buttonWidth, buttonHeight); // Zeichnen des Buttons
        Eisdiele.crc2.fillStyle = "#FFFFFF"; // Weiße Farbe für den Text
        Eisdiele.crc2.font = "30px Arial"; // Schriftart und -größe
        Eisdiele.crc2.fillText("✓", 285, buttonsY + 35); // Position des Haken-Symbols zentriert im Button
        Eisdiele.crc2.restore();
        // Button 2: X, für Abbruch
        Eisdiele.crc2.save();
        Eisdiele.crc2.fillStyle = "#F44336"; // Rote Farbe für den X-Button
        Eisdiele.crc2.fillRect(370, buttonsY, buttonWidth, buttonHeight); // Zeichnen des Buttons
        Eisdiele.crc2.fillStyle = "#FFFFFF"; // Weiße Farbe für den Text
        Eisdiele.crc2.font = "30px Arial"; // Schriftart und -größe
        Eisdiele.crc2.fillText("✗", 405, buttonsY + 35); // Position des X-Symbols zentriert im Button
        Eisdiele.crc2.restore();
        // Zeichnen des 1. runden Tisches
        Eisdiele.crc2.save();
        Eisdiele.crc2.fillStyle = "#8B4513"; // Braun für den Tisch
        Eisdiele.crc2.beginPath();
        Eisdiele.crc2.arc(1560, 840, 100, 0, 2 * Math.PI); // Zentral auf dem Canvas
        Eisdiele.crc2.fill();
        Eisdiele.crc2.restore();
        // Zeichnen des 2. runden Tisches
        Eisdiele.crc2.save();
        Eisdiele.crc2.fillStyle = "#8B4513"; // Braun für den Tisch
        Eisdiele.crc2.beginPath();
        Eisdiele.crc2.arc(1600, 170, 100, 0, 2 * Math.PI); // Zentral auf dem Canvas
        Eisdiele.crc2.fill();
        Eisdiele.crc2.restore();
        // Zeichnen des 1. Stuhls
        Eisdiele.crc2.save();
        Eisdiele.crc2.fillStyle = "#D2691E"; // Helleres Braun für den Stuhl
        Eisdiele.crc2.fillRect(1540, 280, 80, 80); // Sitzfläche
        Eisdiele.crc2.fillStyle = "#A0522D"; // Dunkleres Braun für die Lehne und Armlehne
        Eisdiele.crc2.fillRect(1540, 360, 80, 20); // Lehne
        Eisdiele.crc2.fillRect(1530, 280, 10, 80); // Linke Armlehne
        Eisdiele.crc2.fillRect(1620, 280, 10, 80); // Rechte Armlehne
        Eisdiele.crc2.restore();
        // Zeichnen des 2. Stuhls
        Eisdiele.crc2.save();
        Eisdiele.crc2.fillStyle = "#D2691E"; // Helleres Braun für den Stuhl
        Eisdiele.crc2.fillRect(1520, 630, 80, 80); // Sitzfläche
        Eisdiele.crc2.fillStyle = "#A0522D"; // Dunkleres Braun für die Lehne und Armlehne
        Eisdiele.crc2.fillRect(1520, 610, 80, 20); // Lehne
        Eisdiele.crc2.fillRect(1510, 630, 10, 80); // Linke Armlehne
        Eisdiele.crc2.fillRect(1600, 630, 10, 80); // Rechte Armlehne
        Eisdiele.crc2.restore();
        // Zeichnen des 3. Stuhls
        Eisdiele.crc2.save();
        Eisdiele.crc2.fillStyle = "#D2691E"; // Helleres Braun für den Stuhl
        Eisdiele.crc2.fillRect(1380, 130, 80, 80); // Sitzfläche
        Eisdiele.crc2.fillStyle = "#A0522D"; // Dunkleres Braun für die Lehne und Armlehne
        Eisdiele.crc2.translate(1340 + 40, 280 + 40); // Verschieben des Ursprungs zum Mittelpunkt der Sitzfläche
        Eisdiele.crc2.rotate(Math.PI / 2); // Drehen um 90 Grad
        Eisdiele.crc2.translate(-(1340 + 40), -(280 + 40)); // Zurückverschieben des Ursprungs
        Eisdiele.crc2.fillRect(1190, 320, 80, 20); // Lehne (ursprünglich unten, jetzt rechts)
        Eisdiele.crc2.fillRect(1180, 240, 10, 80); // Linke Armlehne (ursprünglich links, jetzt oben)
        Eisdiele.crc2.fillRect(1270, 240, 10, 80); // Rechte Armlehne (ursprünglich rechts, jetzt unten)
        Eisdiele.crc2.restore();
        // Zeichnen des 4. Stuhls
        Eisdiele.crc2.save();
        Eisdiele.crc2.fillStyle = "#D2691E"; // Helleres Braun für den Stuhl
        Eisdiele.crc2.fillRect(1375, 800, 80, 80); // Sitzfläche
        Eisdiele.crc2.fillStyle = "#A0522D"; // Dunkleres Braun für die Lehne und Armlehne
        Eisdiele.crc2.translate(1340 + 40, 280 + 40); // Verschieben des Ursprungs zum Mittelpunkt der Sitzfläche
        Eisdiele.crc2.rotate(Math.PI / 2); // Drehen um 90 Grad
        Eisdiele.crc2.translate(-(1340 + 40), -(280 + 40)); // Zurückverschieben des Ursprungs
        Eisdiele.crc2.fillRect(1860, 325, 80, 20); // Lehne (ursprünglich unten, jetzt rechts)
        Eisdiele.crc2.fillRect(1940, 245, 10, 80); // Linke Armlehne (ursprünglich links, jetzt oben)
        Eisdiele.crc2.fillRect(1850, 245, 10, 80); // Rechte Armlehne (ursprünglich rechts, jetzt unten)
        Eisdiele.crc2.restore();
        // Zeichnen des 5. Stuhls
        Eisdiele.crc2.save();
        Eisdiele.crc2.fillStyle = "#D2691E"; // Helleres Braun für den Stuhl
        Eisdiele.crc2.fillRect(1665, 800, 80, 80); // Sitzfläche
        Eisdiele.crc2.fillStyle = "#A0522D"; // Dunkleres Braun für die Lehne und Armlehne
        Eisdiele.crc2.translate(1340 + 40, 280 + 40); // Verschieben des Ursprungs zum Mittelpunkt der Sitzfläche
        Eisdiele.crc2.rotate(Math.PI / 2); // Drehen um 90 Grad
        Eisdiele.crc2.translate(-(1340 + 40), -(280 + 40)); // Zurückverschieben des Ursprungs
        Eisdiele.crc2.fillRect(1860, -65, 80, 20); // Lehne (ursprünglich unten, jetzt rechts)
        Eisdiele.crc2.fillRect(1940, -45, 10, 80); // Linke Armlehne (ursprünglich links, jetzt oben)
        Eisdiele.crc2.fillRect(1850, -45, 10, 80); // Rechte Armlehne (ursprünglich rechts, jetzt unten)
        Eisdiele.crc2.restore();
        // Eiswaffel zeichnen
        Eisdiele.crc2.save();
        // Waffel
        Eisdiele.crc2.beginPath();
        Eisdiele.crc2.moveTo(850, 700); // Spitze der Waffel
        Eisdiele.crc2.lineTo(830, 645); // Rechte Seite der Waffel
        Eisdiele.crc2.lineTo(870, 645); // Linke Seite der Waffel
        Eisdiele.crc2.closePath();
        Eisdiele.crc2.fillStyle = "#A0522D"; // Farbe der Waffel (Hellbraun)
        Eisdiele.crc2.fill();
        // Zweite Kugel (mittig)
        Eisdiele.crc2.beginPath();
        Eisdiele.crc2.arc(850, 608, 20, 0, 2 * Math.PI); // Mittlere Kugel
        Eisdiele.crc2.fillStyle = "#FFD700"; // Farbe der zweiten Kugel (Goldgelb)
        Eisdiele.crc2.fill();
        // Dritte Kugel (oben)
        Eisdiele.crc2.beginPath();
        Eisdiele.crc2.arc(840, 630, 20, 0, 2 * Math.PI); // Obere Kugel
        Eisdiele.crc2.fillStyle = "#8A2BE2"; // Farbe der dritten Kugel (Blauviolett)
        Eisdiele.crc2.fill();
        // Erste Kugel (unten)
        Eisdiele.crc2.beginPath();
        Eisdiele.crc2.arc(865, 630, 20, 0, 2 * Math.PI); // Untere Kugel
        Eisdiele.crc2.fillStyle = "#FF6347"; // Farbe der ersten Kugel (Tomatenrot)
        Eisdiele.crc2.fill();
        Eisdiele.crc2.restore();
    }
    document.addEventListener("DOMContentLoaded", () => {
        const canvas = document.getElementById("myCanvas"); // Canvas-Element
        Eisdiele.crc2 = canvas.getContext("2d"); // 2D-Kontext des Canvas-Elements
        drawScene(); // Szene zeichnen
    });
    function drawScene() {
        drawBackground(Eisdiele.crc2); // Hintergrund zeichnen
        // Zeichnen aller Objekte
        for (const obj of Eisdiele.allObjects) { // Schleife über alle Objekte
            obj.draw(); // Objekt zeichnen
        }
    }
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=drawables.js.map