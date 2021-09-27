class Game {
    constructor ( rows, columns, matrixGame){
        this.rows = rows;
        this.columns = columns;
        this.matrixGame = matrixGame;
    }

    createMatrix (){
        for(let f = 0; f <= this.rows-1; f++){
        this.matrixGame[f] = [];
            for (let c = 0 ; c <= this.columns-1; c++){
                this.matrixGame[f][c]=0
            }
        }
    }

    getMatrix(){
        return this.matrixGame;
    }
    
    static emptyFile (){
        for (let i = 0 ; i  <= rowsAndColumns.f-1 ; i++){
            Rows.empty[i]= "no";
        }
        return Rows.empty
    }

    static getRows (conteiner,jugadorActual){
        let NombreJugador;
        for (let file= 0 ; file < rowsAndColumns.f ; file++){
            if (conteiner == file ){
                if (jugadorActual == 2){
                    jugadorActual = player2.colour;
                    NombreJugador = player2.name;
                    Game.checkEmpty(file,jugadorActual,NombreJugador)
                }else{
                    jugadorActual = player1.colour;
                    NombreJugador = player1.name;
                    Game.checkEmpty(file,jugadorActual,NombreJugador)
                }
            }
        }
    }

    static checkEmpty(file , jugadorActual,NombreJugador){
        let position = rowsAndColumns.f -1;
        let p = position;
        do{
            if (Juego.matrix[file][p] == 0 ){
                Juego.matrix[file][position] = NombreJugador;
                MatrixLockers.matrix[file][position].fill= jugadorActual;
                Help.redraw()
                position = 0;
                p= p-1
            }else{
                position = position-1;  
                if (position == 0){
                    Game.lastPosition(position, file, p, NombreJugador, jugadorActual);
                }
                p = position
            }
        } while (position != 0)
        // console.log("matriz del tablero") + console.table(Juego.matrix)
        Check.check();
        if (position == 0 && Juego.matrix[file][p] != 0){
            Rows.empty[file] = "si";
        }
    }
    
    static lastPosition (position, file, p, NombreJugador, jugadorActual){
        if (Juego.matrix[file][p-1] == 0 ){
            Juego.matrix[file][position] = NombreJugador;
            MatrixLockers.matrix[file][position].fill= jugadorActual;
            Help.redraw()
        }   
    }

    static fullRows (numberElement,selected, X ,Y){
        if (  Rows.empty[numberElement] == "si"){
            Token.drawInOldPosition(selected, X ,Y );
            }else{
            Help.deleteElement(oldPositions.array,oldPositions.positionInArray);
        }
    }
}