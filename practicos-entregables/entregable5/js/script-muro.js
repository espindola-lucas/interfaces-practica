
function pintar (){
    document.getElementById('box-amigo').style.backgroundColor = "rgba(234, 186, 234, 0.6)";
}
function cambiarIcono(){
    document.getElementById('icono').className ="fas fa-user-clock" ;
}

function cambiarColor(){

document.getElementById('svg').style.backgroundColor = "red";
}


function cambiarPath(){
    console.log('hola');
    document.getElementById("myPath").setAttribute("d",'M11.8281 1.97656C10.5391 0.875 8.64062 1.08594 7.44531 2.30469L7 2.77344L6.53125 2.30469C5.35938 1.08594 3.4375 0.875 2.14844 1.97656C0.671875 3.24219 0.601562 5.49219 1.91406 6.85156L6.46094 11.5391C6.74219 11.8438 7.23438 11.8438 7.51562 11.5391L12.0625 6.85156C13.375 5.49219 13.3047 3.24219 11.8281 1.97656Z ');
}