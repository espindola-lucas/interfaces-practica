"use strict";

class CrashObjects{

    static  terminarAnimacion (){
        console.log(termino);
    }
    
    
    static  randomColosion (){
    let elegido= Help.getRandomInt(0,3)
    let flor = document.getElementById("flor");
    let fuego = document.getElementById("fuego");
    let flor1 = document.getElementById("flor1");
    let fuego1 = document.getElementById("fuego1");
        switch(elegido){  
            case 0: 
            flor.className= "";
            flor.className= "flor";
                flor.className= "flor";
                console.log ('flor')
                break;
    
            case 1 : 
            fuego.className= "";
            fuego.className= "fuego";
            console.log ('fuego')
                fuego.className= "fuego";
                console.log ('fuego')
                break;
            case 2 :
                fuego1.className= "fuego1";
                console.log ('fuego1')
                break;
            case 3 :
                flor1.className= "flor1";
                console.log ('flor1')
                break;
    
    
            }
            }
}