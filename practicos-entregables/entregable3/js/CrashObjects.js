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
                console.log('adentro');
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


   static DetectarColision(){
        /// "a" y "b" deben ser dos objetos HTMLElement
        let a = document.getElementById("moneda").getBoundingClientRect();
        let b  = document.getElementById("person").getBoundingClientRect();
      var a_pos = {t : a.top, 
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
            let flor = document.getElementById("flor");
            flor.className= "";
            let persona = document.getElementById("person");
            persona.style.background = 'url(images/ninjaDead.png)';
            persona.className= "personDead";
         }
    //  console.log (a.left);
    //  console.log(b.left);
    }
}