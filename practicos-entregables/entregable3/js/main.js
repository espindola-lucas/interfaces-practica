"use strict";

const Persona ={
    img:"images/ninjaRunning.png",
    };

function  initGame() {
    let flor = document.getElementById("flor");
    // timer.start_timer ();
     CargarImages(); // no esta funcionando 
     Person.CargarPerson();
    window.addEventListener("keydown",Person.press_key); 
    setInterval(CrashObjects.randomColosion, 4000);
}

async function CargarImages(){
        let img;
        img = await Help.uploadImage(Persona.img);
        Persona.img = img ; 
       
}

document.addEventListener("DOMContentLoaded", initGame());
