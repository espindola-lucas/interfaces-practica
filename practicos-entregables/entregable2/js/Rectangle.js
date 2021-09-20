"use strict"

class Rectangle extends Figure {
    constructor(posX, posY, width, height, fill, context) {
        super(posX, posY, fill, context);

        this.width = width;
        this.height = height;
    }

    draw() {
        super.draw();
        this.context.beginPath();
        this.context.fillRect(this.posX, this.posY, this.width, this.height);

        if (this.fill instanceof Image) {
            console.log(this.fill)
            this.context.drawImage(this.fill, this.posX, this.posY, this.width, this.height);
        }
        this.context.closePath();
    }

    getWidth() {
        return this.width;
    }

    getHeight() { 
        return this.height;
    }

    setGradientColour(colour1, colour2) {
        let gradient = this.context.createLinearGradient(this.posX, this.posY, this.posX + this.width, this.posY + this.height);
        gradient.addColorStop(0, colour1);
        gradient.addColorStop(1, colour2);
        super.setFill(gradient);
    }

    isPointInside(x, y) {
        return !(x < this.posX || x > this.posX + this.width || 
                y < this.posY || y > this.posY + this.height);
    }
}