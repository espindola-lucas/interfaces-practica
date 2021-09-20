"use strict";

class Help {

    //La propiedad static es utilizada para usar su metodo sin instaciar su clase
    static getRandomInt(min, max) {     //Obtengo un numero random entre dos valores dados
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
}