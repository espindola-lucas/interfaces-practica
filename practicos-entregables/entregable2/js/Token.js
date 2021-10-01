"use strict";

class Token {
    constructor(token1, token2, colour, totalTokens, context){
        this.colour = colour;
        this.token1 = token1;
        this.token2 = token2;
        this.totalTokens = totalTokens;
        this.context = context;
    }

    
    getToken1(){
        return this.token1;
    }

    getToken2(){
        return this.token2;
    }

    

    createToken(){
        switch(this.colour){
            case player1.colour:
                for(let i = 0; i < this.totalTokens; i++){
                    let x = Help.getRandomInt(70, 110);
                    let y = Help.getRandomInt(150, 350);
                    let token = new Circle(x, y, 20, this.colour, this.context);
                    this.token1.push(token);
                }
                break;

            case player2.colour: 
                for(let i = 0; i < this.totalTokens; i++){
                    let x = Help.getRandomInt(680, 730);
                    let y = Help.getRandomInt(150, 350);
                    let token = new Circle(x, y, 20, this.colour, this.context);
                    this.token2.push(token);
                }
                break;
        }
    }

    drawToken(tokens){
        tokens.forEach(t => {
            t.draw();
        });
    }

    static drawTokens(tokens1,tokens2){
        canvas = document.querySelector("canvas");
        context = canvas.getContext("2d");   
        context.fillStyle="white";
        context.fillRect(0, 0, canvas.width, canvas.height);
        tokens2.forEach(T => {
            context.fillStyle="#008000";
            T.draw()
        });
        tokens1.forEach(t => {
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