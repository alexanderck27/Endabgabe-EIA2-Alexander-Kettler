namespace Eisdiele {
    export abstract class Moveable implements Drawable {
        protected position: { x: number, y: number };
        protected velocity: { x: number, y: number };

        constructor(position: { x: number, y: number }, velocity: { x: number, y: number }) {
            this.position = position;
            this.velocity = velocity;
        }

        public move(): void {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        }

        abstract draw(crc2: CanvasRenderingContext2D): void;
    }
}
