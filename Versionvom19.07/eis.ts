namespace Eisdiele {

    export interface IceCream {
        name: string;
        color: string;
    }
    
    export const iceCreamFlavors: IceCream[] = [
        { name: "Himbeere", color: "#FFC0CB" },
        { name: "Mango", color: "#FFD700" },
        { name: "Blaubeere", color: "#ADD8E6" },
        { name: "Pistazie", color: "#90EE90" }
    ];
    
}