"use strict";

let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");

context.beginPath();
context.fillStyle = "green";
context.fillRect(0, 0, canvas.width, canvas.height);
context.fill();
context.closePath();