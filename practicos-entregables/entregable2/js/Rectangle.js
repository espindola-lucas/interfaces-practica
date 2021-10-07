"use strict"

class Rectangle extends Figure {
    constructor(posX, posY, width, height, fill, context,e) {
        super(posX, posY, fill, context);

        this.width = width;
        this.height = height;
        this.e = e;
    }

    draw() {
        super.draw();
        this.context.beginPath();
        this.context.fillRect(this.posX, this.posY, this.width, this.height,this.e);

        if (this.fill instanceof Image) {
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

    isPointInside(x, y) {
        return !(x < this.posX || x > this.posX + this.width || 
                y < this.posY || y > this.posY + this.height);
    }
}