class helps{

    static getRandomInt(min, max) {     //Obtengo un numero random entre dos valores dados
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static uploadImage(path){
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = path;
            img.onload = () => resolve(img);
            img.onerror = reject;
            console.log (img)
        });
    }
}