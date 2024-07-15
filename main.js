"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drawables_1 = require("./drawables");
var Eisdiele;
(function (Eisdiele) {
    window.addEventListener("load", handleLoad);
    Eisdiele.allObjects = [];
    function handleLoad(_event) {
        const canvas = document.querySelector("#myCanvas");
        if (!canvas)
            return;
        Eisdiele.crc2 = canvas.getContext("2d");
        canvas.addEventListener("click", handleClick);
        generateContent(); // Diese Funktion muss definiert werden
        (0, drawables_1.drawBackground)();
        setInterval(animate, 40);
    }
    function animate() {
        (0, drawables_1.drawBackground)();
        for (let object of Eisdiele.allObjects) {
            object.update();
            object.draw();
        }
    }
    function handleClick(_event) {
        console.log("canvas is clicked");
    }
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=main.js.map