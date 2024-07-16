namespace Eisdiele {
class IceCream {
    flavor: string;
    color: string;
    static flavors: { flavor: string, color: string }[] = [
        { flavor: "Chocolate", color: "#8b4513" },
        { flavor: "Lemon", color: "#fff44f" },
        { flavor: "Mango", color: "#FFBE0B" },
        { flavor: "Himbeere", color: "#e30b5d" }
    ];

    constructor(flavor: string, color: string) {
        this.flavor = flavor;
        this.color = color;
    }

    static getRandomFlavor(): IceCream {
        let randomIndex: number = Math.floor(Math.random() * IceCream.flavors.length);
        let flavor = IceCream.flavors[randomIndex].flavor;
        let color = IceCream.flavors[randomIndex].color;
        return new IceCream(flavor, color);
    }
}

class IceCreamCup { // Eisbecher
    scoops: IceCream[]; // Kugeln
 
    constructor() { // Konstruktor
        this.scoops = []; // Initialisierung des Kugel-Arrays
    }

    addScoop(scoop: IceCream) { // Kugel hinzufügen
        this.scoops.push(scoop);  // Kugel zum Array hinzufügen
    }

    describeCup(): void { // Eisbecher beschreiben
        console.log(`This ice cream cup contains ${this.scoops.length} scoops:`); // Ausgabe der Anzahl der Kugeln
        this.scoops.forEach((scoop, index) => {
            console.log(`${index + 1}: Flavor - ${scoop.flavor}, Color - ${scoop.color}`);
        });
    }
}



class Vector {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
}