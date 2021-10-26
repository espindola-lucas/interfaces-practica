"use strict";

let flecha = document.getElementById("flecha");
let flecha1 = document.getElementById("flecha1");
let barril = document.getElementById("barril");
let barril1 = document.getElementById("barril1");
let moneda = document.getElementById("moneda");
let moneda1 = document.getElementById("moneda1");
let persona = document.getElementById("person");
let personaFinish = document.getElementById("deadFinish");
let finishGame = document.getElementById("finish");
let menu = document.getElementById("menu");
let game = document.getElementById("startGame");
let startGame = document.getElementById("initGame");
let hiddenMainMenu = false;
let background;
let avatarObj;
let i;

const Juego = {
    fin:false
}
//cosnt para obtener los id del reloj mostrado en pantalla
const timer = {
    minutes: document.getElementById("minutos"),
    seconds: document.getElementById("segundos"),
    stop: 2
};

const CantidadMoneda ={
    cantidad: 0
}
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
    layer1: "images/backgraund/layer_07_1920\ x\ 1080.png",
    layer2:"images/backgraund/layer_06_1920\ x\ 1080.png",
    layer3:"images/backgraund/layer_05_1920\ x\ 1080.png",
    layer4:"images/backgraund/layer_04_1920\ x\ 1080.png",
    layer5:"images/backgraund/layer_03_1920\ x\ 1080.png",
    layer6:"images/backgraund/layer_02_1920\ x\ 1080.png",
    layer7:"images/backgraund//layer_01_1920\ x\ 1080.png"
};
const FondoClase ={
    layer1: "layer layer1",
    layer2: "layer layer2",
    layer3: "layer layer3",
    layer4: "layer layer4",
    layer5: "layer layer5",
    layer6: "layer layer6",
    layer7: "layer layer7"
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
});
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
    moneda.className = 'none';
    ColisionEnd.moneda = 1 ;
});
moneda1.addEventListener("animationend", function () {
    moneda1.className = 'none';
    ColisionEnd.moneda1 = 1 ;
});
// fin addEventListeners

// startGame.addEventListener("click", initGame());

// la utilizamos para ir largando objertos de manera random
function getRandomInt(min, max) {  //Obtengo un numero random entre dos valores dados
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hiddenGame(){
    game.style.display = 'none';
    menu.style.display = 'block';
    document.body.style.background = "#FFFFFF"
}

function initGame() {

    // set interva que se ejecuta cada 1 segundo y se va llamando al metodo de la clase CrashObjects que detecta la colision 

    window.setInterval( () => {
        let a = document.getElementById("flecha").getBoundingClientRect();
        let b = document.getElementById("barril").getBoundingClientRect();
        let a1 = document.getElementById("flecha1").getBoundingClientRect();
        let b1 = document.getElementById("barril1").getBoundingClientRect();
        CrashObjects.DetectarColision(a,dead);
        CrashObjects.DetectarColision(b,dead);
        CrashObjects.DetectarColision(a1,dead);
        CrashObjects.DetectarColision(b1,dead);
    }, 500);

    window.setInterval(() => {
        let m = document.getElementById("moneda").getBoundingClientRect();
        let m1 = document.getElementById("moneda1").getBoundingClientRect();
        CrashObjects.DetectarColisionMoneda(m1,dead,"moneda1");
        CrashObjects.DetectarColisionMoneda(m,dead,"moneda");
    },1000)

    document.body.style.background = "#000000"
    game.style.display = 'block';
    menu.style.display = 'none';
    winner.style.display='none'; // ocukta el div que solo se muestra si la persona pierde
    finishGame.style.display='none'; // ocukta el div que solo se muestra si la persona pierde
    Fondo.createFondo();
    avatarObj = new Person(persona, Clases, avatar) ;
    avatarObj.CargarPerson();
    window.addEventListener("keydown", Person.press_key); 
    Timer.start_timer();
}

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
}, 2500);
// fin set interval

document.addEventListener("DOMContentLoaded", hiddenGame());