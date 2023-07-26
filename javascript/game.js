//console.log("game.js");

class Game {
  constructor() {
    //aqui estaran todas los objetos de mi juego

    this.spaceShipHero = new SpaceShipHero();
    this.heroHealthCount = null,
    this.shieldIcon = null;
this.MisileIcon = null;

this.myScore = 0;

    this.asteroidArr = [];
    this.villanArr = [];
    this.isGameOn = true;
    this.planetArr = [];
    this.frames = 0;
    this.heroFireMissil = [];
    this.villanFireArr = [];
    this.heroFireArr = [];
    this.heroShieldArr = [];

    this.villanModelArr = [
      {
        villan: "villan1",
        life: 1,
        velocity: 4,
        skin: "./Animated_Pixel_Ships_v1.5.6/Plane 05/Villano-1.gif",
        width: 50,
        height: 69,
        fire: " ",
      },
      {
        villan: "villan2",
        life: 2,
        velocity: 2,
        skin: "./Animated_Pixel_Ships_v1.5.6/Plane 03/Villano-2.gif",
        width: 60,
        height: 77,
        fire: "./Animated_Pixel_Ships_v1.5.6/Projectiles/bolas-laser-villan.png",
      },
    ];
    this.villanId = 0;
  }

  //------------------------------FUNCIONES HERO-----------------------------------

  HeroHealth = () => {


    if (this.spaceShipHero.health < 1) {
      this.gameOver();
    }
  };

  HeroShieldAndMisileCount = () => {
    if (this.heroShieldArr.length === 1) {
      this.heroShieldArr[0].posicionShield(this.spaceShipHero.x);
    } 

    if (this.frames % 240 === 0) {
      this.spaceShipHero.shieldCount++;
    } 

    if (this.frames % 120 === 0) {
      this.spaceShipHero.misileCount ++;
    }
  };

  MisileExplosion = () => {
    this.heroFireMissil.forEach((cadaMisil, i) => {
      //console.log("misil quieto");

      if (cadaMisil.y <= 100 && cadaMisil.explosionActive === false) {
        cadaMisil.y = 100;
        cadaMisil.node.src =
          "./Animated_Pixel_Ships_v1.5.6/Explosion/Large/explosion-grande.gif";
        cadaMisil.x -= 118;
        cadaMisil.y -= 116;
        cadaMisil.w = 250;
        cadaMisil.h = 250;
        cadaMisil.explosionActive = true;

        setTimeout(() => {
          this.heroFireMissil[i].node.remove();
          this.heroFireMissil.splice(i, 1);
        }, 1000);

        //console.log(cadaMisil.explode)
      } else if (cadaMisil.explosionActive === true) {
        cadaMisil.y = 16;
      }
    });
  };

  // heroMovement = () => {
  //   document.addEventListener("keydown", (event) => {
  //     this.spaceShipHero.keyPress = true;
  //     console.log("kedydown");
  //     if (
  //       event.key === "ArrowLeft" &&
  //       this.spaceShipHero.x > 0 &&
  //       this.isGameOn === true &&
  //       this.spaceShipHero.keyPress === true
  //     ) {
  //       this.spaceShipHero.keyPress = true;
  //       // this.node.src = "./Animated_Pixel_Ships_v1.5.6/Plane 01/Normal/Hero-sip-izquierda.png"
  //       this.spaceShipHero.x -= 20;
  //       this.spaceShipHero.positionUpdate();
  //     } else if (
  //       event.key === "ArrowRight" &&
  //       this.spaceShipHero.x < 458 &&
  //       this.isGameOn === true &&
  //       this.spaceShipHero.keyPress === true
  //     ) {
  //       this.spaceShipHero.x += 20;
  //       this.spaceShipHero.positionUpdate();
  //     } else if (event.key === " ") {
  //       this.spaceShipHero.spaceShipHeroFire();
  //     }
  //   });

