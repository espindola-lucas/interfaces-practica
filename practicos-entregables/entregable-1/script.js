"use strict";

let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");
let limitCanvas = canvas.getBoundingClientRect();
let pencilLine, currentPosition, coordinates;
let selected = null;
let pictureData;
let statusImage = 0 ;
let width = canvas.width;
let height = canvas.height;

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
        if (image.width > image.height){
            let imageAspectRatio = (1.0 * image.height) / image.width;
            imageScaleWidth = width;
            imageScaleHeight = width * imageAspectRatio;
        }else{
            let imageAspectRatio = (1.0 * image.width) / image.height;
            imageScaleWidth = height * imageAspectRatio;
            imageScaleHeight = height ;
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
                }else{
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
        let grayscale = [];

        function mixPixel (data){
            return function(x,y,i){
                i = i || 0 ; 
                return data[((pictureData.width*y)+x)*4+i];
            };
        } 

        let data = pictureData.data ;
        let pixel = mixPixel(data);
            for (let y = 0; y< pictureData.height;y++){
                for (let x = 0 ; x < pictureData.width ; x++){
                    let r = pixel(x,y,0);
                    let g = pixel(x,y,1);
                    let b = pixel(x,y,2);
                    let avg = (r + g + b) / 3 ;
                    grayscale.push(avg,avg,avg,255);
                }
            }
            pixel = mixPixel(grayscale);
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

// negative

function negativeFilter(){
    if(statusImage == 1){
        let bkpPicture = backupImage(pictureData);

        for(let x = 0; x < pictureData.width; x++){
            for(let y = 0; y < pictureData.height; y++){
                let index = (x + y * pictureData.width) * 4;
                let r = 255 - pictureData.data[index];
                let g = 255 - pictureData.data[index + 1];
                let b = 255 - pictureData.data[index + 2];
                setPixel(pictureData, x, y, r, g, b, 255);
            }
        }
        context.putImageData(pictureData, 0, 0);
        pictureData = bkpPicture;
    }
}

// end negative

// brightness

function brightnessFilter(){
    if(statusImage == 1){
        let bkpPicture = backupImage(pictureData);
        let filterAmmount = (document.querySelector("#brightnessRange").value) / 100;

        for(let x = 0; x < pictureData.width; x++){
            for(let y = 0; y < pictureData.height; y++){
                let index = (x + y * pictureData.width) * 4;
                let r = pictureData.data[index];
                let g = pictureData.data[index + 1];
                let b = pictureData.data[index + 2];
                let hslPixel = RGBtoHSL(r, g, b);
                
                if(filterAmmount <= 1){
                    hslPixel.l = hslPixel.l * filterAmmount;
                }
                if(filterAmmount > 1){
                    hslPixel.l = hslPixel.l + (100 - hslPixel.l) * (filterAmmount - 1);
                }

                let newRGB = HSLtoRGB(hslPixel.h, hslPixel.s, hslPixel.l);
                r = newRGB.r;
                g = newRGB.g;
                b = newRGB.b;
                setPixel(pictureData, x, y, r, g, b, 255);
            }
        }
        context.putImageData(pictureData, 0, 0);
        pictureData = bkpPicture;
    }
}

// end brightness

// saturation

function saturationFilter(){
    if(statusImage == 1){
        let bkpPicture = backupImage(pictureData);
        let filterAmmount = (document.querySelector("#saturationRange").value) / 100;

        for(let x = 0; x < pictureData.width; x++){
            for(let y = 0; y < pictureData.height; y++){
                let index = (x + y * pictureData.width) * 4;
                let r = pictureData.data[index];
                let g = pictureData.data[index + 1];
                let b = pictureData.data[index + 2];
                let hslPixel = RGBtoHSL(r, g, b);
                
                if(filterAmmount <= 1){
                    hslPixel.s = hslPixel.s * filterAmmount;
                }
                if(filterAmmount > 1){
                    hslPixel.s = hslPixel.s + (100 - hslPixel.s) * (filterAmmount - 1);
                }

                let newRGB = HSLtoRGB(hslPixel.h, hslPixel.s, hslPixel.l);
                r = newRGB.r;
                g = newRGB.g;
                b = newRGB.b;
                setPixel(pictureData, x, y, r, g, b, 255);
            }
        }
        context.putImageData(pictureData, 0, 0);
        pictureData = bkpPicture;
    }
}

// end saturation

// blur

function blurFilter(){
    if(statusImage == 1){
        let bkpPicture = backupImage(pictureData);

        for(let x = 0; x < pictureData.width; x++){
            for(let y = 0; y < pictureData.height; y++){
                let average = averageNeighbors(bkpPicture, x, y);
                let r = average.r;
                let g = average.g;
                let b = average.b;
                setPixel(pictureData, x, y, r, g, b, 255);
            }
        }
        context.putImageData(pictureData, 0, 0);
        pictureData = bkpPicture;
    }
}

// end blur

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

function clearCanvas (){
    context.fillStyle="white";
    context.fillRect(0,0,canvas.width,canvas.height);
    context.beginPath();
    statusImage = 0 ;
}

// function shadowButtons(){
//     clearCanvas ();
//     buttonFilter = document.querySelector(".filters").querySelectorAll("button");

//     buttonBrightness = document.getElementById('filterRangeBrightness').style.visibility = 'hidden';

//     buttonSaturation = document.getElementById('filterRangeSaturation').style.visibility = 'hidden';

//     buttonFilter.forEach(b => {
//         b.style.visibility = 'hidden';
//     })


//     document.getElementById('clear').style.visibility = 'visible';
// }

// function activeButtons(){
//     if(selected == "pencil" || selected == "rubber"){
//         let onload = document.getElementById('onload').style.display = 'none';
//     }else if(statusImage != 0){
//         buttonFilter.forEach(b => {
//             b.style.visibility = 'visible';
//         })
        
//         buttonBrightness = document.getElementById('filterRangeBrightness').style.visibility = 'visible';

//         buttonSaturation = document.getElementById('filterRangeSaturation').style.visibility = 'visible';

//         let paintButtons = document.querySelector(".paint").querySelectorAll("button");

//         let paintInputs = document.querySelector(".paint").querySelectorAll("input");

//         paintButtons.forEach(pb => {
//             pb.style.visibility = 'hidden';
//         })

//         paintInputs.forEach(pi => {
//             pi.style.visibility = 'hidden';
//         })
//     }
// }

// average rgb neighbors
function averageNeighbors(imageData, pixInX, pixInY){
    let average = {r:0,
                    g:0,
                    b:0};
    for(let x = pixInX - 1; x <= pixInX + 1; x++){
        for(let y = pixInY - 1; y <= pixInY + 1; y++){
            let index = (x + y * imageData.width) * 4;
            average.r += imageData.data[index];
            average.g += imageData.data[index + 1];
            average.b += imageData.data[index + 2];
        }
    }

    average.r = Math.floor(average.r / 9);
    average.g = Math.floor(average.g / 9);
    average.b = Math.floor(average.b / 9);

    return average;
}

// rgb to hls
function RGBtoHSL(r, g, b) {
	r /= 255;
	g /= 255;
	b /= 255;

	let cmin = Math.min(r, g, b),
		cmax = Math.max(r, g, b),
		delta = cmax - cmin,
		h = 0,
		s = 0,
		l = 0;

	if (delta == 0)
		h = 0;

	else if (cmax == r)
		h = ((g - b) / delta) % 6;

	else if (cmax == g)
		h = (b - r) / delta + 2;

	else
		h = (r - g) / delta + 4;

	h = Math.round(h * 60);

	if (h < 0)
		h += 360;

	l = (cmax + cmin) / 2;

	s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

	s = + (s * 100).toFixed(1);
	l = + (l * 100).toFixed(1);

	return {
		"h": h,
		"s": s,
		"l": l
	};
}

//hsl to rgb
function HSLtoRGB(h, s, l) {
	s /= 100;
	l /= 100;

	let c = (1 - Math.abs(2 * l - 1)) * s,
		x = c * (1 - Math.abs((h / 60) % 2 - 1)),
		m = l - c / 2,
		r = 0,
		g = 0,
		b = 0;

	if (0 <= h && h < 60) {
		r = c; g = x; b = 0;
	} else if (60 <= h && h < 120) {
		r = x; g = c; b = 0;
	} else if (120 <= h && h < 180) {
		r = 0; g = c; b = x;
	} else if (180 <= h && h < 240) {
		r = 0; g = x; b = c;
	} else if (240 <= h && h < 300) {
		r = x; g = 0; b = c;
	} else if (300 <= h && h < 360) {
		r = c; g = 0; b = x;
	}
	r = Math.round((r + m) * 255);
	g = Math.round((g + m) * 255);
	b = Math.round((b + m) * 255);

	return {
		"r": r,
		"g": g,
		"b": b
	};
}

document.addEventListener("DOMContentLoaded", clearCanvas());