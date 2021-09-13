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
let originImage;

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
    if (statusImage == 1 ){
        pictureData = context.getImageData(0, 0, canvas.width,canvas.height);
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
    originImage =  context.getImageData(0, 0, canvas.width,canvas.height);
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

function drawImage (image){ // dibuja la imagen en el canvas.
    let imageScaleWidth = image.width;  // guarda el ancho original de la imagen
    let imageScaleHeight = image.height;// guarda el largo original de la imagen
        if (image.width > image.height){ 
            let imageAspectRatio = (1.0 * image.height) / image.width;// saca el Aspect Ratio de la imagen para modificar el alto.
            imageScaleWidth = width; // modifica el ancho de la imagen por el ancho del canvas.
            imageScaleHeight = width * imageAspectRatio; // modifica el alto de la imagen (w x Aspect Ratio) .
        }else{
            let imageAspectRatio = (1.0 * image.width) / image.height;// saca el Aspect Ratio de la imagen para modificar el ancho.
            imageScaleWidth = height * imageAspectRatio;// modifica el ancho de la imagen (h x Aspect Ratio) .
            imageScaleHeight = height ;// modifica el alto de la imagen por el alto del canvas.
        }
    canvas.width = imageScaleWidth; // le asigno al ancho del  canvas el ancho con  que voy a dibujar la imagen.
    canvas.height = imageScaleHeight;// le asigno al alto del  canvas el alto con  que voy a dibujar la imagen.
    context.drawImage (image ,0, 0, imageScaleWidth, imageScaleHeight); // dibula la imagen en el canvas.
    statusImage = 1 ;// el estado de la imagen en 1 porque actualmente en el canvas hay dibujada una imagen.
}

//end load image 

// save image

function saveImage (){
    let save = document.createElement('a'); // crea un elemento 
    save.download = "canvas" ; // cuando se descargue ese elemento lo va a hacer con el nombre "canvas"
    save.href = canvas.toDataURL("image/png").replace ("image.png","image/octet-string");// devuelve un URL con el formato png
    save.click(); // se guarda en disco cuando se hace click
}

// end save image

// filters

//binary filter 
//El filtro consta de que los pixeles pueden tener uno de exactamente dos colores, blanco y negro.
function binaryFilter(){
    if(statusImage ==  1){  //pregunta si hay seteada una imagen
        let bkpPicture = backupImage(pictureData);  //hace un backup de la imagen original.
        for (let x = 0; x < pictureData.width; x++){    //recorre el ancho de la imagen
            for (let y = 0; y < pictureData.height; y++){   //recorre el alto de la imagen
                let i = (x + y * pictureData.width) * 4;    //convierte la matriz en un arreglo
                let index = (pictureData.data[i] + pictureData.data[i + 1] + pictureData.data[i + 2]) / 3; //suma los datos de la imagen (RGB) y los divide
                if (index <= (255 / 2)){    //si el es index menor a la 127, setea RGB en blanco 
                    let r = 255;
                    let g = 255;
                    let b = 255;
                    setPixel(pictureData, x, y, r, g, b, 255);
                }else{  //si el index es mayor a la 127, setea RGB en negro
                    let r = 0;
                    let g = 0;
                    let b = 0;
                    setPixel(pictureData, x, y, r, g, b, 255);
                }
            }
        }
        context.putImageData(pictureData, 0, 0);    //devuelve la imagen con el filtro aplicado
        pictureData = bkpPicture;   
    }
}
//end binary

//sepia filter
function sepiaFilter (){
    if(statusImage ==  1){ // si da true es porq existe una imagen y procede a aplicar el filtro , si da false quiere decir que no existe una imagen y no se debe aplicar el filtro 
         let bkpPicture = backupImage(pictureData); // hace un backup de la imagen original.
        for (let x = 0; x < pictureData.width; x++){ // recorre ancho de la imagen .
            for (let y = 0; y < pictureData.height; y++){ // recorre largo de la imagen. 
                let i = (x+y*pictureData.width)*4; // 
                let r = 0.393*pictureData.data[i]+ 0.769*pictureData.data [i+1]+ 0.189*pictureData.data [i+2];
                let g = 0.393*pictureData.data[i]+ 0.686*pictureData.data [i+1]+ 0.168*pictureData.data [i+2];
                let b = 0.272*pictureData.data[i]+ 0.534*pictureData.data [i+1]+ 0.131*pictureData.data [i+2];
               // A cada pixel (rgb) se le asigna una formula que consiste en tomar el r(pictureData.data[i]) ,  g (pictureData.data[i+1])  y  b (pictureData.data[i+2]) y
               // a cada uno multiplicarle un valor para tratar de equilibrarlos y formar el efecto.
                setPixel(pictureData, x, y, r, g, b, 255);
            }
        }
        context.putImageData(pictureData, 0, 0);
         pictureData = bkpPicture;
    }
}
//end sepia

//border detection filter with sobel 
function edgeDetectionFilter (){
    if(statusImage ==  1){
        let bkpPicture = backupImage(pictureData);
        let k_x =[
            [-1,0,1],
            [-2,0,2],
            [-1,0,1]
        ];  // matriz para multiplicar el lado  horizontal
        let k_y =[
            [-1,-2,-1],
            [0,0,0],
            [1,2,1]
        ];// matriz para multiplicar el lado vertical
        let datos = pictureData ;
        let grayscale = [];

        function mixPixel (data){
            return function(x,y,i){
                i = i || 0 ; 
                return data[((pictureData.width*y)+x)*4+i];//accede a los datos de la amagen solo si el valor de i es i o 0
            };
        } 

         let data = pictureData.data ; // toma los datos de la imagen a la que se le quiere aplicar el filtro 
         let pixel = mixPixel(data); // contiene la funcion anonima que rsta dentro de mixPixel () , paso la variable data para que cuando se acceda con x,y recorra sobre los datos que tiene la variable data.
             for (let y = 0; y< pictureData.height;y++){
                 for (let x = 0 ; x < pictureData.width ; x++){
                     let r = pixel(x,y,0); // accede al pixel r de la posicion x,y actual   
                     let g = pixel(x,y,1); // accede al pixel g de la posicion x,y actual   
                     let b = pixel(x,y,2);// accede al pixel b de la posicion x,y actual   
                     let avg = (r + g + b) / 3 ; // hace el promedio de los 3 para transformar en una tonalidad gris 
                     grayscale.push(avg,avg,avg,255); // va guardando en un arreglo los valores que van tomando los pixel rgb y el a en 255 ya que no es necesario modificar 
                 }
             }
            
           
          pixel = mixPixel(grayscale); // contiene la funcion anonima que rsta dentro de mixPixel () , paso la variable grayscale que tiene los valores de los pixeles de la imagen con las tonalidades de grises,  para que cuando se acceda con x,y recorra sobre los datos que tiene la variable grayscale.
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
                    );//multiplico los valores de la matriz horizontal  (k_x) con los pixel de la imagen con las tonalidades de grises  y los guardo como matriz en pixelX 
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
                    );//multiplico los valores de la matriz vertical (k_y) con los pixel de la imagen con las tonalidades de grises  y lo guardo como matriz en pixelY
                    let magnitud = Math.sqrt((pixelX * pixelX) + (pixelY * pixelY));// Math.sqrt retorna la raiz cuadrada de  pixelX elevado al cuadrado (pixelX * pixelX) + pixelY elevado al cuadrado (pixelY * pixelY).
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
//El negativo lo que hace es restarle 255 el color de cada pixel
function negativeFilter(){
    if(statusImage == 1){
        let bkpPicture = backupImage(pictureData);
        for(let x = 0; x < pictureData.width; x++){
            for(let y = 0; y < pictureData.height; y++){
                let index = (x + y * pictureData.width) * 4;
                let r = 255 - pictureData.data[index];  //le resta 255 a R
                let g = 255 - pictureData.data[index + 1];  //le resta 255 a G
                let b = 255 - pictureData.data[index + 2];  //le resta 255 a B
                setPixel(pictureData, x, y, r, g, b, 255);
            }
        }
        context.putImageData(pictureData, 0, 0);
        pictureData = bkpPicture;
    }
}

// end negative

// brightness
//El filtro se logra aumento el brillo al canvas, para eso pase de RGB a HSL, y aumente la "l" (Lightness) o la disminui, dependiendo que se haga.
function brightnessFilter(){
    if(statusImage == 1){
        let bkpPicture = backupImage(pictureData);
        let filterAmmount = (document.querySelector("#brightnessRange").value) / 100;
        for(let x = 0; x < pictureData.width; x++){
            for(let y = 0; y < pictureData.height; y++){
                let index = (x + y * pictureData.width) * 4;
                let r = pictureData.data[index];    //tomo los valores de r de la imagen
                let g = pictureData.data[index + 1];    //tomo los valores de g de la imagen
                let b = pictureData.data[index + 2];    //tomo los valores de b de la imagen
                let hslPixel = RGBtoHSL(r, g, b);   //paso las variables con los valores de RGB a una funcion, para pasarlos HSL
                
                if(filterAmmount <= 1){ //si cantidad de brillo es menor o igual a 1, multiplacara "l" por la cantidad de filtro deseado
                    hslPixel.l = hslPixel.l * filterAmmount;
                }
                if(filterAmmount > 1){  //si la cantidad de brillo es mayor a 1, le restare a "l" la cantidad de filtro deseado
                    hslPixel.l = hslPixel.l + (100 - hslPixel.l) * (filterAmmount - 1);
                }

                let newRGB = HSLtoRGB(hslPixel.h, hslPixel.s, hslPixel.l);  //devuelvo los pixeles en RGB para poder usarlos en cada pixel
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
//El filtro se logra aumento la saturacion al canvas, para eso pase de RGB a HSL, y aumente la "s" o la disminui, dependiendo que se haga.
//El procedimiento es similar al que que esta explicado en brightnessFilter(), lo que cambia es que es vez de aumentar o disminuir la "l", se aumenta o disminuye la "s" (Saturation).
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
//El filtro de blur se logra tomando un pixel de la imagen junto a todos sus pixeles vecinos, y dividiendolos por la cantidad de pixeles tomados, ya que un pixel que esta en el x:100, y:100 de la imagen va a tener 8 pixeles vecinos, mientras que un pixel qu esta x:0, y:0, va a tener 3 pixeles vecinos
function blurFilter(){
    if(statusImage == 1){
        let bkpPicture = backupImage(pictureData);
        for(let x = 0; x < pictureData.width; x++){
            for(let y = 0; y < pictureData.height; y++){
                let average = averageNeighbors(bkpPicture, x, y);   //con el x, y de cada imagen puede calcular la cantidad de vecinos que tiene, para asi dividirlo por la cantidad que son. Y luego setea en en cada pixel su valor divido.
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

 
    // clear Filter
function clearFilter (){
     context.putImageData(pictureData,0, 0 );//pinta los datos que contiene originImage (datos de la imagen editada con lapiz o con algun filtro) en el canvas.
}
// end Clear Filter
     
 // original image
function originalImage (){
  context.putImageData(originImage,0,0);//pinta los datos que contiene originImage (datos de la imagen sin editar) en el canvas.
}
// end original image

// Clear Canvas
function clearCanvas (){
    context.fillStyle="white"; // color del rectangulo
    context.fillRect(0,0,canvas.width,canvas.height); // dibuja un rectangulo
    statusImage = 0 ; // esta variable de asigno 0 porque si habia una imagen antes de limpiar el lienzo luego de que se limpie no va a estar mas dicha imagen
}
// end Clear Canvas

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