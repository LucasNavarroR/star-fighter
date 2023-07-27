//console.log("game.js");

class Game {
  constructor() {
    //---------------------OBJETOS -------------------------
    this.frames = 0;

    this.isGameOn = true; // ON-OFF

    this.bsoSOundVar = false; // banda sonora control

    this.planetArr = [];
    //---------------MAIN CHARACTER---------------------

    this.spaceShipHero = new SpaceShipHero();

    (this.heroHealthCount = null), (this.shieldIcon = null);

    this.myScore = 0;

    this.heroShieldArr = [];
    this.MisileIcon = null;

    this.heroFireMissil = [];
    this.heroFireArr = [];

    // -------------------PROYECTILES ENEMIGOS----------------

    this.villanFireArr = [];

    //----------------- ENEMIGOS-------------------

    this.asteroidArr = [];
    this.villanArr = [];

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

  // ------ BSO------

  bsoSound = () => {
    if (this.bsoSOundVar === false) bsoGameSoundNode.play();
    this.bsoSOundVar = true;
    setTimeout(() => {
      this.bsoSOundVar = false;
    }, 17000);
  };

  //------------------------------FUNCIONES HERO-----------------------------------

  HeroHealth = () => {
    if (this.spaceShipHero.health < 1) {
      this.gameOver();
    }
  };

  HeroShieldAndMisileCount = () => {
    if (this.heroShieldArr.length === 1) {
      this.heroShieldArr[0].posicionShield(this.spaceShipHero.x);
      shieldActivatedSoundNode.play();
    }

    if (this.frames % 130 === 0) {
      this.spaceShipHero.shieldCount++;
    }

    if (this.frames % 120 === 0) {
      this.spaceShipHero.misileCount++;
    }
  };

  MisileExplosion = () => {
    this.heroFireMissil.forEach((cadaMisil, i) => {
      //console.log("misil quieto");

      if (cadaMisil.y <= 100 && cadaMisil.explosionActive === false) {
        cadaMisil.node.src =
          "./Animated_Pixel_Ships_v1.5.6/Explosion/Large/explosion-grande.gif";
        cadaMisil.y = 100;

        cadaMisil.x -= 118;
        cadaMisil.y -= 116;
        cadaMisil.w = 250;
        cadaMisil.h = 250;
        cadaMisil.explosionActive = true;

        bigExplosionSoundNode.play();
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

 
  //-------------------------------------------CONDICIONALES DE PARTIDA-------------------------

  gameOver = () => {
    this.isGameOn = false; //detiene la recursion
    gameScreenNOde.style.display = "none"; //quita la pantalla de juego
    gameOverScreenNode.style.display = "flex";
  };

 
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

  score = () => {
    scoreNode.innerText = this.myScore;
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
        miniExplosionSoundNode.play();
        this.asteroidArr[i].node.remove();
        this.asteroidArr.splice(i, 1);
        this.spaceShipHero.health -= 1;
        hitHeroDamageSoundNode.play();
      }
    });
  };


  //------------------COLISIONES DE FUEGO HERO VS --------------------
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
          cadaAsteroide.health -= cadaFuego.damage;
          cadaFuego.node.remove();
          miniExplosionSoundNode.play();
          this.heroFireArr.splice(a, 1);
          if (cadaAsteroide.explosion !== true) {
            this.myScore += 100;
          }
          //console.log("colision");
        }
      });
    });
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

          cadaVillano.health -= cadaFuego.damage;
          if (cadaVillano.health <= 0) {
            this.myScore += 1000;
          }
          cadaFuego.node.remove();
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
            cadaVillano.health -= cadaMisil.damage;
            if (
              cadaVillano.health <= 0 &&
              cadaVillano.explosion !== true
            ) {
              this.myScore += 1000;
            }
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
            cadaAsteroid.health -= cadaMisil.damage;
            if (
              cadaAsteroid.health <= 0 &&
              cadaAsteroid.explosion !== true
            ) {
              this.myScore += 100;
            }
          } else {
          }
        }
      });
    });
  };

  //------------------- COLISIONES DEL SHIELD HERO ----------------------


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
            cadaAsteroide.health -= shield.damage;
            

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
          cadaVillano.health = 0;

         
          console.log("colision villan shield");
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
          console.log("colison fuego escudo");
        }
      });
    }
  };


 // ------------------- COLISIONES DE FIRE ENEMIGO VS HERO ---------------------------------

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
        hitHeroDamageSoundNode.play();
        this.villanFireArr[i].node.remove();
        this.villanFireArr.splice(i, 1);
        //console.log("colison");
      }
    });
  };

  // --------------------------------------------ELIMINACION DE OBJETOS-----------------------------------------

  asteroidDisapear = () => {
    
    this.asteroidArr.forEach((asteroid, i) => {
      if (asteroid.explosion === false && asteroid.health <= 0) {
        //console.log("explosion");

        asteroid.node.src =
          "./Animated_Pixel_Ships_v1.5.6/Explosion/Small/explosion-pequeña.gif";
        asteroid.explosion = true;
        miniExplosionSoundNode.play();
        setTimeout(() => {
          asteroid.node.remove();
          this.asteroidArr.splice(i, 1);
        }, 700);
      } else if (asteroid.y > 732) {
        asteroid.node.remove();
        this.asteroidArr.shift();
      }
    });
  };

  laserDisapear = () => {
    this.heroFireArr.forEach((cadaFuego) => {
      if (cadaFuego.y <= -26) {
        cadaFuego.node.remove();
        this.heroFireArr.shift();
      }
    });

    this.villanFireArr.forEach((cadaFuego, i) => {
      if (cadaFuego.y >= 700) {
        cadaFuego.node.remove();
        this.villanFireArr.shift();
      } else if (
        this.villanArr.forEach((villan) => {
          villan.id === cadaFuego.id && villan.explosion === true;
        })
      ) {
        //console.log("entro");
        cadaFuego.node.remove();
        this.villanFireArr.splice(i, 1);
      }
    });
  };

  

  spaceShipVillanDisapear = () => {
   

    this.villanArr.forEach((villan, i) => {
      if (villan.explosion === false && villan.health < 1) {
        //console.log("explosion");

        villan.node.src =
          "./Animated_Pixel_Ships_v1.5.6/Explosion/Small/explosion-pequeña.gif";
        villan.explosion = true;
        miniExplosionSoundNode.play();
        setTimeout(() => {
          villan.node.remove();
          this.villanArr.splice(i, 1);
        }, 700);
      } else if (villan.y > 780) {
        villan.node.remove();
        this.villanArr.splice(i, 1);
      }
    });
  };

  // funciones de mi juego

  gameLoop = () => {
    // console.log(this.myScore)
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

    this.collisionShieldVillan();
    this.collisionShieldAsteroids();
    this.collisionShieldFireVillan();

    this.collisionSpaceShipHeroFireAsteroids();
    this.collisionSpaceShipHeroFireVillanos();
    this.collisionSpaceShipVillanFireHeroShip();
    this.collisionSpaceShipHeroFireMisilVillanos();
    this.collisionSpaceShipHeroFireMisilAsteroid();

    this.collisionSpaceShipHeroAsteroids();
    this.collisionSpaceShipHerospaceShipVillan();

    this.MisileExplosion();

    // ----------- OTROS----------
    this.bsoSound();
    this.score();

    
    this.spaceShipHero.HeroimgControl();

    this.HeroShieldAndMisileCount();

    this.spaceShipHero.heroMisileIcon();
    this.spaceShipHero.spaceShipHeroShield();
    this.spaceShipHero.spaceShipHeroHealth();
    this.HeroHealth();

    this.heroHealthCount.actualizacionVidas();
    this.winTheGame();

    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}
