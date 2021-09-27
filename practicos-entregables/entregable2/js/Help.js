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
                Game.fullRows (elemento.e,oldPositions.selected, oldPositions.X ,oldPositions.Y )
                    if (Rows.empty[elemento.e] =="no" ){
                        if (Rows.number == null || Rows.number == elemento.e){
                            Game.getRows(elemento.e,currentPlayer.actual);
                            Help.selectPlayer(currentPlayer.actual)
                        }
                    }
            }
            if (lastClickedFigure != null) {
                Token.drawInOldPosition(oldPositions.selected, oldPositions.X ,oldPositions.Y );}
            } 
    }
    
    static findClickedFigure(x, y){
        let array;
        if(currentPlayer.actual == 1){
            array = player1.arrayTokensPlayer1;
            for(let i = 0; i < array.length; i++){
                const element = array[i];
                if(element.isPointInside(x, y)){
                        oldPositions.selected = element;
                        oldPositions.X = element.posX;
                        oldPositions.Y = element.posY;
                        oldPositions.positionInArray = i;
                        oldPositions.array =player1.arrayTokensPlayer1;
                        return element;
                }  
            }
        }else{
            array = player2.arrayTokensPlayer2;
            for(let i = 0; i < array.length; i++){
                const element = array[i];
                if(element.isPointInside(x, y)){
                    oldPositions.selected = element;
                    oldPositions.X = element.posX;
                    oldPositions.Y = element.posY;
                    oldPositions.positionInArray = i;
                    oldPositions.array =player2.arrayTokensPlayer2;
                    return element;
                }   
            }
        } 
    }

    static redraw (){
        canvas = document.querySelector("canvas");
        context = canvas.getContext("2d");
        Token.drawTokens(player1.arrayTokensPlayer1,player2.arrayTokensPlayer2);
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

    static deleteElement(array,i){
        array.splice(i,1);
        Help.redraw();
    }

    static selectPlayer(current){
        if(current == 1){
            currentPlayer.actual = player2.name;
        }else{
            currentPlayer.actual = player1.name;
        }
    }

}