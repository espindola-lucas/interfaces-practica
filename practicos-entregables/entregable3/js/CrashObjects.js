"use strict";

class CrashObjects{

    static  terminarAnimacion (){
        console.log(termino);
    }

    static  randomColosion (selected){
    // let elegido= Help.getRandomInt(0,3)
    let flor = document.getElementById("flor");
    let fuego = document.getElementById("fuego");
    let moneda = document.getElementById("moneda");
    let estrella = document.getElementById("estrella");
        switch(selected){  
            case 1: 
            console.log('adentro');
                flor.className= "flor";
                break;
    
            case 4: 
            fuego.className= "fuego";
            break;
            case 3 :
                estrella.className= "estrella";
                break;
            case 2:
                moneda.className= "moneda";
                break;
            }
        }
    }