"use strict";

let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");
let imageData = context.createImageData(canvas.width, canvas.height);
let r = 17;
let g = 102; 
let b = 17;
let a = 255;

let colour_1 = [0, 68, 0];
let colour_2 = [85, 170, 85];
let colour_3 = [136, 204, 136];

function setPixel (imageData, x, y, r, g, b, a) {
    let index = (x + y * imageData.width) * 4
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a; 
}

function dif_color(colour_1,colour_2) {
    let result = [];
    result[0] = colour_2[0] - colour_1[0];
    result[1] = colour_2[1] - colour_1[1];
    result[2] = colour_2[2] - colour_1[2];
    return result;
}

function tonalHarmonies (imageData, colour_1, colour_2, colour_3){
    
    let dif_1 = dif_color(colour_1, colour_2);
    let cft_1_r = dif_1[0] / (imageData.width / 2);
    let cft_1_g = dif_1[1] / (imageData.width / 2);
    let cft_1_b = dif_1[2] / (imageData.width / 2);

    let dif_2 = dif_color(colour_2, colour_3);
    let cft_2_r = dif_2[0] / (imageData.width / 2);
    let cft_2_g = dif_2[1] / (imageData.width / 2);
    let cft_2_b = dif_2[2] / (imageData.width / 2);

    for ( let x = 0; x < canvas.width; x++) {
        for ( let y = 0; y < canvas.height; y++) {
            if ( x < (canvas.width / 2)) {
                r = colour_1[0] + cft_1_r * x;
                g = colour_1[1] + cft_1_g * x;
                b = colour_1[2] + cft_1_b * x;
            }else{
                r = colour_2[0] + cft_2_r * (x - (imageData.width / 2));
                g = colour_2[1] + cft_2_g * (x - (imageData.width / 2));
                b = colour_2[2] + cft_2_b * (x - (imageData.width / 2));
            }
            setPixel(imageData, x, y, r, g, b, a);
        }
    }
    context.putImageData(imageData, 0, 0);
}

tonalHarmonies(imageData, colour_1, colour_2, colour_3);