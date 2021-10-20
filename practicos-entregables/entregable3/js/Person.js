"use strict";

class Person {

  static CargarPerson (){
    let persona = document.getElementById("person");
    persona.style.background = 'url('+Persona.imgR+')';
    persona.className= "person";
  }

  static  press_key (e) {
    let persona = document.getElementById("person");
    console.log(e.keyCode);
    if (e.keyCode == '38'){
      persona.style.background = 'url('+Persona.imgU+')';
        persona.className= "personUp";
        // persona.style.background = 'url(images/ninjaDead.png)';
        // persona.className = 'personDead';
    }
    if (e.keyCode == '40'){
      persona.style.background = 'url('+Persona.imgD+')';
      persona.className= "personDown";
    }
  }
  
  static  up_key (e) {
    let persona = document.getElementById("person");
    console.log(e.keyCode);
    if (e.keyCode == '38'){
      persona.style.background = 'url('+Persona.imgR+')';
      persona.className = "person"; 
    }
    if (e.keyCode == '40'){
      persona.style.background = 'url('+Persona.imgR+')';
      persona.className = "person"; 
    }
  }
  
}
