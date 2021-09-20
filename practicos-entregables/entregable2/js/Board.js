class Board {
    constructor (canvas, contexto, image, rows, columns, arrayLockers){
        this.canvas = canvas;
        this.contexto = contexto;
        this.image = image;
        this.rows = rows;
        this.columns = columns;
        this.arrayLockers = arrayLockers;
         
    }

    createLockers(){
        let ctx = this.canvas.getContext("2d");
        let posX = 240;
        let posY = 130;
        for(let f = 0; f < this.rows; f++){
            let locker = new Circle (posX,posY,20,"#ffffff", ctx);
            this.arrayLockers.push(locker );
            locker.draw();
            for (let c = 0 ; c < this.columns; c++){
                posY += 50;
                let locker = new Circle (posX,posY,20,"#ffffff", ctx);
                this.arrayLockers.push(locker );
                locker.draw();
            }
        posX += 50;
        posY  = 130;
        }
    }
    
    drawBackground(){
        this.contexto.drawImage(this.image,190,100,400,410)
    }

    getArrayLockers(){
        return this.arrayLockers;
    }

    drawcontainers(){
        let ctx = this.canvas.getContext("2d");
        let posx = 230;
        let posy= 60;
        for (let e = 0 ; e < this.rows; e++){
            let conteiner = new Rectangle (posx , posy ,20, 20, "#801A15",ctx);
            conteiner.draw();
            posx += 50 ;
        }
    }
}