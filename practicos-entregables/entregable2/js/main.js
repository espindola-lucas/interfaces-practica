"use strict";

let canvas;
let context;
let tokens = 25;
let playerRed;
let playerGreen;
let arrayTokens = [];
let arrayLockers = [];
let isMouseDown = false;
let lastClickedFigure = null;

const allFig = {
    array: null
};

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

    allFig.array = playerGreen.getArrayToken();
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

document.addEventListener("DOMContentLoaded", mainFunction());
document.addEventListener("mousedown", Help.onMouseDown, false);
document.addEventListener("mouseup", Help.onMouseUp, false);
document.addEventListener("mousemove", Help.onMouseMove, false);