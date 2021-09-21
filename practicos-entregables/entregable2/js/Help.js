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
        Token.drawTokens(allFig.array);
    }
    
    static onMouseMove(e){
        if(isMouseDown && lastClickedFigure != null){
            lastClickedFigure.setPosition(e.layerX, e.layerY);
            Token.drawTokens(allFig.array);
        }
    }
    
    static onMouseUp(e){
        isMouseDown = false;
    }
    
    static findClickedFigure(x, y){
        let array = allFig.array;
        for(let i = 0; i < array.length; i++){
            const element = array[i];
            if(element.isPointInside(x, y)){
                return element; 
            }
        }
    }

}