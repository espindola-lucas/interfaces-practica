"use strict";

let canvas;
let context;
let tokens = 25;
let playerRed;
let playerGreen;
let arrayTokens = [];
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
}

document.addEventListener("DOMContentLoaded", mainFunction());