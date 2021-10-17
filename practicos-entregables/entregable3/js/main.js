"use strict";

const Person ={
    img:"images/person.png",
};

const Colision ={
    imgFlor:"images/flor.png",
    imgFuego:"images/fuego.png"
};

function  initGame() {
    let flor = document.getElementById("flor");
    // timer.start_timer ();
    CargarImages(); // no esta funcionando 
    person.CargarPerson ()
    window.addEventListener("keydown",person.press_key); 
    setInterval(colisionesObjeto.randomColosion, 4000);
    
    
    
   
}

async function CargarImages(){
    let img;
    img = await helps.uploadImage(Person.img);
    Person.img = img ; 
    img = await helps.uploadImage(Colision.imgFlor);
    Colision.imgFlor = img;
    img = await helps.uploadImage(Colision.imgFuego);
}





document.addEventListener("DOMContentLoaded", initGame());