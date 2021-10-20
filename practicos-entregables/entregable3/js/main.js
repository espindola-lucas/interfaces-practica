"use strict";
let i = 0;
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
     i += 1;
     Objet (i)
   });
 
 let fuego = document.getElementById("fuego");
 fuego.addEventListener("animationend", function () {
     fuego.className = ""; 
     i = 0;
     Objet (i)
 });

function  initGame() {
    divHills.style.background = 'url('+Fondo.hills+')repeat-x';
    divTree.style.background = 'url('+Fondo.tree+')repeat-x';
    Person.CargarPerson();
    // timer.start_timer ();
    window.addEventListener("keydown",Person.press_key); 
    window.addEventListener("keyup" , Person.up_key);
    Objet(i) ;
    }
    
    function Objet (i){
        if (i == 2){
            i = 0
        }else{
            i = i + 1 ;
        }
        CrashObjects.randomColosion(i);

    }




document.addEventListener("DOMContentLoaded", initGame());