  //   document.addEventListener("keyup", (event) => {
  //     console.log("keyup");
  //     if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
  //       this.spaceShipHero.keyPress = false;
  //     }
  //   });
  // };

  //-------------------------------------------CONDICIONALES DE PARTIDA-------------------------

  gameOver = () => {
    this.isGameOn = false; //detiene la recursion
    gameScreenNOde.style.display = "none"; //quita la pantalla de juego
    gameOverScreenNode.style.display = "flex";
  };

  score = () => {

scoreNode.innerText = this.myScore

  }
  winTheGame = () => {
    if (this.frames === 7200) {
      let planet = new PlanetDestiny();

      this.planetArr.push(planet);
    }
    if (this.planetArr.length === 1) {
      this.planetArr[0].planetDestinyMovementEffect();
    }
    if (this.planetArr.length === 1 && this.planetArr[0].y === 100) {
      this.isGameOn = false;
      playAgainButtonNode.style.display = "flex";
    }
  };

  //--------------------------------------CREACION DE OBJETOS--------------------------------------
  spaceShipVillanApeaar = () => {
    if (this.frames > 600 && this.frames % 360 === 0) {
      let randomPositionX = Math.floor(Math.random() * 450);

      let model = Math.floor(Math.random() * this.villanModelArr.length);

      let name = this.villanModelArr[model].villan;
      let skin = this.villanModelArr[model].skin;
      let height = this.villanModelArr[model].height;
      let velocity = this.villanModelArr[model].velocity;
      let width = this.villanModelArr[model].width;
      let health = this.villanModelArr[model].life;
      let fire = this.villanModelArr[model].fire;

      let newVillan = new SpaceShipVillan(
        name,
        health,
        randomPositionX,
        skin,
        height,
        width,
        velocity,
        this.villanId,
        fire
      );

      this.villanArr.push(newVillan);

      this.villanId++;
    }
  };

  asteroidApear = () => {
    if (this.asteroidArr.length === 0 || this.frames % 240 === 0) {
      let randomPositionX = Math.floor(Math.random() * 468);

      let newAsteroid = new Asteroid(randomPositionX);

      this.asteroidArr.push(newAsteroid);
    }
  };

  // ------------------------COLISIONES----------------------------------------

  collisionSpaceShipHerospaceShipVillan = () => {
    //el pollito => this.pollito
    this.villanArr.forEach((cadaVillano, i) => {
      if (
        this.spaceShipHero.x < cadaVillano.x + cadaVillano.w &&
        this.spaceShipHero.x + this.spaceShipHero.w > cadaVillano.x &&
        this.spaceShipHero.y < cadaVillano.y + cadaVillano.h &&
        this.spaceShipHero.y + this.spaceShipHero.h > cadaVillano.y
      ) {
        // Collision detected!
        cadaVillano.health -= 1;

        this.villanArr[i].node.remove();
        this.villanArr.splice(i, 1);

        this.spaceShipHero.health -= 1;
        //console.log("colison nave");
      }
    });
  };

  collisionSpaceShipHeroAsteroids = () => {
    this.asteroidArr.forEach((cadaAsteroide, i) => {
      if (
        this.spaceShipHero.x < cadaAsteroide.x + cadaAsteroide.w &&
        this.spaceShipHero.x + this.spaceShipHero.w > cadaAsteroide.x &&
        this.spaceShipHero.y < cadaAsteroide.y + cadaAsteroide.h &&
        this.spaceShipHero.y + this.spaceShipHero.h > cadaAsteroide.y
      ) {
        // Collision detected!
        cadaAsteroide.health = 0;
        this.asteroidArr[i].node.remove();
        this.asteroidArr.splice(i, 1);
        this.spaceShipHero.health -= 1;
      }
    });
  };

