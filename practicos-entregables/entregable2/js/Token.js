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
        let choosePlayer;

        if(player1.name == 1){
            choosePlayer = player1.name;
        }else{
            choosePlayer = player2.name;
        }
        
        switch(choosePlayer){
            case player1.name:
                for(let i = 0; i < this.totalTokens; i++){
                    let token = new Circle(50, 50, 20, this.colour, this.context);
                    this.arrayTokens.push(token);
                }
                choosePlayer = player1.name;
                break;

            case player2.name: 
                for(let i = 0; i < this.totalTokens; i++){
                    let token = new Circle(400, 400, 20, this.colour, this.context);
                    this.arrayTokens.push(token);
                }
        }
    }

    drawToken(){
        let tokens = this.arrayTokens;
        tokens.forEach(t => {
            t.draw();
        });
    }
}