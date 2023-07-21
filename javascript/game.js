console.log("game.js")



class Game {

constructor() {
    //aqui estaran todas los objetos de mi juego


    //aqui creo mi nave Hero
this.spaceShipHero = new SpaceShipHero()
this.asteroidArr = [];
this.isGameOn = true;

this.frames = 0;




}

gameOver = () => {
    this.isGameOn = false //detiene la recursion
    gameScreenNOde.style.display = "none"; //quita la pantalla de juego
    gameOverScreenNode.style.display = "flex"; 
}
asteroidApear = () => {

    if (this.asteroidArr.length === 0 || this.frames % 120 === 0) {
        let randomPositionX = Math.floor(Math.random() * 700);
  
        let newAsteroid = new Asteroid(randomPositionX);
  
        this.asteroidArr.push(newAsteroid);
  
      }
}
collisionSpaceShipHeroAsteroids = () => {
    //el pollito => this.pollito
    this.asteroidArr.forEach((cadaAsteroide) => {

        if (
            this.spaceShipHero.x < cadaAsteroide.x + cadaAsteroide.w &&
            this.spaceShipHero.x + this.spaceShipHero.w > cadaAsteroide.x &&
            this.spaceShipHero.y < cadaAsteroide.y + cadaAsteroide.h &&
            this.spaceShipHero.y + this.spaceShipHero.h > cadaAsteroide.y
          ) {
            // Collision detected!
           
            this.gameOver()
          }
    });
  };

  asteroidDisapear = () => {
    // si el primer elemento del array ha salido de la vista removemos el primer elemento del array
    if (this.asteroidArr[0].y > 732) {
      this.asteroidArr[0].node.remove(); //remover el elemento de DOM
      this.asteroidArr.shift(); // remover el objeto del array
    }
  }

  winTheGame = () => {

    if (this.frames > 7200 ) {

    }
  }

// funciones de mi juego

gameLoop = () => {
this.frames++;
    console.log("ejecutando gameLoop")
    this.asteroidApear();
    this.asteroidDisapear()

    this.asteroidArr.forEach((cadaAsteroide) => {
        cadaAsteroide.asteroidMovement()
    });

    this.collisionSpaceShipHeroAsteroids();
 if(this.isGameOn === true) {
   
    requestAnimationFrame(this.gameLoop);
}
}

}