  collisionSpaceShipHeroFireAsteroids = () => {
    this.heroFireArr.forEach((cadaFuego, a) => {
      this.asteroidArr.forEach((cadaAsteroide, b) => {
        if (
          cadaFuego.x < cadaAsteroide.x + cadaAsteroide.w &&
          cadaFuego.x + cadaFuego.w > cadaAsteroide.x &&
          cadaFuego.y < cadaAsteroide.y + cadaAsteroide.h &&
          cadaFuego.y + cadaFuego.h > cadaAsteroide.y
        ) {
          // Collision detected!
          this.asteroidArr[b].health -= this.heroFireArr[a].damage;
          this.heroFireArr[a].node.remove();
          this.heroFireArr.splice(a, 1);
          if (cadaAsteroide.explosion !== true) {this.myScore += 100;}
          console.log("colision");
        }
      });
    });
  };

  collisionShieldAsteroids = () => {
    if (this.heroShieldArr.length === 1) {
      this.heroShieldArr.forEach((shield, a) => {
        this.asteroidArr.forEach((cadaAsteroide, b) => {
          if (
            shield.x < cadaAsteroide.x + cadaAsteroide.w &&
            shield.x + shield.w > cadaAsteroide.x &&
            shield.y < cadaAsteroide.y + cadaAsteroide.h &&
            shield.y + shield.h > cadaAsteroide.y
          ) {
            // Collision detected!
            this.asteroidArr[b].health -= this.heroShieldArr[a].damage;
            this.asteroidArr[b].node.remove();
          this.asteroidArr.splice(a, 1);
            
            //console.log("colision asteroid shield")
          }
        });
      });
    }
  };

  collisionShieldVillan = () => {
   
    if (this.heroShieldArr.length === 1) {
      this.villanArr.forEach((cadaVillano, i) => {
        if (
          this.heroShieldArr[0].x < cadaVillano.x + cadaVillano.w &&
          this.heroShieldArr[0].x + this.heroShieldArr[0].w > cadaVillano.x &&
          this.heroShieldArr[0].y < cadaVillano.y + cadaVillano.h &&
          this.heroShieldArr[0].y + this.heroShieldArr[0].h > cadaVillano.y
        ) {
          // Collision detected!
          this.villanArr[i].health = 0;

          this.villanArr[i].node.remove();
          this.villanArr.splice(i, 1);
          
          console.log("colision villan shield")
        }
      });
    }
  };


  collisionShieldFireVillan = () => {
   

    if (this.heroShieldArr.length === 1) {
      this.villanFireArr.forEach((cadaFuego, i) => {
        if (
          this.heroShieldArr[0].x < cadaFuego.x + cadaFuego.w &&
          this.heroShieldArr[0].x + this.heroShieldArr[0].w > cadaFuego.x &&
          this.heroShieldArr[0].y < cadaFuego.y + cadaFuego.h &&
          this.heroShieldArr[0].y + this.heroShieldArr[0].h > cadaFuego.y
        ) {
          // Collision detected!
  
      
          this.villanFireArr[i].node.remove();
          this.villanFireArr.splice(i, 1);
         // console.log("colison fuego escudo");
        }
      });
    };
  };

  collisionSpaceShipHeroFireVillanos = () => {
    this.heroFireArr.forEach((cadaFuego, a) => {
      this.villanArr.forEach((cadaVillano, b) => {
        if (
          cadaFuego.x < cadaVillano.x + cadaVillano.w &&
          cadaFuego.x + cadaFuego.w > cadaVillano.x &&
          cadaFuego.y < cadaVillano.y + cadaVillano.h &&
          cadaFuego.y + cadaFuego.h > cadaVillano.y
        ) {
          // Collision detected!

          this.villanArr[b].health -= this.heroFireArr[a].damage;
          if (this.villanArr[b].health <= 0) { this.myScore += 1000}
          this.heroFireArr[a].node.remove();
          this.heroFireArr.splice(a, 1);
          console.log("colision");
        }
      });
    });
  };

