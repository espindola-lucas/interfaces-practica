"use strict";

class Token {
    constructor(token1, token2, colour, totalTokens, arrayTokens, context){
        this.colour = colour;
        this.token1 = token1;
        this.token2 = token2;
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

    getToken1(){
        return this.token1;
    }

    getToken2(){
        return this.token2;
    }

    getArrayToken(){
        return this.arrayTokens;
    }

    createToken(){
        switch(this.colour){
            case player1.colour:
                for(let i = 0; i < this.totalTokens; i++){
                    let x = Help.getRandomInt(70, 110);
                    let y = Help.getRandomInt(150, 350);
                    let token = new Circle(x, y, 20, this.colour, this.context);
                    this.arrayTokens.push(token);
                    this.token1.push(token);
                }
                break;

            case player2.colour: 
                for(let i = 0; i < this.totalTokens; i++){
                    let x = Help.getRandomInt(680, 730);
                    let y = Help.getRandomInt(150, 350);
                    let token = new Circle(x, y, 20, this.colour, this.context);
                    this.arrayTokens.push(token);
                    this.token2.push(token);
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