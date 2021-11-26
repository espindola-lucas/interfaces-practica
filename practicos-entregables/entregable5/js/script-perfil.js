document.getElementById('loader').addEventListener("animationend", function () {
    document.getElementById('loader').style.display='none';
    });

function Timer() {
    document.getElementById('body').style.display='none';
    let n = 0;
    let parar = 1;
    let entre = 0;
    window.setInterval(function(){
        if(parar != n){
            n++;
        
        }else {
            if (entre == 0){
                entre = 1 ;
                document.getElementById('body').style.display='block';
    document.getElementById('loader').className = "loader-container-finish";
  
                n = 0 ;
                parar = 0;
            }
        }
    },1000);

}

document.addEventListener("DOMContentLoaded", Timer());