  collisionSpaceShipHeroFireMisilVillanos = () => {
    this.heroFireMissil.forEach((cadaMisil, a) => {
      this.villanArr.forEach((cadaVillano, b) => {
        if (
          cadaMisil.x < cadaVillano.x + cadaVillano.w &&
          cadaMisil.x + cadaMisil.w > cadaVillano.x &&
          cadaMisil.y < cadaVillano.y + cadaVillano.h &&
          cadaMisil.y + cadaMisil.h > cadaVillano.y
        ) {
          // Collision detected!
          if (cadaMisil.explosionActive === true) {
            this.villanArr[b].health -= this.heroFireMissil[a].damage;
            if( this.villanArr[b].health <= 0 && cadaVillano.explosion !== true ) { this.myScore += 1000}
          } else {
          }
        }
      });
    });
  };

  collisionSpaceShipHeroFireMisilAsteroid = () => {
    this.heroFireMissil.forEach((cadaMisil, a) => {
      this.asteroidArr.forEach((cadaAsteroid, b) => {
        if (
          cadaMisil.x < cadaAsteroid.x + cadaAsteroid.w &&
          cadaMisil.x + cadaMisil.w > cadaAsteroid.x &&
          cadaMisil.y < cadaAsteroid.y + cadaAsteroid.h &&
          cadaMisil.y + cadaMisil.h > cadaAsteroid.y
        ) {
          // Collision detected!
          if (cadaMisil.explosionActive === true) {
            this.asteroidArr[b].health -= this.heroFireMissil[a].damage;
            if( this.asteroidArr[b].health <= 0 && cadaAsteroid.explosion !== true) { this.myScore += 100}
          } else {
          }
        }
      });
    });
  };

  collisionSpaceShipVillanFireHeroShip = () => {
   
    this.villanFireArr.forEach((cadaFuego, i) => {
      if (
        this.spaceShipHero.x < cadaFuego.x + cadaFuego.w &&
        this.spaceShipHero.x + this.spaceShipHero.w > cadaFuego.x &&
        this.spaceShipHero.y < cadaFuego.y + cadaFuego.h &&
        this.spaceShipHero.y + this.spaceShipHero.h > cadaFuego.y
      ) {
        // Collision detected!

        this.spaceShipHero.health -= cadaFuego.damage;
        this.villanFireArr[i].node.remove();
        this.villanFireArr.splice(i, 1);
        //console.log("colison");
      }
    });
  };
  // --------------------------------------------ELIMINACION DE OBJETOS-----------------------------------------
  asteroidDisapear = () => {
    // si el primer elemento del array ha salido de la vista removemos el primer elemento del array

    this.asteroidArr.forEach((asteroid, i) => {
      if (asteroid.explosion === false && asteroid.health <= 0) {
        //console.log("explosion");

        asteroid.node.src =
          "./Animated_Pixel_Ships_v1.5.6/Explosion/Small/explosion-pequeña.gif";
        asteroid.explosion = true;
        setTimeout(() => {
          this.asteroidArr[i].node.remove();
          this.asteroidArr.splice(i, 1);
        }, 800);
      } else if (asteroid.y > 732) {
        this.asteroidArr[0].node.remove();
        this.asteroidArr.shift();
      }
    });
  };

  laserDisapear = () => {
    this.heroFireArr.forEach((cadaFuego) => {
      if (cadaFuego.y <= -26) {
        this.heroFireArr[0].node.remove();
        this.heroFireArr.shift();
      }
    });

    this.villanFireArr.forEach((cadaFuego, i) => {
      if (cadaFuego.y >= 700) {
        this.villanFireArr[0].node.remove();
        this.villanFireArr.shift();
      } else if (
        this.villanArr.forEach((villan) => {
          villan.id === cadaFuego.id && villan.explosion === true;
        })
      ) {
        //console.log("entro");
        this.villanFireArr[i].node.remove();
        this.villanFireArr.splice(i, 1);
      }
    });
  };

