

function cambiardepagina (){
    document.addEventListener('keypress', logKey);

}

function logKey(e){
    if (e.keyCode == '13'){
        window.location.href = "muroinicio-busqueda.html";
        console.log('hola');
    }
}
let click = 'si';
function mostrarNotificacion (){
    if (click == 'si'){
        document.getElementById('notificacion').style.display='block';
        return   click = 'no';
    }
    if (click == 'no'){
        console.log('hola');
        document.getElementById('notificacion').style.display='none';
        return click = 'si';
    }
    
}
function OcultarNotificaciones(){
    document.getElementById('notificacion').style.display='none';
}


document.addEventListener("DOMContentLoaded", OcultarNotificaciones());
