"use strict";

let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");
let imageData = context.createImageData(canvas.width, canvas.height);
let r = 200;
let g = 0; 
let b = 200;
let a = 255;

function setPixel (imageData, x, y, r, g, b, a) {
    let index = (x + y * imageData.width) * 4
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a; 
}

function imageDataColour (imageData, r, g, b, a){
    for (let x = 0; x < canvas.width; x++){
        for (let y = 0; y < canvas.height; y++){
            setPixel(imageData, x, y, r, g, b, a);
        }
    }
    context.putImageData(imageData, 0, 0);
}

imageDataColour(imageData, r, g, b, a);