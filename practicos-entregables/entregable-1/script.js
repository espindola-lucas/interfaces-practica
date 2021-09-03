"use strict";

let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");
let limitCanvas = canvas.getBoundingClientRect();
let pencilLine, currentPosition, coordinates;
let selected = null;


// paint 

function prepareCanvas(){
    canvas.addEventListener("mousedown", mouseStatus, false);
    canvas.addEventListener("mouseup", mouseStatus, false);
    canvas.addEventListener("mousemove", paint, false);
}

function drawPencil(color){
    selected = "pencil";
    prepareCanvas();
}

function drawRubber(){
    selected = "rubber";
    prepareCanvas();
}

function mouseStatus(){
    pencilLine = !pencilLine;
    currentPosition = getCoordinates(event);
}

function getCoordinates(event){
    let posX;
    let posY;

    if(event.pageX || event.pageY){
        posX = event.pageX - limitCanvas.left;
        posY = event.pageY - limitCanvas.top;
    } else {
        posX = event.clientX - limitCanvas.left;
        posY = event.clientY - limitCanvas.top;
    }
    return {
        x:posX,
        y:posY
    };
}

function paint(event){
    // console.log("holasadas");
    if(pencilLine && selected == "pencil"){
        // console.log("hola");
        coordinates = getCoordinates(event);
        context.beginPath();
        context.moveTo(currentPosition.x, currentPosition.y);
        context.lineTo(coordinates.x, coordinates.y);
        currentPosition = {
            x:coordinates.x,
            y:coordinates.y
        };
        context.lineWidth = document.getElementById("tamaño").value;
        context.strokeStyle = document.getElementById("color").value; 
        context.stroke();
    }
    if(pencilLine && selected == "rubber"){
        let coordinates = getCoordinates(event);
        context.beginPath();
        context.moveTo(currentPosition.x, currentPosition.y);
        context.lineTo(coordinates.x, coordinates.y);
        currentPosition = {
            x:coordinates.x,
            y:coordinates.y
        };
        context.lineWidth = 10;
        context.strokeStyle = "#FFFFFF";
        context.stroke();
    }
}
//end paint 

//load image

let filePictureChooser = document.querySelector('.pictureChooser'); 
filePictureChooser.addEventListener("change", setImage);

async function setImage (){
    let choosenFile = this;
    let content = await processPicture (choosenFile);
    let image = await loadPictureAsync (content);
    drawImage(image);
    let imageData =context.getImageData(0,0,canvas.width,canvas.height);
    }

async function processPicture(image){
    try{
        let file = image.files[0];
        let content = await readPictureAsync (file);
        return content;
    }catch (err){
        console.log(err);
    }
}

async function readPictureAsync(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
    })
}

function loadPictureAsync (content){
    return new Promise ((resolve,reject) => {
        let image = new Image();
        image.src = content;
        image.onload = () => {
            resolve (image)
        };
        image.onerror = reject ;
    })
}

function drawImage (image){
    let imageScaleWidth = image.width;
    let imageScaleHeight = image.height;
    if (image.width > canvas.width || image.height > canvas.height){
        if (image.width > canvas.width){
            let imageAspectRatio = (1.0 * image.height) / image.width ;
            imageScaleWidth = canvas.width;
            imageScaleHeight = canvas.width * imageAspectRatio;
        }else{
            let imageAspectRatio = (1.0 * image.width) / image.height ;
            imageScaleWidth = canvas.width * imageAspectRatio;
            imageScaleWidth = canvas.width ;
        }
    } 
    canvas.width = imageScaleWidth ;
    canvas.height = imageScaleHeight;
    context.drawImage (image , 0,0 , imageScaleWidth , imageScaleHeight);
}

//end load image 

function saveImage (){
    let save = document.createElement('a');
    save.download = "canvas"
    save.href = canvas.toDataURL("image/png").replace ("image.png","image/octet-string");
    save.click();
}