"use strict";
let i = 1;
let divHills = document.getElementById("hills");
let divTree =  document.getElementById("tree");
const Persona ={
    imgR:"images/ninjaRunning.png",
    imgU:"images/ninjaUp.png",
    imgD:"images/ninjaDown.png"
};

const Fondo ={
    hills: "images/fondo3.png",
    tree: "images/arboles.png"
}

let flor = document.getElementById("flor");
flor.addEventListener("animationend", function () {
    flor.className = ""; 
    i = 2;
    CrashObjects.randomColosion(i);
});

let moneda = document.getElementById("moneda");
moneda.addEventListener("animationend", function () {
    moneda.className = ""; 
    i = 3;
    CrashObjects.randomColosion(i);
});

let fuego = document.getElementById("fuego");
fuego.addEventListener("animationend", function () {
    fuego.className = ""; 
    i = 1;
    CrashObjects.randomColosion(i);
});

// let estrella = document.getElementById("estrella");
// estrella.addEventListener("animationend", function () {
//     estrella.className = ""; 
//     i = 4;
//     CrashObjects.randomColosion(i);
// });

function  initGame() {
    // divHills.style.background = 'url('+Fondo.hills+')repeat-x';
    // divTree.style.background = 'url('+Fondo.tree+')repeat-x';
    Person.CargarPerson();
    // timer.start_timer ();
    window.addEventListener("keydown",Person.press_key); 
    window.addEventListener("keyup" , Person.up_key);
}

window.setInterval( () => {
CrashObjects.randomColosion(i);
},4000);
window.setInterval( () => {
    CrashObjects.randomColosion(3);
},16000);

document.addEventListener("DOMContentLoaded", initGame());