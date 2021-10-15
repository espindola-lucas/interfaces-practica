"use strict";
let keyDown= false ;
let persona = document.getElementById("person");
window.addEventListener("keydown",(e)=>{
keyDown = true;
 if (e.keyCode == '38'){
     console.log('hola')
   persona.className= "person";
 }
 if (e.keyCode == '40'){
    persona.style.animation= "walk 1s steps(7) infinite";
 }

});

