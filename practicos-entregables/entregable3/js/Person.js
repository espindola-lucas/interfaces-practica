"use strict";

class Person {

  static CargarPerson (){
    let persona = document.getElementById("person");
    persona.style.background = 'url('+Persona.img+')';
    persona.className= "person";
  }

  static  press_key (e) {
    let persona = document.getElementById("person");
    console.log(e.keyCode);
    if (e.keyCode == '38'){
        persona.className= "personUp";
    }
    if (e.keyCode == '40'){
        persona.className= "perso";
    }
  }
}
