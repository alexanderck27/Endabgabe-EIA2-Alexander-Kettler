"use strict";
class IceCream {
    flavor;
    color;
    static flavors = [
        { flavor: "Chocolate", color: "#8b4513" },
        { flavor: "Lemon", color: "#fff44f" },
        { flavor: "Mango", color: "#FFBE0B" },
        { flavor: "Himbeere", color: "#e30b5d" }
    ];
    constructor(flavor, color) {
        this.flavor = flavor;
        this.color = color;
    }
    static getRandomFlavor() {
        let randomIndex = Math.floor(Math.random() * IceCream.flavors.length);
        let flavor = IceCream.flavors[randomIndex].flavor;
        let color = IceCream.flavors[randomIndex].color;
        return new IceCream(flavor, color);
    }
}
class IceCreamCup {
    scoops; // Kugeln
    constructor() {
        this.scoops = []; // Initialisierung des Kugel-Arrays
    }
    addScoop(scoop) {
        this.scoops.push(scoop); // Kugel zum Array hinzufügen
    }
    describeCup() {
        console.log(`This ice cream cup contains ${this.scoops.length} scoops:`); // Ausgabe der Anzahl der Kugeln
        this.scoops.forEach((scoop, index) => {
            console.log(`${index + 1}: Flavor - ${scoop.flavor}, Color - ${scoop.color}`);
        });
    }
}
class Vector {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
//# sourceMappingURL=eis.js.map