  // cleaningAsteroids = () => {
  //   this.asteroidArr.forEach((asteroid, i) => {
  //     if (asteroid.health <= 0) {
  //       let explosion = asteroid.node.altimg;
  //       gameBoxNode.append(explosion);

  //       setTimeout(()=> {
  //         explosion.remove();

  //       },1000)

  //       gameBoxNode.append(explosion);
  //       console.log(explosion)

  //       this.asteroidArr[i].node.remove();
  //       this.asteroidArr.splice(i, 1);
  //     }
  //   });
  // };

  spaceShipVillanDisapear = () => {
    // if (this.villanArr.length > 0 && this.villanArr[0].y > 769) {
    //   this.villanArr[0].node.remove();
    //   this.villanArr.shift();
    // }

    this.villanArr.forEach((villan, i) => {
      if (villan.explosion === false && villan.health < 1) {
        //console.log("explosion");

        villan.node.src =
          "./Animated_Pixel_Ships_v1.5.6/Explosion/Small/explosion-pequeña.gif";
        villan.explosion = true;
        setTimeout(() => {
          this.villanArr[i].node.remove();
          this.villanArr.splice(i, 1);
        }, 800);
      } else if (villan.y > 780) {
        this.villanArr[i].node.remove();
        this.villanArr.splice(i, 1);
      }
    });
  };

  // funciones de mi juego

  gameLoop = () => {
    console.log(this.myScore)
    //console.log(this.spaceShipHero.health);
    //console.log(this.spaceShipHero.shieldCount)

    this.frames++;
    // -------------- CREACION OBJETOS------------
    this.asteroidApear();
    this.asteroidDisapear();
    //this.cleaningAsteroids();
    // ----------------- ELIMINACION OBJETOS--------------------
    this.laserDisapear();

    this.spaceShipVillanApeaar();
    this.spaceShipVillanDisapear();
    //----------------- MOVIMIENTO--------------------------------

    // this.heroMovement();
    this.spaceShipHero.spaceShipHeroPosition();

    this.villanArr.forEach((cadaVillano) => {
      cadaVillano.villanShipMovement();
      if (this.frames % 120 === 0) cadaVillano.spaceShipVillanFire();
    });

    this.asteroidArr.forEach((cadaAsteroide) => {
      cadaAsteroide.asteroidMovement();
    });

    this.heroFireArr.forEach((cadaFuego) => {
      cadaFuego.fuegoSpaceShipHeroMovement();
    });

    this.heroFireMissil.forEach((cadaMisil) => {
      cadaMisil.fuegoSpaceShipHeroMovement();
    });

    this.villanFireArr.forEach((cadaFuego) => {
      cadaFuego.fuegoSpaceShipVillanMovement();
    });

    // ------------------ colisiones -----------------------------
    this.collisionShieldVillan()
    this.collisionShieldAsteroids()
    this.collisionShieldFireVillan()


    
    
    this.collisionSpaceShipHeroFireAsteroids();
    this.collisionSpaceShipHeroFireVillanos();
    this.collisionSpaceShipVillanFireHeroShip();
    this.collisionSpaceShipHeroFireMisilVillanos();
    this.collisionSpaceShipHeroFireMisilAsteroid();

    this.collisionSpaceShipHeroAsteroids();
    this.collisionSpaceShipHerospaceShipVillan();
    
    // ----------- OTROS----------
this.score()

    this.MisileExplosion();
   this.spaceShipHero.HeroimgControl()

    this.HeroShieldAndMisileCount();
    this.spaceShipHero.heroMisileIcon()
    this.spaceShipHero.spaceShipHeroShield();
    this.spaceShipHero.spaceShipHeroHealth()
    this.HeroHealth();
   
    this.heroHealthCount.actualizacionVidas()
    this.winTheGame();

    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}
