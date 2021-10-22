"use strict";

class CrashObjects{

    static terminarAnimacion (){
        console.log(termino);
    }

    static randomColosion (selected){
    // let elegido= Help.getRandomInt(0,3)
    let flor = document.getElementById("flor");
    let fuego = document.getElementById("fuego");
    let moneda = document.getElementById("moneda");
        switch(selected){  
            case 1: 
                flor.className= "flor";
            break;

            case 2: 
                moneda.className= "moneda";
            break;

            case 3:
                fuego.className= "fuego";
            break;
        }
    }


static DetectarColision(b){
        let a  = document.getElementById("person").getBoundingClientRect();
        var a_pos = { t : a.top, 
                    l: a.left, 
                    r: a.left + a.width, 
                    b: a.top + a.height};
        var b_pos =  {t : b.top, 
                    l: b.left, 
                    r: b.left + b.width, 
                    b: b.top + b.height};
                   //Detecta si se superponen las áreas
        if(   a_pos.l <= b_pos.r && a_pos.r >= b_pos.l 
        && a_pos.b >= b_pos.t && a_pos.t <= b_pos.b ){
            console.log('detecte')
            let persona = document.getElementById("person");
            persona.style.background = 'url(images/ninjaMuerto.png)';
            persona.className= "personDead";
            let layer3 = document.getElementById("layer3");
            let layer4 = document.getElementById("layer4");
            let layer5 = document.getElementById("layer5");
            let layer6 = document.getElementById("layer6");
            let layer7= document.getElementById("layer7");
            layer3.style.animation = 'none';
            layer4.style.animation = 'none';
            layer5.style.animation = 'none';
            layer6.style.animation ='none';
            layer7.style.animation = 'none';
        }
    
}


}