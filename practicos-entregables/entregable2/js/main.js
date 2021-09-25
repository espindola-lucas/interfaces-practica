"use strict";

let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");
let play = document.getElementById("frontGame");
let tokens = 25;
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
let filas = 7;
let columnas = 7;
let m =[];
const rowsAndColumns ={
    f:7,
    c:7
};
const turno = {
    turn: null
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
}

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
     canvas.style.visibility = 'hidden';
}

 function initGame(){
    canvas.style.visibility = 'visible';
    play.style.display = 'none';
    board();
    token();
    game();
    document.addEventListener("mousedown", Help.onMouseDown, false);
    document.addEventListener("mouseup", Help.onMouseUp, false);
    document.addEventListener("mousemove", Help.onMouseMove, false);
}
 async function token (){
    img = await Help.uploadImage("./images/redToken.jpg");
    player1.colour = img;
    playerRed = new Token(token1, token2, player1.colour, tokens, arrayTokens, context);
    playerRed.createToken();
    playerRed.drawToken();
    player1.arrayTokensPlayer1 = playerRed.getToken1();
    img = await Help.uploadImage("./images/greenToken.jpg");
    player2.colour = img;
    playerGreen = new Token(token1, token2, player2.colour, tokens, arrayTokens, context);
    playerGreen.createToken();
    playerGreen.drawToken();
    player2.arrayTokensPlayer2 = playerRed.getToken2();
    }
async function board (){
        img = await Help.uploadImage("./images/table.jpg");
        let  board = new Board(canvas, context, img, filas, columnas, arrayLockers,arrayConteiners,m);
        board.drawBackground();
        board.createLockers();
        board.drawcontainers();
        alllockers.array = board.getArrayLockers();
        allConteiners.array = board.getArrayConteiners();
        imageBoard.img = img ;
       MatrixLockers.matrix=board.getMatrix()
    }

    function game (){
     let g = new Game (filas,columnas,matrixArray)
     g.createMatrix();
     Juego.matrix = g.getMatrix();
    }


document.addEventListener("DOMContentLoaded", initGame());
