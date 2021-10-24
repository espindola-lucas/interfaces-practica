"use strict";
let i ;
let layer1 = document.getElementById("layer1");
let layer2 = document.getElementById("layer2");
let layer3 = document.getElementById("layer3");
let layer4 = document.getElementById("layer4");
let layer5 = document.getElementById("layer5");
let layer6 = document.getElementById("layer6");
let layer7= document.getElementById("layer7");
let flecha = document.getElementById("flecha");
let flecha1 = document.getElementById("flecha1");
let barril = document.getElementById("barril");
let barril1 = document.getElementById("barril1");
let moneda = document.getElementById("moneda");
let moneda1 = document.getElementById("moneda1");
let persona = document.getElementById("person");
let personaFinish = document.getElementById("deadFinish");
let finishGame = document.getElementById("Finish");
let background;
let avatarObj;
//constante que va teniendo diferentes estados para cuando el avatar muera
const dead ={
    Estadodead:false,
    Actual:false,
    Cambio:false,
}
// constante que se utilliza para guardar todas las imagenes que se van a slocitar para el avatar
const avatar ={
    imgR:"images/character/ninjaRunning.png",
    imgU:"images/character/ninjaUp.png",
    imgD:"images/character/ninja.png",
    imgDead: "images/character/ninjadead.png",
    imgDeadFinish : "images/character/ninjadeadFinish.png"
};

// constante que la utilizamos para saber  si una colision termino o se esta ejecutando
const ColisionEnd ={
    barril: 0,
    flecha:0,
    moneda:0,
    barril1:0,
    moneda1:0 ,
    flecha1: 0 ,
};


// constante con todos los nombres de las clases css que se utilizan para las acciones del personaje 
const Clases ={
    classR:"person",
    classU:"personUp",
    classD:"personDown",
    classDF:"personDeadFinish"
}

const Fondo1 ={
    layer1: "../images/layer_07_1920\ x\ 1080.png",
    layer2:"images/layer_06_1920\ x\ 1080.png",
    layer3:"images/layer_05_1920\ x\ 1080.png",
    layer4:"images/layer_04_1920\ x\ 1080.png",
    layer5:"images/layer_03_1920\ x\ 1080.png",
    layer6:"images/layer_02_1920\ x\ 1080.png",
    layer7:"images/layer_01_1920\ x\ 1080.png"
};
 // addEventListener para saber cuando las animaciones terminan e indicarle q tiene que hacer
persona.addEventListener("animationend", function () {
    if (dead.Estadodead == false){
        persona.style.background = 'url('+avatar.imgR+')';
        persona.className= Clases.classR;
    }
    if (dead.Estadodead== true && dead.Actual==false){
        persona.className= 'none';
        dead.Actual =true;
        dead.Cambio=true;
    }
    if(dead.Cambio == true){
    personaFinish.style.background = 'url('+avatar.imgDeadFinish+')';
    personaFinish.className= Clases.classDF;
    dead.Cambio=null;
    }
    });
    personaFinish.addEventListener("animationend",function () {
        console.log('mori');
        personaFinish.className= "none";
        finishGame.style.display='block'
    })
flecha.addEventListener("animationend", function () {
    flecha.className = 'none';
    ColisionEnd.flecha= 1;
});

flecha1.addEventListener("animationend", function () {
    flecha1.className = 'none';
    ColisionEnd.flecha1= 1;
});

barril.addEventListener("animationend", function () {
    barril.className = 'none';
    ColisionEnd.barril = 1 ;
});

barril1.addEventListener("animationend", function () {
    barril1.className = 'none';
    ColisionEnd.barril1 = 1 ;
});

moneda.addEventListener("animationend", function () {
    moneda.className = 'non';
    ColisionEnd.moneda = 1 ;
});

moneda1.addEventListener("animationend", function () {
    moneda1.className = 'none';
    ColisionEnd.moneda1 = 1 ;
});
// fin addEventListeners

// la utilizamos para ir largando objertos de manera random
function getRandomInt(min, max) {  //Obtengo un numero random entre dos valores dados
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function  initGame() {
    finishGame.style.display='none'; // ocukta el div que solo se muestra si la persona pierde
    avatarObj = new Person(persona, Clases, avatar) 
    avatarObj.CargarPerson();
    background = new Fondo(layer1,layer2,layer3,layer4,layer5,layer6,layer7,Fondo1);
    window.addEventListener("keydown", Person.press_key); 
     // timer.start_timer ();
}
// set interva que se ejecuta cada 1 segundo y se va llamando al metodo de la clase CrashObjects que detecta la colision 
window.setInterval( () => {
    let a = document.getElementById("flecha").getBoundingClientRect();
    let b = document.getElementById("barril").getBoundingClientRect();
    let m = document.getElementById("moneda").getBoundingClientRect();
    let a1 = document.getElementById("flecha1").getBoundingClientRect();
    let b1 = document.getElementById("barril1").getBoundingClientRect();
    let m1 = document.getElementById("moneda1").getBoundingClientRect();
    CrashObjects.DetectarColision(a,dead);
    CrashObjects.DetectarColision(b,dead);
    CrashObjects.DetectarColisionMoneda(m,dead);
    CrashObjects.DetectarColision(a1,dead);
    CrashObjects.DetectarColision(b1,dead);
    CrashObjects.DetectarColisionMoneda(m1,dead);
}, 1000);


// set interval utilizado para ir mandando casa sierto tiempo objetos random
window.setInterval( () => {
    if(dead.Estadodead == false){
        i = getRandomInt(1,6);
        CrashObjects.randomColosion(i);
    }
}, 2000);
window.setInterval( () => {
    if(dead.Estadodead == false){
        i = getRandomInt(5,6);
        CrashObjects.randomColosion(i);
    }
}, 4000);
// fin set interval

document.addEventListener("DOMContentLoaded", initGame());








