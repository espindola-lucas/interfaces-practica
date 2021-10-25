"use strict";

class Fondo{
static createFondo (){
        let layer1 = document.getElementById("layer1");
        let layer2 = document.getElementById("layer2");
        let layer3 = document.getElementById("layer3");
        let layer4 = document.getElementById("layer4");
        let layer5 = document.getElementById("layer5");
        let layer6 = document.getElementById("layer6");
        let layer7= document.getElementById("layer7");
       
        layer7.className = FondoClase.layer7;
        layer6.className = FondoClase.layer6;
        layer5.className = FondoClase.layer5;
        layer4.className = FondoClase.layer4;
        layer3.className = FondoClase.layer3;
        layer2.className = FondoClase.layer2;
        layer1.className = FondoClase.layer1;
        }

}