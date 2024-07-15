namespace Eisdiele {
    window.addEventListener("load", handleLoad);

    export let crc2: CanvasRenderingContext2D;
    export let allObjects: Drawable[] = [];

    interface Drawable {
        update(): void;
        draw(): void;
    }

    function handleLoad(_event: Event): void {
        const canvas: HTMLCanvasElement | null = document.querySelector("#myCanvas");
        if (!canvas) return;
        crc2 = canvas.getContext("2d") as CanvasRenderingContext2D;
        canvas.addEventListener("click", handleClick);
        generateContent();

        drawBackground();
        setInterval(animate, 40);
    }

    function generateContent(): void {
        // Implementierung der Logik zur Inhaltsinitialisierung
    }

    function animate(): void { // Animationsschleife
        drawBackground(); // Hintergrund zeichnen
        for (let object of allObjects) { // Schleife über alle Objekte
            object.update(); // Objekt updaten
            object.draw(); // Objekt zeichnen
        }
    }

    function handleClick(_event: MouseEvent): void { // Klick-Event
        console.log("canvas is clicked"); // Konsolenausgabe 
    }

    function drawBackground(): void { // Hintergrund zeichnen
        // Implementierung der Logik zum Zeichnen des Hintergrunds
    }
}
