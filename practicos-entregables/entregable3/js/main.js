"use strict";
const Persona ={
    img:"images/ninjaRunning.png"
    };
let flor = document.getElementById("flor");
flor.addEventListener("animationend", function () {
       flor.className = ""; 
       CrashObjects.randomColosion(3)
      
});
let fuego = document.getElementById("fuego");
fuego.addEventListener("animationend", function () {
    fuego.className = ""; 
    CrashObjects.randomColosion(2)
});
function  initGame() {
   
    // timer.start_timer ();
     CargarImages(); // no esta funcionando 
     Person.CargarPerson();
    window.addEventListener("keydown",Person.press_key); 
    
    setInterval(CrashObjects.randomColosion(0), 1000);
    setInterval(CrashObjects.randomColosion(1), 4000);
}

async function CargarImages(){
        let img;
        img = await Help.uploadImage(Persona.img);
        Persona.img = img ; 
       
}
function  Colisions () {

    
}

document.addEventListener("DOMContentLoaded", initGame());
