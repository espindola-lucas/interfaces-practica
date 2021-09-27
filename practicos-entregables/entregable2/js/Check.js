"use strict";

class Check {
    
    static chkLine(a, b, c, d){
        return ((a != 0) && (a == b) && (a == c) && (a == d));
    }

    static check(){
        //verifica en vertical
        //de abajo para arriba
        let bd = Juego.matrix;
        for (let r = 0; r < rowsAndColumns.c - 1; r++){
            for (let c = rowsAndColumns.f - 1; c >= 5; c--){
                if (Check.chkLine(bd[r][c], bd[r][c-1], bd[r][c-2], bd[r][c-3])){
                    console.log("vertical");
                    return bd[r][c];
                }
            }
        }
        //verifica en vertical
        //de arriba para abajo
        for (let r = 0; r < rowsAndColumns.c-1; r++){
            for (let c = 0; c <= 2; c++){
                if (Check.chkLine(bd[r][c], bd[r][c+1], bd[r][c+2], bd[r][c+3])){
                    console.log("vertical2");
                    return bd[r][c];
                }
            }
        }
        //end verificacion en vertical

        //check verificacion en horizontal
        //de izquierda a derecha
        for (let r = 0; r <= 2; r++){
            for (let c = rowsAndColumns.c - 1; c >= 0; c--){
                if (Check.chkLine(bd[r][c], bd[r+1][c], bd[r+2][c], bd[r+3][c])){
                    console.log("horizontal");
                    return bd[r][c];
                }
            }
        }
        //check verificacion en horizontal
        //de derecha a izquierda
        for (let r = rowsAndColumns.f - 1; r >= 4; r--){
            for (let c = rowsAndColumns.c - 1; c >= 0; c--){
                if (Check.chkLine(bd[r][c], bd[r-1][c], bd[r-2][c], bd[r-3][c])){
                    console.log("horizontal2");
                    return bd[r][c];
                }
            }
        }
        //end verificacion en horizontal
    }
}