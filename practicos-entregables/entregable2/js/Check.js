"use strict";

class Check {
    
    static chkLine(a, b, c, d){
        return ((a != 0) && (a == b) && (a == c) && (a == d));
    }

    static check(){
     let   T_V , T_H  ,T_H_2 , T_D , T_D_2 ,  T_H_3 , T_H_4  , T_H_5  , T_H_6 ,D ;
        if (Juego.dimencion == 5*6){
             T_V = 0 ;
             T_H =1 ;
             T_H_2 =3;
             T_D = 1;
             T_D_2 =3;
             T_H_3 =1;
             T_H_4 = 2 ;
             T_H_5 = 1 ;
             T_H_6 = 2 ;
             D = 4;
          }
    if (Juego.dimencion == 7*6){
        T_V = 2 ;
        T_H =2 ;
        T_H_2 =4;
        T_D = 3;
        T_D_2 =3;
        T_H_3 =3;
        T_H_4 = 3 ;
        T_H_5 = 3 ;
        T_H_6 = 3 ;
        D = 4;
      }
    if (Juego.dimencion == 7*8){
    T_V = 4 ;
    T_H =3 ;
    T_H_2 =3;
    T_D = 3;
    T_D_2 =3;
    T_H_3 =3;
    T_H_4 = 4 ;
    T_H_5 = 3 ;
    T_H_6 = 3 ;
    D= 5;
   }
        //verifica en vertical
        //de abajo para arriba
        let bd = Juego.matrix;
        for (let r = 0; r <= Juego.rows - 1; r++){
            for (let c = Juego.Columns - 1; c >= 5; c--){
                if (Check.chkLine(bd[r][c], bd[r][c-1], bd[r][c-2], bd[r][c-3])){
                    Juego.winner = bd[r][c];
                    console.log("vertical");
                    return bd[r][c];
                }
            }
        }
        //verifica en vertical
        //de arriba para abajo
        for (let r = 0; r <= Juego.rows-1; r++){
            for (let c = 0; c <= T_V; c++){
                if (Check.chkLine(bd[r][c], bd[r][c+1], bd[r][c+2], bd[r][c+3])){
                   Juego.winner = bd[r][c];
                   console.log("vertical arriba ");
                    return bd[r][c];
                }
            }
        }
        //end verificacion en vertical

        //check verificacion en horizontal
        //de izquierda a derecha
        for (let r = 0; r <= T_H; r++){
            for (let c = Juego.Columns - 1; c >= 0; c--){
                if (Check.chkLine(bd[r][c], bd[r+1][c], bd[r+2][c], bd[r+3][c])){
                    Juego.winner = bd[r][c];
                    console.log("horizontal");
                    return bd[r][c];
                }
            }
        }
        //check verificacion en horizontal
        //de derecha a izquierda
        for (let r =Juego.rows- 1; r >= T_H_2; r--){
            for (let c = Juego.Columns - 1; c >= 0; c--){
                if (Check.chkLine(bd[r][c], bd[r-1][c], bd[r-2][c], bd[r-3][c])){
                    Juego.winner = bd[r][c];
                    console.log("horizontal2");
                    return bd[r][c];
                }
            }
        }
        //end verificacion en horizontal

        // verificacion diagonal 
        for (let r = 0; r <= T_D; r++){
            for (let c =  Juego.Columns - 1; c >= T_D_2; c--){
                if (Check.chkLine(bd[r][c], bd[r+1][c-1], bd[r+2][c-2], bd[r+3][c-3])){
                    Juego.winner = bd[r][c];
                    console.log("diagonal");
                    return bd[r][c];
                }
            }
        }
       
        for (let r = Juego.rows-1; r >= 3; r--){
            for (let c =Juego.Columns-1; c >= D; c--){
                if (Check.chkLine(bd[r][c], bd[r-1][c-1], bd[r-2][c-2], bd[r-3][c-3])){
                    Juego.winner = bd[r][c];
                    console.log("diagonal");
                    return bd[r][c];
                }
            }
        }


        for (let r = 0; r <= T_H_3; r++){
         for (let c = 0; c <= T_H_4; c++){
               if (Check.chkLine(bd[r][c], bd[r+1][c+1], bd[r+2][c+2], bd[r+3][c+3])){
                Juego.winner = bd[r][c];
                console.log("diagonal");
                  return bd[r][c];
                 }
            }
         }

         for (let r = 0; r <= T_H_5; r++){
            for (let c = Juego.Columns-1; c >= T_H_6; c--){
                  if (Check.chkLine(bd[r][c], bd[r+1][c-1], bd[r+2][c-2], bd[r+3][c-3])){
                    Juego.winner = bd[r][c];
                   console.log("diagonal");
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