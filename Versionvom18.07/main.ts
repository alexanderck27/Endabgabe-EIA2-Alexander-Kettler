namespace Eisdiele {
    
    let crc2: CanvasRenderingContext2D;
    let allCustomers: Kunde[] = [];
    let totalEarnings: number = 0;

    document.addEventListener("DOMContentLoaded", () => {
        const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
        crc2 = canvas.getContext("2d")!;
        Eisdiele.drawBackground(crc2); // Korrekte Referenz auf drawBackground
        startGame();

        canvas.addEventListener("click", handleCanvasClick); // Event-Handler für Klicks auf den Canvas
    });

    function startGame(): void {          // Startet das Spiel
        setInterval(gameLoop, 1000 / 40); // 40 FPS Game Loop
        setInterval(spawnCustomer, 5000); // Spawn every 1 seconds for testing
    }

    function gameLoop(): void {
        crc2.clearRect(0, 0, crc2.canvas.width, crc2.canvas.height); // Clear the canvas
        Eisdiele.drawBackground(crc2);                               // Redraw the background
        updateCustomers();                                           // Update and draw customers
    }

    function spawnCustomer(): void { // Spawnt einen neuen Kunden
        const newCustomer = new Kunde({ x: crc2.canvas.width, y: crc2.canvas.height / 2 }, { x: 10, y: 0 }, crc2.canvas.width, crc2.canvas.height); // Startet rechts
        allCustomers.push(newCustomer); // Fügt den Kunden zur Liste hinzu
        newCustomer.draw(crc2);                // Zeichne den Kunden
    }

    function updateCustomers(): void {          // Update und zeichne alle Kunden
        for (const customer of allCustomers) {  // Schleife über alle Kunden
            customer.update(allCustomers);      // Update den Kunden
            customer.draw(crc2);                // Zeichne den Kunden
        }
    }

    function handleCanvasClick(event: MouseEvent): void {   // Event-Handler für Klicks auf den Canvas
        const canvas = event.target as HTMLCanvasElement;   // Canvas-Element, auf das geklickt wurde
        const x = event.clientX - canvas.offsetLeft;        // X-Position des Klicks
        const y = event.clientY - canvas.offsetTop;         // Y-Position des Klicks

        for (const customer of allCustomers) {                   // Überprüft, ob ein Kunde an der geklickten Position ist
            if (isCustomerClicked(customer, x, y)) {             // Wenn ja, ändere den Zustand des Kunden
                if (customer.getState() === "waiting") {         // z.B. von "waiting" zu "ordering"
                    customer.setState("ordering");               // oder von "eating" zu "paying"
                    customer.generateOrder();                    // Generiere eine Bestellung
                } else if (customer.getState() === "ordering") { // oder starte den Bezahlvorgang
                    customer.setState("seating");                // wenn der Kunde fertig bestellt hat
                } else if (customer.getState() === "eating") {   // oder entferne den Kunden, wenn er bezahlt hat
                    customer.setState("paying");                 // und das Eis gegessen hat
                } else if (customer.getState() === "paying") {   // oder wenn er zu lange gewartet hat
                    totalEarnings += customer.getOrder().length; // erhöhe die Einnahmen um die Anzahl der Bestellungen
                    customer.setState("leaving");                // und entferne den Kunden
                }
            }
        }
    }

    function isCustomerClicked(customer: Kunde, x: number, y: number): boolean { // Überprüft, ob ein Kunde an einer bestimmten Position geklickt wurde
        const dx = customer.getPosition().x - x;                                 // (z.B. um den Bestellvorgang zu starten)
        const dy = customer.getPosition().y - y;                                 // oder um zu bezahlen
        return dx * dx + dy * dy <= 20 * 20;                                     // Kunden haben einen Radius von 20
    }
}
