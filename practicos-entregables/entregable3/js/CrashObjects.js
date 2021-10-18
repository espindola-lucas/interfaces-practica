"use strict";

class CrashObjects{

    static  terminarAnimacion (){
        console.log(termino);
    }
    
    
    static  randomColosion ($selected){
    // let elegido= Help.getRandomInt(0,3)
    let flor = document.getElementById("flor");
    let fuego = document.getElementById("fuego");
    let flor1 = document.getElementById("flor1");
    let fuego1 = document.getElementById("fuego1");
        switch($selected){  
            case 0: 
            console.log('adentro');
                flor.className= "flor";
                break;
    
            case 1 : 
            fuego.className= "fuego";
            console.log ('fuego')
                break;
            case 2 :
                fuego1.className= "fuego";
                break;
            case 3 :
                flor1.className= "flor";
                break;
    
    
            }
            }
}