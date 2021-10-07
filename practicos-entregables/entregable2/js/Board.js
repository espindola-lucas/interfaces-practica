class Board {
    constructor (canvas, contexto, image, rows, columns, arrayLockers,arrayConteiners,matrixGame,forma,img){
        this.canvas = canvas;
        this.contexto = contexto;
        this.image = image;
        this.rows = rows;
        this.columns = columns;
        this.arrayLockers = arrayLockers;
        this.arrayConteiners = arrayConteiners
        this.matrixGame = matrixGame;
        this.forma = forma ;
        this.img = img;
    }

    getMatrix(){
        let i = 0;
        for(let f = 0; f <= this.rows-1; f++){
            this.matrixGame[f] = [];
            for (let c = 0 ; c <= this.columns-1; c++){
                this.matrixGame[f][c]=alllockers.array[i];
                i = i + 1;
            }
            if (i <= alllockers.array.length ){
                i = i ;
            }
        }
        return this.matrixGame;
    }

    createLockers(){
        let ctx = this.canvas.getContext("2d");
        let posX = 240;
        let posY = 90;
      
        for(let f = 0; f <this.rows; f++){
            let locker
          
             locker = new Circle (posX,posY,20,"#ffffff", ctx);
            this.arrayLockers.push(locker );
            locker.draw();
            for (let c = 0 ; c <this.columns -1; c++){
                posY += 50; 
                locker = new Circle (posX,posY,20,"#ffffff", ctx);
                this.arrayLockers.push(locker );
                locker.draw();
            }
        posX += 50;
        posY = 90;
        }
    }
    

    drawBackground(){
        if (Juego.dimencion === 7*6){
            this.contexto.drawImage(this.image,190,60,400,320)
        }
        if (Juego.dimencion === 5*6){
            this.contexto.drawImage(this.image,190,60,300,320) 
        }
        if (Juego.dimencion === 7*8){
            this.contexto.drawImage(this.image,190,60,400,410) 
        }
       
    }

    getArrayLockers(){
        return this.arrayLockers;
    }

    getArrayConteiners(){
        return this.arrayConteiners;
    }

    drawcontainers(){
        let ctx = this.canvas.getContext("2d");
        let posx = 230;
        let posy= 20;
        for (let e = 0 ; e < this.rows; e++){
            let conteiner = new Rectangle (posx , posy ,30, 30,this.img,ctx,e);
            conteiner.draw();
            this.arrayConteiners.push(conteiner)
            posx += 50 ;
        }
        
    }
    static drawBackgroundS(contexto,i){
       
        if (Juego.dimencion === 7*6){
            contexto.drawImage(i,190,60,400,320)
        }
        if (Juego.dimencion === 5*6){
            contexto.drawImage(i,190,60,300,320) 
        }
        if (Juego.dimencion === 7*8){
            contexto.drawImage(i,190,60,400,410) 
        }
    }

    static drawLockers (array , contexto){
        array.forEach(l => {
            l.ctx = contexto;
            l.draw();
        });
    }
    
    static drawcontainer(arrayConteiners){
        arrayConteiners.forEach(t => {
            t.draw();
        });
    }
}