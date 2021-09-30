"use strict";

let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");
let play = document.getElementById("frontGame");
let timeOut = document.getElementById("timeOut");
let mainMenu = document.getElementById("menu");
let timerDiv = document.getElementById("timer");
let tokens =2;
let playerRed;
let playerGreen;
let arrayTokens = [];
let arrayLockers = [];
let arrayConteiners = [];
let matrixArray = [];
let isMouseDown = false;
let lastClickedFigure = null;
let img;
let token1 = [];
let token2 = [];
let m =[];
let hiddenMainMenu = false;
let countSeconds, countMinutes, seconds, minutes;



const rowsAndColumns ={
    f:7,
    c:7
};

const turno = {
    turn: null
};

const Rows ={
    empty:[]
};

const Juego ={
    matrix : null 
};

const oldPositions = {
    X: null ,
    Y : null,
    selected : null ,
    positionInArray: null,
    array : null
};

const imageBoard = {
    img: null
};

const alllockers = {
    array: null
};
const MatrixLockers={
    matrix:null
};

const allConteiners = {
    array: null
};

const player1 = {
    name: 1,
    arrayTokensPlayer1: 0,
    colour:"./images/redToken.jpg"
};

const player2 = {
    name: 2,
    arrayTokensPlayer2: 0,
    colour: "./images/greenToken.jpg"
};

const currentPlayer = {
    actual: player1.name
};

function hiddenGame(){
    if(hiddenMainMenu == false){
        canvas.style.visibility = 'hidden';
        mainMenu.style.visibility = 'hidden';
        timerDiv.style.visibility = 'hidden';
    }else{
        canvas.style.visibility = 'hidden';
        mainMenu.style.visibility = 'visible';
    }
}

function initGame(){
    canvas.style.visibility = 'visible';
    play.style.display = 'none';
    timerDiv.style.visibility = 'visible';
    tokenANDboard();
    game();

    
    timer(10);
    document.addEventListener("mousedown", Help.onMouseDown, false);
    document.addEventListener("mouseup", Help.onMouseUp, false);
    document.addEventListener("mousemove", Help.onMouseMove, false);
}

async function tokenANDboard(){

    img = await Help.uploadImage("./images/redToken.png");
    player1.colour = img;
    playerRed = new Token(token1, token2, player1.colour, tokens, arrayTokens, context);
    playerRed.createToken();
    player1.arrayTokensPlayer1 = playerRed.getToken1();
    playerRed.drawToken(player1.arrayTokensPlayer1);
    
    img = await Help.uploadImage("./images/greenToken.png");
    player2.colour = img;
    playerGreen = new Token(token1, token2, player2.colour, tokens, arrayTokens, context);
    playerGreen.createToken();
    player2.arrayTokensPlayer2 = playerRed.getToken2();
    playerGreen.drawToken(player2.arrayTokensPlayer2);
    board();
}

async function board (){
    img = await Help.uploadImage("./images/table.png");
    let  board = new Board(canvas, context, img,rowsAndColumns.f , rowsAndColumns.c, arrayLockers,arrayConteiners,m);
    board.drawBackground();
    board.createLockers();
    board.drawcontainers();
    alllockers.array = board.getArrayLockers();
    allConteiners.array = board.getArrayConteiners();
    imageBoard.img = img ;
    MatrixLockers.matrix=board.getMatrix()
}

function game (){
    let g = new Game (rowsAndColumns.f,rowsAndColumns.c,matrixArray)
    g.createMatrix();
    Juego.matrix = g.getMatrix();
    Rows.empty = Game.emptyFile();
}

function timer(stop){
    countSeconds = 0;
    countMinutes = 0;
    seconds = document.getElementById("segundos");
    minutes = document.getElementById("minutos");

    window.setInterval( () => {
     
            if(stop != countSeconds){
                if (countSeconds == 60){
                    countSeconds = 0;
                    countMinutes++;
                    minutes.innerHTML = countMinutes;
                    if(countMinutes == 0){
                        countMinutes = 0;
                    }
                }
            seconds.innerHTML = countSeconds;
            countSeconds++;
            }else{
                timeOut.innerHTML = 'Uups, se acabo el tiempo!';
                timeOut.style.visibility = 'visible';
                hiddenMainMenu = true,
                timerDiv.style.visibility = 'hidden';
                hiddenGame();
                countSeconds = 0;
                countMinutes = 0;
            }
        
       
    }, 1000)
}


document.addEventListener("DOMContentLoaded", hiddenGame());