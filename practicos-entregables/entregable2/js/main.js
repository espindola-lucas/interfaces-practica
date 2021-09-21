"use strict";

let canvas;
let context;
let tokens = 25;
let playerRed;
let playerGreen;
let arrayTokens = [];
let arrayLockers = [];
let array = [];
let isMouseDown = false;
let lastClickedFigure = null;

const player1 = {
    name: 1,
    colour: "red"
};

const player2 = {
    name: 2,
    colour: "green"
};

function mainFunction(){
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");

    playerRed = new Token(player1.colour, tokens, arrayTokens, context);
    playerRed.createToken();
    playerRed.drawToken();

    playerGreen = new Token(player2.colour, tokens, arrayTokens, context);
    playerGreen.createToken();
    playerGreen.drawToken();

    array = playerGreen.getArrayToken();
    board ();
}

function board (){
    let img = new Image ();
    img.src = "./images/board.jpeg";
    img.onload = function (){
        let  board = new Board(canvas, context, img, 7, 7, arrayLockers);
        board.drawBackground();
        board.createLockers();
        board.drawcontainers();
    }
}

function onMouseDown(e){
    isMouseDown = true;
    if(lastClickedFigure != null){
        lastClickedFigure = null;
    }

    let clickFigure = findClickedFigure(e.layerX, e.layerY);
    if(clickFigure != null){
        lastClickedFigure = clickFigure;
    }
    Token.drawTokens(array);
}

function onMouseMove(e){
    if(isMouseDown && lastClickedFigure != null){
        lastClickedFigure.setPosition(e.layerX, e.layerY);
        Token.drawTokens(array);
    }
}

function onMouseUp(e){
    isMouseDown = false;
}

function findClickedFigure(x, y){
    for(let i = 0; i < array.length; i++){
        const element = array[i];
        if(element.isPointInside(x, y)){
            return element; 
        }
    }
}


document.addEventListener("DOMContentLoaded", mainFunction());
document.addEventListener("mousedown", onMouseDown, false);
document.addEventListener("mouseup", onMouseUp, false);
document.addEventListener("mousemove", onMouseMove, false);
