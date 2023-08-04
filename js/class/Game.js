class Game {
    constructor(nivel = 2){
        this._nivel     = parseInt(nivel) 
        this._limite    = this.getNum(this._nivel)
        this.__limiteMin = 4
        this.__limiteMax = 100
        this._choose    = null

        this._gameOver  = false
    }

    getNum(num){
        if (num <= 0) {
            return "No hay número cuadrado mayor";
        }
    
        return Math.ceil(Math.sqrt(num))
    }

    get nivel(){ 
        return this._nivel
    }

    set nivel(nivel){
        nivel = nivel < this.__limiteMin ? this.__limiteMin : nivel
        nivel = nivel > this.__limiteMax ? this.__limiteMax : nivel

        this._nivel  = nivel
        this._limite = this.getNum(this._nivel)
    }

    get limite(){
        return this._limite
    }

    set limite(limite){
        this._limite = limite
    }

    get choose(){
        return this._choose
    }

    set choose(choose){
        this._choose = choose
    }

    get gameOver(){
        return this._gameOver
    }

    set gameOver(gameOver){
        this._gameOver = gameOver
    }
}

export default Game