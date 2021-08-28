"use strict";

var cols = 10;
var rows = 10; 

var matriz = [];
for ( let i = 0; i < cols; i++){
    matriz[i] = [];
    for ( let j = 0; j < rows; j++){
        matriz[i][j] = Math.random() * 10;
    }
}

// Ej 1.A
// Escribir una función que retorne el valor máximo de toda la matriz

function incisoA(){
    let resultado; 
    for (let i = 0; i < cols; i++){
        for (let j = 0; j < rows; j++){
            if (matriz[i][j] > resultado);
            resultado = matriz [i][j]
        }
    }
    return resultado;
}

console.log("1)a) Maximo de matriz es: " + incisoA(matriz))

// Ej 1.B
// Escribir una función que retorne el valor máximo contenido en 
// las filas pares y el valor mínimo en las filas impares.

function incisoB(){
    let resultado = [-1, 100];
    for(let x = 0; x < cols; x++){
        if (x % 2 == 0){
            // let valorMax = 0;
            for (let y = 0; y < cols; y++){
                if (matriz[x][y] > resultado[0]){
                    resultado[0] = matriz[x][y];
                }
            }
            // console.log("El valor maximo de la fila par " + x + " es: " + valorMax);
        }else{
            // let valorMin = 0;
            for (let y = 0; y < cols; y++){
                if (matriz[x][y] < resultado[1]){
                resultado[1] = matriz[x][y];
                }
            }
            // console.log("El valor minimo de la fila impar " + x + " es: " + valorMin);
        }
    }
    return resultado;
}

const max_min_matriz = incisoB(matriz);

console.log("1)b) Max en filas pares: " + max_min_matriz[0] + "\n" +
            "1)b) Min en filas impares: " + max_min_matriz[1]); 

// Ej 1.C
// Calcular el valor promedio de cada fila y guardarlos en un arreglo.

function incisoC(matriz) {
    let arr_promedios = [];
    for (let i = 0; i < rows; i++){
        let sum_fila = 0;
        for (let j = 0; j < cols; j++){
            sum_fila += matriz[i][j];
        }
        arr_promedios[i] = sum_fila / cols;
    }
    return arr_promedios;
}

console.log("1)c) Promedio de cada fila: ");
console.table(incisoC(matriz));            