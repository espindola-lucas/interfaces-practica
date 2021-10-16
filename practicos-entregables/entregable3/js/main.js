"use strict";


function  initGame() {
    // timer.start_timer ();
    window.addEventListener("keydown",person.press_key); 
    setInterval(colisionesObjeto.randomColision, 4000);
}





document.addEventListener("DOMContentLoaded", initGame());