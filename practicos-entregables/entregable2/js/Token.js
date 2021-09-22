"use strict";

class Token {
    constructor(colour, totalTokens, arrayTokens, context){
        this.colour = colour;
        this.totalTokens = totalTokens;
        this.arrayTokens = arrayTokens;
        this.context = context;
    }

    getColour(){
        return this.colour;
    }

    getTotalTokens(){
        return this.totalTokens;
    }


    getArrayToken(){
        return this.arrayTokens;
    }

    createToken(){
        switch(this.colour){
            case player1.colour:
                for(let i = 0; i < this.totalTokens; i++){
                    let x = Help.getRandomInt(20, 70);
                    let y = Help.getRandomInt(200, 400);
                    let token = new Circle(x, y, 20, this.colour, this.context);
                    this.arrayTokens.push(token);
                }
                break;

            case player2.colour: 
                for(let i = 0; i < this.totalTokens; i++){
                    let x = Help.getRandomInt(730, 780);
                    let y = Help.getRandomInt(200, 400);
                    let token = new Circle(x, y, 20, this.colour, this.context);
                    this.arrayTokens.push(token);
                }
                break;
        }
    }

    drawToken(){
        let tokens = this.arrayTokens;
        tokens.forEach(t => {
            t.draw();
        });
    }

    static drawTokens(tokens){
        canvas = document.querySelector("canvas");
        context = canvas.getContext("2d");   
        context.fillStyle="white";
        context.fillRect(0, 0, canvas.width, canvas.height);
        tokens.forEach(t => {
            t.draw();
        });
    }
    
    static drawInOldPosition (elemento, X ,Y ){
        elemento.posX = X;
        elemento.posY = Y ;
        elemento.draw();
        Help.redraw();
    }
}