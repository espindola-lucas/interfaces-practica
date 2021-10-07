"use strict";

class Check {
    
    static chkLine(a, b, c, d){
        return ((a != 0) && (a == b) && (a == c) && (a == d));
    }

    static check(){
   let tope ;
        if (Juego.dimencion == "5*6"){
          tope = 1
           }else {
               tope = 3
           }
   
        //verifica en vertical
        //de abajo para arriba
        let bd = Juego.matrix;
        for (let r = 0; r <= Juego.rows - 1; r++){
            for (let c = Juego.Columns - 1; c >= 5; c--){
                if (Check.chkLine(bd[r][c], bd[r][c-1], bd[r][c-2], bd[r][c-3])){
                    Juego.winner = bd[r][c];
                     return bd[r][c];
                }
            }
        }
        //verifica en vertical
        //de arriba para abajo
        for (let r = 0; r <= Juego.rows-1; r++){
            for (let c = 0; c <= Juego.Columns-1/2; c++){
                if (Check.chkLine(bd[r][c], bd[r][c+1], bd[r][c+2], bd[r][c+3])){
                   Juego.winner = bd[r][c];
                   return bd[r][c];
                }
            }
        }
        //end verificacion en vertical

        //check verificacion en horizontal
        //de izquierda a derecha
        for (let r = 0; r <= tope; r++){
            for (let c = Juego.Columns - 1; c >= 0; c--){
                if (Check.chkLine(bd[r][c], bd[r+1][c], bd[r+2][c], bd[r+3][c])){
                    Juego.winner = bd[r][c];
                 return bd[r][c];
                }
            }
        }
        //check verificacion en horizontal
        //de derecha a izquierda
        for (let r =Juego.rows- 1; r >= 3; r--){
            for (let c = Juego.Columns - 1; c >= 0; c--){
                if (Check.chkLine(bd[r][c], bd[r-1][c], bd[r-2][c], bd[r-3][c])){
                    Juego.winner = bd[r][c];
                 return bd[r][c];
                }
            }
        }
        //end verificacion en horizontal

        // verificacion diagonal 
        for (let r = 0; r <= tope; r++){
            for (let c =  Juego.Columns - 1; c >= 3; c--){
                if (Check.chkLine(bd[r][c], bd[r+1][c-1], bd[r+2][c-2], bd[r+3][c-3])){
                    Juego.winner = bd[r][c];
                    return bd[r][c];
                }
            }
        }
       
        for (let r = Juego.rows-1; r >= 3; r--){
            for (let c =Juego.Columns-1; c >= 3; c--){
                if (Check.chkLine(bd[r][c], bd[r-1][c-1], bd[r-2][c-2], bd[r-3][c-3])){
                    Juego.winner = bd[r][c];
                    return bd[r][c];
                }
            }
        }


        for (let r = 0; r <= tope; r++){
         for (let c = 0; c <= Juego.Columns-1/2; c++){
               if (Check.chkLine(bd[r][c], bd[r+1][c+1], bd[r+2][c+2], bd[r+3][c+3])){
                Juego.winner = bd[r][c];
               return bd[r][c];
                 }
            }
         }

         for (let r = 0; r <= tope; r++){
            for (let c = Juego.Columns-1; c >= 3; c--){
                  if (Check.chkLine(bd[r][c], bd[r+1][c-1], bd[r+2][c-2], bd[r+3][c-3])){
                    Juego.winner = bd[r][c];
                   return bd[r][c];
                    }
               }
            } 


         if (player1.arrayTokensPlayer1.length === 0 && player2.arrayTokensPlayer2.length === 0 ) {
            Juego.winner = "Empate";
            return   Juego.winner ;
         }      
            
                
       
    }

    
    
}