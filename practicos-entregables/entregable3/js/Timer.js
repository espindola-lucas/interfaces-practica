"use strict";

class Timer {
    
    static start_timer (){
        let countSeconds = 0;
        let countMinutes = 0;
        let seconds = timer.seconds;
        let minutes = timer.minutes;
        let parar = timer.stop;
        
        window.setInterval( () => {
            if(Juego.fin == false){
                if(parar != countMinutes){
                    if (countSeconds == 60){
                        countSeconds = 0;
                        countMinutes++;
                        minutes.innerHTML = countMinutes;
                        if(countMinutes == 0){
                            countMinutes = 0;
                        }
                    }
                seconds.innerHTML = countSeconds;
                countSeconds++;
                }else{
                    // Si Juego.fin es true, se va a mostrar el cartel de que el juego a finalizado 
                    let persona = document.getElementById("person");
                    persona.className= 'none';
                    dead.Estadodead= true;
                    dead.Actual=true;
                    finishGame.style.display='block'
                }
            }
        }, 1000)
    }
}
