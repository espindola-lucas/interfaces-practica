"use strict";

let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");
let imageData = context.createImageData(canvas.width, canvas.height);
let r = 0;
let g = 0; 
let b = 0;
let a = 255;

function setPixel (imageData, x, y, r, g, b, a) {
    let index = (x + y * imageData.width) * 4
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a; 
}

function threeGradient (imageData, r, g, b, a){
    for (let x = 0; x < canvas.width; x++){
        for (let y = 0; y < canvas.height; y++){
            let coefficient = 255 / (canvas.width / 2);
            if ( x <= (canvas.width / 2)) {
                r = coefficient * x;
                g = coefficient * x;
            }else{
                g = 2 * (255 - ( x / 2 * coefficient));
            }
            setPixel (imageData, x, y, r, g, b, a);
        }
    }
    context.putImageData(imageData, 0, 0);
}

threeGradient(imageData, r, g, b, a);