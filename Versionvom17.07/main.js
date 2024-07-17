"use strict";
var Eisdiele;
(function (Eisdiele) {
    let crc2;
    let allCustomers = [];
    let totalEarnings = 0;
    document.addEventListener("DOMContentLoaded", () => {
        const canvas = document.getElementById("myCanvas");
        crc2 = canvas.getContext("2d");
        Eisdiele.drawBackground(crc2); // Korrekte Referenz auf drawBackground
        startGame();
        canvas.addEventListener("click", handleCanvasClick);
    });
    function startGame() {
        setInterval(gameLoop, 1000 / 30);
        setInterval(spawnCustomer, 30000);
    }
    function gameLoop() {
        crc2.clearRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        Eisdiele.drawBackground(crc2); // Korrekte Referenz auf drawBackground
        updateCustomers();
    }
    function spawnCustomer() {
        const newCustomer = new Eisdiele.Kunde({ x: crc2.canvas.width, y: crc2.canvas.height / 2 }, { x: -2, y: 0 }, crc2.canvas.width, crc2.canvas.height);
        allCustomers.push(newCustomer);
    }
    function updateCustomers() {
        for (const customer of allCustomers) {
            customer.update(allCustomers);
            customer.draw(crc2);
        }
    }
    function handleCanvasClick(event) {
        const canvas = event.target;
        const x = event.clientX - canvas.offsetLeft;
        const y = event.clientY - canvas.offsetTop;
        for (const customer of allCustomers) {
            if (isCustomerClicked(customer, x, y)) {
                if (customer.getState() === "waiting") {
                    customer.setState("ordering");
                    customer.generateOrder();
                }
                else if (customer.getState() === "ordering") {
                    customer.setState("seating");
                }
                else if (customer.getState() === "eating") {
                    customer.setState("paying");
                }
                else if (customer.getState() === "paying") {
                    totalEarnings += customer.getOrder().length;
                    customer.setState("leaving");
                }
            }
        }
    }
    function isCustomerClicked(customer, x, y) {
        const dx = customer.getPosition().x - x;
        const dy = customer.getPosition().y - y;
        return dx * dx + dy * dy <= 20 * 20; // Kunden haben einen Radius von 20
    }
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=main.js.map