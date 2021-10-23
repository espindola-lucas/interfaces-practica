"use strict";

class Person {
    constructor (persona, clases,Persona){
        this.persona = persona;
        this.clases = clases;
        this.Persona = Persona;
    }
    CargarPerson (){
        this.persona.style.background = 'url('+this.Persona.imgR+')';
        this.persona.className= this.clases.classR;
    }

    static press_key (e) {
        let persona = document.getElementById("person");
        if (e.keyCode == '38'){
            persona.style.background = 'url('+Persona.imgU+')';
            persona.className= Clases.classU;
        }
        if (e.keyCode == '40'){
            persona.style.background = 'url('+Persona.imgD+')';
            persona.className= Clases.classD;
        }
    }

    static up_key (e) {
        let persona = document.getElementById("person");
        if (e.keyCode == '40'){
            persona.style.background = 'url('+Persona.imgR+')';
            persona.className = Clases.classR; 
        }
    }
}
