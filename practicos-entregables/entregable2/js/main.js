"use strict";

let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");
let play = document.getElementById("frontGame");
let timeOut = document.getElementById("timeOut");
let mainMenu = document.getElementById("menu");
let timerDiv = document.getElementById("timer");
let player = document.getElementById("jugador");
let finishGame = document.getElementById("finishGame");
let playerRed;
let playerGreen;
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
let countSeconds, countMinutes, seconds, minutes, code;

const Rows ={
    empty:[]
};
const Juego ={
    matrix : null ,
    winner : 0,
    rows:7,
    Columns:8,
    Tokens:21, 
    dimencion : 7*8
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
        canvas.style.display = 'none';
        mainMenu.style.visibility = 'hidden';
        timerDiv.style.visibility = 'hidden';
        finishGame.style.display = 'none';
    }else{
        timerDiv.style.visibility = 'hidden'
        canvas.style.display = 'none';
        mainMenu.style.visibility = 'visible';
        player.style.display = 'none';
        finishGame.style.display = 'block';
    }
}

function initGame(){
    canvas.style.display = 'block';
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
    img = await Help.uploadImage("./images/bp.png");
    player1.colour = img;
    playerRed = new Token(token1, token2, player1.colour, Juego.Tokens, context,Juego.forma);
    playerRed.createToken();
    player1.arrayTokensPlayer1 = playerRed.getToken1();
    playerRed.drawToken(player1.arrayTokensPlayer1);
    
    img = await Help.uploadImage("./images/greenToken.png");
    player2.colour = img;
    playerGreen = new Token(token1, token2, player2.colour,Juego.Tokens, context,Juego.forma);
    playerGreen.createToken();
    player2.arrayTokensPlayer2 = playerRed.getToken2();
    playerGreen.drawToken(player2.arrayTokensPlayer2);
    board();
}

async function board (){
    img = await Help.uploadImage("./images/table.jpeg");
    let  board = new Board(canvas, context, img,Juego.rows , Juego.Columns, arrayLockers,arrayConteiners,m,Juego.forma);
    board.drawBackground();
    board.createLockers();
    board.drawcontainers();
    alllockers.array = board.getArrayLockers();
    allConteiners.array = board.getArrayConteiners();
    imageBoard.img = img ;
    MatrixLockers.matrix=board.getMatrix()
    
}

function game (){
    let g = new Game (Juego.rows,Juego.Columns,matrixArray)
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
        if(stop != countMinutes){
            if (countSeconds == 60){
                countSeconds = 0;
                countMinutes++;
                minutes.innerHTML = countMinutes;
                if(countMinutes == 0){
                    countMinutes = 0;
                }
            }
            player.innerHTML = 'Turno de Jugador: ' + currentPlayer.actual;
            Winner();
        seconds.innerHTML = countSeconds;
        countSeconds++;
        }else{
            timeOut.innerHTML = 'Uups, se acabo el tiempo!';
            hiddenMainMenu = true,
            hiddenGame();
        }
    }, 1000)
}

function Winner (){
    if (Juego.winner != 0 && Juego.winner != "Empate"){
        countSeconds = 0;
        countMinutes = 0;
        timerDiv.style.visibility = 'hidden'
        canvas.style.display = 'none';
        mainMenu.style.visibility = 'visible';
        timeOut.innerHTML = 'El jugador '+  Juego.winner  +  ' gano';
        player.style.display = 'none'
        finishGame.style.display = 'block';
    }else if (Juego.winner =="Empate"){ 
        countSeconds = 0;
        countMinutes = 0;
        timerDiv.style.visibility = 'hidden'
        canvas.style.display = 'none';
        mainMenu.style.visibility = 'visible';
        timeOut.innerHTML = 'Empate!';
        player.style.display = 'none'
        finishGame.style.display = 'block';
    }
}


document.addEventListener("DOMContentLoaded", hiddenGame());