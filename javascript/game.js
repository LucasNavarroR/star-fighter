console.log("game.js")



class Game {

constructor() {
    //aqui estaran todas los objetos de mi juego


    //aqui creo mi nave Hero
this.spaceShipHero = new SpaceShipHero()
this.asteroid = new Asteroid()




}




// funciones de mi juego

gameLoop = () => {

    console.log("ejecutando gameLoop")

    

    requestAnimationFrame(this.gameLoop)
}

}