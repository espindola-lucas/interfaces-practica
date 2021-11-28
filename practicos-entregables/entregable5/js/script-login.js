

function OcultaError(){
    document.getElementById('error').style.display='none'; 
    document.getElementById('errores').style.display='none'; 
}

let error = 'si';
function Mostrar_Error(){
if (error == 'si'){
    document.getElementById('error').style.display='block'; 
    document.getElementById('errores').style.display='block'; 
    document.getElementById('input1').style.border='red solid 1px'; 
    document.getElementById('input2').style.border='red solid 1px'; 
    return error = 'no'
}
if (error == 'no'){
    window.location.href = "muroInicio.html";
    return error  = 'si';
}
}





document.addEventListener("DOMContentLoaded", OcultaError());