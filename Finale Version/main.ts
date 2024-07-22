namespace Eisdiele {

    let crc2: CanvasRenderingContext2D;
    let allCustomers: Kunde[] = [];
    let totalEarnings: number = 0;
    let spawnInterval: number = 10000; // Spawn-Zeit von 10000 ms


    
    document.addEventListener("DOMContentLoaded", () => {
        const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
        crc2 = canvas.getContext("2d")!;
        Eisdiele.drawBackground(crc2); 
        startGame();

         // Play background audio (funktioniert noch nicht)
         const audioElement = document.getElementById("backgroundAudio") as HTMLAudioElement;
         audioElement.play();
         crc2 = canvas.getContext("2d")!;
         Eisdiele.drawBackground(crc2); 

        canvas.addEventListener("click", handleCanvasClick); 
    });



    // Spiel starten
    function startGame(): void {         
        setInterval(gameLoop, 1000 / 40); // 40 FPS Game Loop
        spawnCustomer();                  
    }


    // Game Loop
    function gameLoop(): void {                                     
        crc2.clearRect(0, 0, crc2.canvas.width, crc2.canvas.height); 
        Eisdiele.drawBackground(crc2);                               
        updateCustomers();                                         
    }





    // Neue Smileys spawnen
    function spawnCustomer(): void { 
        const newCustomer = new Kunde({ x: crc2.canvas.width, y: crc2.canvas.height / 2 }, { x: 10, y: 0 }, crc2.canvas.width, crc2.canvas.height); // Startet rechts
        allCustomers.push(newCustomer);       // Fügt den Kunden zur Liste hinzu
        newCustomer.draw(crc2);             

        // Reduziert die Spawn-Zeit um 400 ms, aber nicht weniger als 500 ms
        spawnInterval = Math.max(spawnInterval - 400, 500); // --------------------------------------------Geschwindigkeit hier einstellen------------------------------------------------------------------------------

        // Setze den Timer für den nächsten Kunden-Spawn
        setTimeout(spawnCustomer, spawnInterval);
    }






    function updateCustomers(): void {          // Update und zeichne alle Kunden
        for (const customer of allCustomers) {  
            customer.update(allCustomers);     
            customer.draw(crc2);               
        }
    }





    function handleCanvasClick(event: MouseEvent): void {   // Event-Handler für Klicks auf den Canvas
        const canvas = event.target as HTMLCanvasElement;   
        const x = event.clientX - canvas.offsetLeft;        
        const y = event.clientY - canvas.offsetTop;       

        for (const customer of allCustomers) {                   // Überprüft, ob ein Kunde an der geklickten Position ist
            if (isCustomerClicked(customer, x, y) && customer.getState() !== "waiting") {    // Wenn ja, ändere den Zustand des Kunden - außer er wartet

                if (customer.getState() === "waiting") {         
                    customer.setState("ordering");             
                    customer.generateOrder();                    // Generiere eine Bestellung

                } else if (customer.getState() === "ordering") { 
                    customer.setState("seating");                

                } else if (customer.getState() === "eating") {   
                    customer.setState("paying");                 

                } else if (customer.getState() === "paying") {   
                    totalEarnings += customer.getOrder().length; // erhöhe die Einnahmen um die Anzahl der Bestellungen
                    customer.setState("leaving");                
                }
            }
        }
    }





    function isCustomerClicked(customer: Kunde, x: number, y: number): boolean { // Überprüft, ob ein Kunde an einer bestimmten Position geklickt wurde
        const dx = customer.getPosition().x - x;                                 
        const dy = customer.getPosition().y - y;                                 
        return dx * dx + dy * dy <= 50 * 50;                                     // Kunden haben einen Klick-Radius von 50
    }
}
