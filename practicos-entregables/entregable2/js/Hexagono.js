"use strict";

class Hexagono extends Figure {
    constructor(posX , posY,size, fill,contexto,myPath){
        super(posX,posY,fill,contexto);
        this.size = size
        this.myPath = myPath
    }
    
    draw (){
        this.myPath.moveTo (this.posX + this.size *Math.cos(0) , this.posY + this.size*Math.sin(0))
        for (let i = 0; i <7 ;i++){
            this.myPath.lineTo(this.posX+this.size*Math.cos(i*2*Math.PI/6), this.posY +this.size*Math.sin(i*2*Math.PI/6));
        }
        this.contexto.fill();
        
        if (this.fill instanceof Image) {
            this.contexto.drawImage(this.fill, this.posX - this.radius, this.posY - this.radius, this.radius * 2, this.radius * 2);
        }
        return this.myPath;
    }

    isPointInside(x,y,hex){
        let myCanvas = document.querySelector('#canvas');
        let pos_x =x- myCanvas.offsetLeft;
        let pos_y= y - myCanvas.offsetTop;
        if(this.contexto.isPointInPath(hex.myPath, (x - myCanvas.offsetLeft), (y- myCanvas.offsetTop) )){
            return true;
        }
    }
}