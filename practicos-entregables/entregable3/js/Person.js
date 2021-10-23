"use strict";

class Person {
    constructor (persona, clases, avatar){
        this.persona = persona;
        this.clases = clases;
        this.avatar = avatar;
    }
    
    CargarPerson (){
        this.persona.style.background = 'url('+this.avatar.imgR+')';
        this.persona.className= this.clases.classR;
    }

    static press_key (e) {
        let persona = document.getElementById("person");
        if (e.keyCode == '38'){
            persona.style.background = 'url('+avatar.imgU+')';
            persona.className= Clases.classU;
        }
        if (e.keyCode == '40'){
            // persona.style.background = 'url('+avatar.imgD+')';
            persona.className= Clases.classD;
        }
    }

    static up_key (e) {
        let persona = document.getElementById("person");
        if (e.keyCode == '40'){
            persona.style.background = 'url('+avatar.imgR+')';
            persona.className = Clases.classR; 
        }
    }
}
