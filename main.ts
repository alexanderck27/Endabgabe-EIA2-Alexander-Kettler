

namespace Eisdiele {
    window.addEventListener("load", handleLoad);

    export let crc2: CanvasRenderingContext2D;
    export let allObjects: Drawable[] = [];

    function handleLoad(_event: Event): void {
        const canvas: HTMLCanvasElement | null = document.querySelector("#myCanvas");
        if (!canvas) return;
        crc2 = canvas.getContext("2d") as CanvasRenderingContext2D;
        canvas.addEventListener("click", handleClick);
        generateContent(); // Diese Funktion muss definiert werden

        drawBackground();
        setInterval(animate, 40);
    }

    function animate(): void {
        drawBackground();
        for (let object of allObjects) {
            object.update();
            object.draw();
        }
    }

    function handleClick(_event: MouseEvent): void {
        console.log("canvas is clicked");
    }
}
