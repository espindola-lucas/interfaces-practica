"use strict"

class Circle extends Figure {
    constructor(posX, posY, radius, fill, context) {
        super(posX, posY, fill, context);

        this.radius = radius;
    }

    draw() {
        super.draw();
        this.context.beginPath();
        this.context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.context.lineWidth = 5;
        this.context.lineCap = 'round';
        this.context.strokestyle = 'black';
        this.context.stroke();
        this.context.fill();

        if (this.fill instanceof Image) {
            console.log(this.fill)
            this.context.drawImage(this.fill, this.posX - this.radius, this.posY - this.radius, this.radius * 2, this.radius * 2);
        }
        this.context.closePath();
    }

    getRadius() {
        return this.radius;
    }

    setGradientColour(colour1, colour2) {
        let gradient = this.context.createLinearGradient(this.posX - this.radius, this.posY - this.radius, this.posX + this.radius, this.posY + this.radius);
        gradient.addColorStop(0, colour1);
        gradient.addColorStop(1, colour2);
        super.setFill(gradient);
    }

    isPointInside(x, y) {
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }
}