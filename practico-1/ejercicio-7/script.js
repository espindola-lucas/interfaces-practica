"use strict";


function setPixel (imageData, x, y, r, g, b, a) {
    let index = (x + y * imageData.width) * 4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a; 
}

function uploadImage(context){
    let image = new Image();
    image.src = "image.jpg";
    image.onload = function () {
        canvas.width = image.width;
        canvas.height = image.height;
        drawImage(context, image);
        // context.drawImage(image, 0, 0);
    }
}

function drawImage(context, image){
    context.drawImage(image, 0, 0);
}

function averageRGB(imageData, x, y){
    let index = (x + y * imageData.width) * 4;
    let sum = 0;
    sum += imageData.data[index + 0];
    sum += imageData.data[index + 1];
    sum += imageData.data[index + 2];
    return sum / 3;
}

function filterBlackAndWhite(imageData){
    for ( let x = 0; x < canvas.width; x++) {
        for ( let y = 0; y < canvas.height; y++) {
            let avgRGB = averageRGB(imageData, x, y);
            let r = avgRGB;
            let g = avgRGB;
            let b = avgRGB;
            let a = 255;
            setPixel(imageData, x, y, r, g, b, a);
        }
    }
}

function mainFunction(){
    let canvas = document.querySelector("canvas");
    let context = canvas.getContext("2d");
    
    uploadImage(context);
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    filterBlackAndWhite(imageData);

    context.putImageData(imageData, 0, 0);
}

document.addEventListener("DOMContentLoaded", mainFunction);
