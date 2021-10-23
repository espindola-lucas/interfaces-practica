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
let background;
let avatarObj;

const avatar ={
    imgR:"images/character/ninjaRunning.png",
    imgU:"images/character/ninjaUp.png",
    imgD:"images/character/ninja.png",
    imgDead: "images/character/ninjadead.png"
};

const ColisionEnd ={
    barril: 0,
    flecha:0,
    moneda:0,
    barril1:0,
    moneda1:0 ,
    flecha1: 0 ,
};

const Clases ={
    classR:"person",
    classU:"personUp",
    classD:"personDown"
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

persona.addEventListener("animationend", function () {
    persona.style.background = 'url('+avatar.imgR+')';
    persona.className= Clases.classR;
});

flecha.addEventListener("animationend", function () {
    flecha.className = '';
    ColisionEnd.flecha= 1;
});

flecha1.addEventListener("animationend", function () {
    flecha1.className = '';
    ColisionEnd.flecha1= 1;
});

barril.addEventListener("animationend", function () {
    barril.className = "";
    ColisionEnd.barril = 1 ;
});

barril1.addEventListener("animationend", function () {
    barril1.className = "";
    ColisionEnd.barril1 = 1 ;
});

moneda.addEventListener("animationend", function () {
    moneda.className = "";
    ColisionEnd.moneda = 1 ;
});

moneda1.addEventListener("animationend", function () {
    moneda1.className = "";
    ColisionEnd.moneda1 = 1 ;
});

function getRandomInt(min, max) {  //Obtengo un numero random entre dos valores dados
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function  initGame() {
    avatarObj = new Person(persona, Clases, avatar)
    avatarObj.CargarPerson();
    background = new Fondo(layer1,layer2,layer3,layer4,layer5,layer6,layer7,Fondo1);
    window.addEventListener("keydown", Person.press_key); 
    // window.addEventListener("keyup", Person.up_key);
    // timer.start_timer ();
}

window.setInterval( () => {
    let a = document.getElementById("flecha").getBoundingClientRect();
    let b = document.getElementById("barril").getBoundingClientRect();
    let m = document.getElementById("moneda").getBoundingClientRect();
    let a1 = document.getElementById("flecha1").getBoundingClientRect();
    let b1 = document.getElementById("barril1").getBoundingClientRect();
    let m1 = document.getElementById("moneda1").getBoundingClientRect();
    CrashObjects.DetectarColision(a);
    CrashObjects.DetectarColision(b);
    CrashObjects.DetectarColisionMoneda(m);
    CrashObjects.DetectarColision(a1);
    CrashObjects.DetectarColision(b1);
    CrashObjects.DetectarColisionMoneda(m1);
}, 1000);

window.setInterval( () => {
    i = getRandomInt(1,6);
    CrashObjects.randomColosion(i);
}, 2000);
window.setInterval( () => {
    i = getRandomInt(5,6);
    CrashObjects.randomColosion(i);
}, 4000);


document.addEventListener("DOMContentLoaded", initGame());








