"use strict";
const Person ={
    img:"images/person.png",
    imgCargada:""
};

function  initGame() {
    // timer.start_timer ();
    // CargarImages(); // no esta funcionando 
    window.addEventListener("keydown",person.press_key); 
    setInterval(colisionesObjeto.randomColision, 2000);
}

function CargarImages(){
Person.imgCargada=helps.uploadImage(Person.img);
}





document.addEventListener("DOMContentLoaded", initGame());