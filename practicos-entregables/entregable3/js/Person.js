"use strict";

class Person {

  static CargarPerson (){
    let persona = document.getElementById("person");
    persona.style.background = 'url('+Persona.img+')';
    persona.className= "person";
  }

  static  press_key (e) {
    let persona = document.getElementById("person");
    if (e.keyCode == '38'){
        persona.className= "person";
    }
    if (e.keyCode == '40'){
        persona.className= "perso";
    }
  }
}
