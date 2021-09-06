"use strict";

let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");
let limitCanvas = canvas.getBoundingClientRect();
let pencilLine, currentPosition, coordinates;
let selected = null;
let pictureData;
let statusImage = 0 ;

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
      if(pencilLine && selected == "pencil"){
        coordinates = getCoordinates(event);
        context.beginPath();
        context.moveTo(currentPosition.x, currentPosition.y);
        context.lineTo(coordinates.x, coordinates.y);
        currentPosition = {
            x:coordinates.x,
            y:coordinates.y
        };
        context.lineWidth = 1;
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
    statusImage = 1 ;
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
    if(statusImage ==  1){
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
}
//end binary

//sepia filter
function sepiaFilter (){
    if(statusImage ==  1){
         deselectFilters();
    let button = document.querySelector('#sepiaFilter');
    button.classList.add("selected");
    let bkpPicture = backupImage(pictureData);
    for (let x = 0; x < pictureData.width; x++){
        for (let y = 0; y < pictureData.height; y++){
            let i = (x+y*pictureData.width)*4;
            let r = 0.393*pictureData.data[i]+ 0.769*pictureData.data [i+1]+ 0.189*pictureData.data [i+2];
            let g = 0.393*pictureData.data[i]+ 0.686*pictureData.data [i+1]+ 0.168*pictureData.data [i+2];
            let b = 0.272*pictureData.data[i]+ 0.534*pictureData.data [i+1]+ 0.131*pictureData.data [i+2];
            setPixel(pictureData, x, y, r, g, b, 255);
        }
    }
    context.putImageData(pictureData, 0, 0);
    pictureData = bkpPicture;
}
}
//end sepia

//sobel filter 
function edgeDetectionFilter (){
    if(statusImage ==  1){
    deselectFilters();
    let button = document.querySelector('#sepiaFilter');
    button.classList.add("selected");
    let bkpPicture = backupImage(pictureData);
    let k_x =[
        [-1,0,1],
        [-2,0,2],
        [-1,0,1]
    ];
    let k_y =[
        [-1,-2,-1],
        [0,0,0],
        [1,2,1]
    ];
    let datos = pictureData ;
    let EscalaGrises = [];

    function mezclarPixel (data){
    return function(x,y,i){
        i = i || 0 ; 
        return data[((pictureData.width*y)+x)*4+i];
    };
    } 

    let data = pictureData.data ;
    let pixel = mezclarPixel(data);
        for (let y = 0; y< pictureData.height;y++){
            for (let x = 0 ; x < pictureData.width ; x++){
                let r = pixel(x,y,0);
                let g = pixel(x,y,1);
                let b = pixel(x,y,2);
                let avg = (r + g + b) / 3 ;
                EscalaGrises.push(avg,avg,avg,255);
            }
        }
        pixel = mezclarPixel(EscalaGrises);
        for (let y = 0; y< pictureData.height;y++){
            for (let x = 0 ; x < pictureData.width ; x++){
                let pixelX = (
                (k_x[0][0]* pixel (x-1,y-1))+
                (k_x[0][1]* pixel (x,y-1))+
                (k_x[0][2]* pixel (x+1,y-1))+
                (k_x[1][0]* pixel (x-1,y))+
                (k_x[1][1]* pixel (x,y))+
                (k_x[1][2]* pixel (x+1,y))+
                (k_x[2][0]* pixel (x-1,y+1))+
                (k_x[2][1]* pixel (x,y+1))+
                (k_x[2][2]* pixel (x +1,y+1))
                );
                let pixelY = (
                (k_y[0][0]*pixel(x-1,y-1))+
                (k_y[0][1]*pixel(x,y-1))+
                (k_y[0][2]*pixel(x+1,y-1))+
                (k_y[1][0]*pixel(x-1,y))+
                (k_y[1][1]*pixel(x,y))+
                (k_y[1][2]*pixel(x+1,y))+
                (k_y[2][0]*pixel(x-1,y+1))+
                (k_y[2][1]*pixel(x,y+1))+
                (k_y[2][2]*pixel(x+1,y+1))
                );
            let magnitud = Math.sqrt((pixelX * pixelX) + (pixelY * pixelY))>>>0;
            magnitud = (magnitud/1000) * 255;
            setPixel(datos,x,y,magnitud,magnitud,magnitud,255);
        }
    } 
    context.putImageData(datos, 0, 0);      
    pictureData = bkpPicture;
} 
}
// end sobel

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
function clearFilter (){
    let button = document.querySelector('#clearFilter');
    button.classList.add("selected");
    context.putImageData(pictureData ,0, 0 );
}

function deselectFilters() {
	let buttons = document.querySelectorAll("button");
	buttons.forEach(b => {
		b.classList.remove("selected");
	})
}
function clearCanvas (){
    context.clearRect(0, 0, canvas.width, canvas.height);
    statusImage = 0 ;
}
