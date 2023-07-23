console.log("game.js");

class Game {
  constructor() {
    //aqui estaran todas los objetos de mi juego

    //aqui creo mi nave Hero
    this.spaceShipHero = new SpaceShipHero();
    this.asteroidArr = [];
    this.villanArr = []
    this.isGameOn = true;
    this.planetArr = [];
    this.frames = 0;
  }

  gameOver = () => {
    this.isGameOn = false; //detiene la recursion
    gameScreenNOde.style.display = "none"; //quita la pantalla de juego
    gameOverScreenNode.style.display = "flex";
    

  };

spaceShipVillanApeaar = () => {
if(this.frames > 600 && this.frames % 250 === 0) {
  let randomPositionX = Math.floor(Math.random() * 450);

      let newVillan = new SpaceShipVillan(randomPositionX);

      this.villanArr.push(newVillan);
    }
  };

  asteroidApear = () => {
    if (this.asteroidArr.length === 0 || this.frames % 120 === 0) {
      let randomPositionX = Math.floor(Math.random() * 468);

      let newAsteroid = new Asteroid(randomPositionX);

      this.asteroidArr.push(newAsteroid);
    }
  };


  collisionSpaceShipHerospaceShipVillan = () => {
    //el pollito => this.pollito
    this.villanArr.forEach((cadaVillano) => {
      if (
        this.spaceShipHero.x < cadaVillano.x + cadaVillano.w &&
        this.spaceShipHero.x + this.spaceShipHero.w > cadaVillano.x &&
        this.spaceShipHero.y < cadaVillano.y + cadaVillano.h &&
        this.spaceShipHero.y + this.spaceShipHero.h > cadaVillano.y
      ) {
        // Collision detected!

        this.gameOver();
      }
    });
  };

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

        this.gameOver();
      }
    });
  };

  asteroidDisapear = () => {
    // si el primer elemento del array ha salido de la vista removemos el primer elemento del array
    if (this.asteroidArr[0].y > 732) {
      this.asteroidArr[0].node.remove(); //remover el elemento de DOM
      this.asteroidArr.shift(); // remover el objeto del array
    }
  };

  spaceShipVillanDisapear = () => {
    // si el primer elemento del array ha salido de la vista removemos el primer elemento del array
    if (this.villanArr[0].y > 732) {
      this.villanArr[0].node.remove(); //remover el elemento de DOM
      this.villanArr.shift(); // remover el objeto del array
    }
  };

  winTheGame = () => {
    if (this.frames === 7200) {
      let planet = new PlanetDestiny();

      this.planetArr.push(planet);
    }
    if (this.planetArr.length === 1) {
    
      this.planetArr[0].planetDestinyMovementEffect()
      }
    if (this.planetArr.length === 1 && this.planetArr[0].y === 150) {
      this.isGameOn = false;
      playAgainButtonNode.style.display = "flex";
      
    }

    
  };

  // funciones de mi juego

  gameLoop = () => {
    this.frames++;
  
    this.asteroidApear();
    this.asteroidDisapear();

    this.spaceShipVillanApeaar();
    //this.spaceShipVillanDisapear(); --NO FUNCIONA

    this.villanArr.forEach((cadaVillano) => {
      cadaVillano.villanShipMovement();
    });

    this.asteroidArr.forEach((cadaAsteroide) => {
      cadaAsteroide.asteroidMovement();
    });

    this.collisionSpaceShipHerospaceShipVillan();
    this.collisionSpaceShipHeroAsteroids();

    this.winTheGame();
    
    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}
