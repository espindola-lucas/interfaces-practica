"use strict";

const Persona ={
    imgR:"images/ninjaRunning.png",
    imgU:"images/ninjaUp.png",
    imgD:"images/ninjaDown.png"
};

let flor = document.getElementById("flor");
flor.addEventListener("animationend", function () {
    flor.className = "";
    CrashObjects.randomColosion(1);
});

let moneda = document.getElementById("moneda");
moneda.addEventListener("animationend", function () {
    moneda.className = ""; 
    CrashObjects.randomColosion(2);
});

let fuego = document.getElementById("fuego");
fuego.addEventListener("animationend", function () {
    fuego.className = ""; 
    CrashObjects.randomColosion(3);
});

function  initGame() {
    Person.CargarPerson();
    // timer.start_timer ();
    window.addEventListener("keydown", Person.press_key); 
    window.addEventListener("keyup", Person.up_key);
}

window.setInterval( () => {
    CrashObjects.randomColosion(1);
}, 2000);

window.setInterval( () => {
    CrashObjects.randomColosion(2);
}, 4000);

window.setInterval( () => {
    CrashObjects.randomColosion(3);
}, 10000);

document.addEventListener("DOMContentLoaded", initGame());