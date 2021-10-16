class colisionesObjeto{
static randomColision (){
let elegido= helps.getRandomInt(0,1)
let flor = document.getElementById("flor");
let fuego = document.getElementById("fuego");
    switch(elegido){  
        case 0: 
        flor.className= "";
        flor.className= "flor";
            console.log ('flor')
            break;
            
        case 1 : 
        fuego.className= "";
        fuego.className= "fuego";
        console.log ('fuego')
            break;
    

        }
        }

}