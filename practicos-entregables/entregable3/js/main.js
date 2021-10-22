"use strict";

const Persona ={
    imgR:"images/ninjaRunning.png",
    imgU:"images/ninjaUp.png",
    imgD:"images/ninjaMuerto.png"
};
const Time ={
    time:0
}
let i ;
// let flor = document.getElementById("flor");
// flor.addEventListener("animationend", function () {
//     flor.className = "";
//     i = Help.getRandomInt(2,3);
//     CrashObjects.randomColosion(i);
// });

// let moneda = document.getElementById("moneda");
// moneda.addEventListener("animationend", function () {
//     i = Help.getRandomInt(1,2);
//     CrashObjects.randomColosion(i);
// });

// let fuego = document.getElementById("fuego");
// fuego.addEventListener("animationend", function () {
//     i = Help.getRandomInt(1,3);
//     CrashObjects.randomColosion(i)
// });

function  initGame() {
    Person.CargarPerson();
    // timer.start_timer ();
    window.addEventListener("keydown", Person.press_key); 
    window.addEventListener("keyup", Person.up_key);
}

// window.setInterval( () => {
//     CrashObjects.randomColosion(1);
// }, 2000);

// window.setInterval( () => {
//     CrashObjects.randomColosion(2);
// }, 4000);

// window.setInterval( () => {
//     CrashObjects.randomColosion(3);
// }, 10000);


window.setInterval( () => {
    let a = document.getElementById("fuego").getBoundingClientRect();
    let b= document.getElementById("flor").getBoundingClientRect();
      CrashObjects.DetectarColision(a);
      CrashObjects.DetectarColision(b);
  }, 1000);

 window.setInterval( () => {
  i = Help.getRandomInt(1,3);
    CrashObjects.randomColosion(i);
}, 4000);



document.addEventListener("DOMContentLoaded", initGame());