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

let fondo1 = document.getElementById("fondo1");
let fondo2 = document.getElementById("fondo2");

let layer1 = document.getElementById("layer1");
let layer2 = document.getElementById("layer2");
let layer3 = document.getElementById("layer3");
let layer4 = document.getElementById("layer4");
let layer5 = document.getElementById("layer5");
let layer6 = document.getElementById("layer6");
let layer7 = document.getElementById("layer7");
let layer8 = document.getElementById("layer8");

let hiddenMainMenu = false;
let theme;
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

// constante para el contador de monedas
const CantidadMoneda ={
    cantidad: 0
};

//constante que va teniendo diferentes estados para cuando el avatar muera
const dead ={
    Estadodead:false,
    Actual:false,
    Cambio:false,
};

// constante que se utilliza para guardar todas las imagenes que se van a slocitar para el avatar
const avatar ={
    imgR:"images/character/ninja/ninjaRunning.png",
    imgU:"images/character/ninja/ninjaUp.png",
    imgD:"images/character/ninja/ninja.png",
    imgDead: "images/character/ninja/ninjadead.png",
    imgDeadFinish : "images/character/ninja/ninjadeadFinish.png"
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
    
fondo1.addEventListener("click", function () {
    theme = "noche";
});

fondo2.addEventListener("click", function () {
    theme = "ciudad";
});

personaFinish.addEventListener("animationend",function () {
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


// la utilizamos para ir largando objertos de manera random
function getRandomInt(min, max) {  //Obtengo un numero random entre dos valores dados
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// esconde el juego, para mostrar solamente el menu
function hiddenGame(){
    document.body.style.background = "white";
    game.style.display = 'none';
    menu.style.display = 'block';
}

function initGame() {
    
    document.body.style.background = "black";

    // pregunta que fondo se eligio desde el menu, y sino elegio ninguno, setea uno por defecto
    if(theme == "noche"){   
        layer1.className = "layer layer1";
        layer2.className = "layer layer2";
        layer3.className = "layer layer3";
        layer4.className = "layer layer4";
        layer5.className = "layer layer5";
        layer6.className = "layer layer6";
        layer7.className = "layer layer7";
    }else if(theme == "ciudad"){
        layer1.className = "layer layer2-1";
        layer2.className = "layer layer2-2";
        layer3.className = "layer layer2-3";
        layer4.className = "layer layer2-4";
        layer5.className = "layer layer2-5";
        layer6.className = "layer layer2-6";
        layer7.className = "layer layer2-7";
        layer8.className = "layer layer2-8";
    }else{
        layer1.className = "layer layer1";
        layer2.className = "layer layer2";
        layer3.className = "layer layer3";
        layer4.className = "layer layer4";
        layer5.className = "layer layer5";
        layer6.className = "layer layer6";
        layer7.className = "layer layer7";
    }

    // set interval que se ejecuta cada medio segundo y se va llamando al metodo de la clase CrashObjects que detecta la colision de los objetos 

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

    // set interval que se ejecuta cada 1 segundo y se va llamando al metodo de la clase CrashObjects que detecta la colision de la moneda

    window.setInterval(() => {
        let m = document.getElementById("moneda").getBoundingClientRect();
        let m1 = document.getElementById("moneda1").getBoundingClientRect();
        CrashObjects.DetectarColisionMoneda(m1,dead,"moneda1");
        CrashObjects.DetectarColisionMoneda(m,dead,"moneda");
    },1000)

    game.style.display = 'block';
    menu.style.display = 'none';
    winner.style.display='none'; // oculta el div que solo se muestra si la persona gana
    finishGame.style.display='none'; // ocukta el div que solo se muestra si la persona pierde
    avatarObj = new Person(persona, Clases, avatar) ;//se crea una instancia de las clases con las constante con los valores 
    avatarObj.CargarPerson(); // carga todo en pantalla 
    window.addEventListener("keydown", Person.press_key); // se ejecuta cuando se preciona una tecla 
    Timer.start_timer(); // llama al timer para que enpiece a contar el tiempo 
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