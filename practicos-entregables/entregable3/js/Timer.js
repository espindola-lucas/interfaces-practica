"use strict";

class Timer {
    
    static start_timer (){
            let stop = 1
            let countSeconds = 0;
            let countMinutes = 0;
            // seconds = document.getElementById("segundos");
            // minutes = document.getElementById("minutos");
        
            window.setInterval( () => {
                if(stop != countMinutes){
                    if (countSeconds == 60){
                        countSeconds = 0;
                        countMinutes++;
                        // minutes.innerHTML = countMinutes;
                        if(countMinutes == 0){
                            countMinutes = 0;
                        }
                    }
                // seconds.innerHTML = countSeconds;
                countSeconds++;
                }else{
                    console.log("fin")
                }
            }, 1000)
        }
    }
