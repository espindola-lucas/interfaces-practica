"use strict";

class Help {

    //La propiedad static es utilizada para usar su metodo sin instaciar su clase
    static getRandomInt(min, max) {     //Obtengo un numero random entre dos valores dados
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static onMouseDown(e){
        isMouseDown = true;

        if(lastClickedFigure != null){
            lastClickedFigure = null;
        }
    
        let clickFigure = Help.findClickedFigure(e.layerX, e.layerY);
        if(clickFigure != null){
            lastClickedFigure = clickFigure;
        }
        Help.redraw();
    }
        

    static onMouseMove(e){
        if(isMouseDown && lastClickedFigure != null){
            lastClickedFigure.setPosition(e.layerX, e.layerY);
            Help.redraw();
        }
    }
    
    static onMouseUp(e){
        isMouseDown = false;
        let rectan = allConteiners.array
        for (let i= 0 ; i <rectan.length; i++ ){
            const elemento = rectan[i];
            if (elemento.isPointInside(e.layerX,e.layerY) &&  lastClickedFigure != null){
                Help.fillWhite(lastClickedFigure);
            }else if (lastClickedFigure != null) {
                Help.selectPlayer(currentPlayer.actual);
                Token.drawInOldPosition(oldPositions.selected, oldPositions.X ,oldPositions.Y );
            }
        }
    }
    
    static findClickedFigure(x, y){
        if(currentPlayer.actual == 1){
            let array = player1.arrayTokensPlayer1;
            for(let i = 0; i < array.length; i++){
                const element = array[i];
                if(element.isPointInside(x, y)){
                    oldPositions.selected = element;
                    oldPositions.X = element.posX;
                    oldPositions.Y = element.posY;
                    currentPlayer.actual = player2.name; 
                    return element;
                }
            }
        }else{
            let array = player2.arrayTokensPlayer2;
            for(let i = 0; i < array.length; i++){
                const element = array[i];
                if(element.isPointInside(x, y)){
                    oldPositions.selected = element;
                    oldPositions.X = element.posX;
                    oldPositions.Y = element.posY;
                    currentPlayer.actual = player1.name; 
                    return element;
                }
            }
        }
    }

    static redraw (){
        canvas = document.querySelector("canvas");
        context = canvas.getContext("2d");
        Token.drawTokens(allFig.array);
        Board.drawcontainer(allConteiners.array);
        Board.drawBackgroundS(context, imageBoard.img);
        let ctx = canvas.getContext("2d");
        Board.drawLockers(alllockers.array , ctx);
    }
    
    static uploadImage(path){
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = path;
            img.onload = () => resolve(img);
            img.onerror = reject;
            
        });
    }

    static fillWhite(element){
        element.fill = "white";
        element.draw();
    }

    static selectPlayer(current){
        if(current == 1){
            currentPlayer.actual = player2.name;
        }else{
            currentPlayer.actual = player1.name;
        }
    }

}