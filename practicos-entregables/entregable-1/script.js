"use strict";

let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");
let limitCanvas = canvas.getBoundingClientRect();
let pencilLine, currentPosition, coordinates;
let selected = null;
let pictureData;

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
    pictureData = context.getImageData(0, 0, canvas.width,canvas.height);
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
        image.onerror = reject;
    })
}

function drawImage (image){
    let imageScaleWidth = image.width;
    let imageScaleHeight = image.height;
    if (image.width > canvas.width || image.height > canvas.height){
        if (image.width > canvas.width){
            let imageAspectRatio = (1.0 * image.height) / image.width;
            imageScaleWidth = canvas.width;
            imageScaleHeight = canvas.width * imageAspectRatio;
        }else{
            let imageAspectRatio = (1.0 * image.width) / image.height;
            imageScaleWidth = canvas.width * imageAspectRatio;
            imageScaleWidth = canvas.width ;
        }
    } 
    canvas.width = imageScaleWidth;
    canvas.height = imageScaleHeight;
    context.drawImage (image ,0, 0, imageScaleWidth, imageScaleHeight);
}

//end load image 

// save image

function saveImage (){
    let save = document.createElement('a');
    save.download = "canvas"
    save.href = canvas.toDataURL("image/png").replace ("image.png","image/octet-string");
    save.click();
}

// end save image

// filters

//binary filter 

function binaryFilter(){
    deselectFilters();
    let button = document.querySelector('#binaryFilter');
    button.classList.add("selected");
    let bkpPicture = backupImage(pictureData);

    for (let x = 0; x < pictureData.width; x++){
        for (let y = 0; y < pictureData.height; y++){
            let i = (x + y * pictureData.width) * 4;
            let index = (pictureData.data[i] + pictureData.data[i + 1] + pictureData.data[i + 2]) / 3;
            if (index <= (255 / 2)){
                let r = 255;
                let g = 255;
                let b = 255;
                setPixel(pictureData, x, y, r, g, b, 255);
            } else {
                let r = 0;
                let g = 0;
                let b = 0;
                setPixel(pictureData, x, y, r, g, b, 255);
            }
        }
    }
    context.putImageData(pictureData, 0, 0);
    pictureData = bkpPicture;
}

// helps 
function setPixel (imageData, x, y, r, g, b, a) {
    let index = (x + y * imageData.width) * 4
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a; 
}

function backupImage(pictureData){
    let backupPicture = new ImageData(pictureData.width, pictureData.height);
    for (let x = 0; x < pictureData.width; x++){
        for (let y = 0; y < pictureData.height; y++){
            let index = (x + y * pictureData.width) * 4
            let r = pictureData.data[index + 0];
            let g = pictureData.data[index + 1];
            let b = pictureData.data[index + 2];
            let a = pictureData.data[index + 3];
            setPixel(backupPicture, x, y, r, g, b, 255);
        }
    }
    return backupPicture;
}

function deselectFilters() {
	let buttons = document.querySelectorAll("button");
	buttons.forEach(b => {
		b.classList.remove("selected");
	})
}