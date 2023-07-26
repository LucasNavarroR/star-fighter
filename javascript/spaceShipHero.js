//console.log("spaceHip hero.js");

class SpaceShipHero {
  constructor() {
    //DOM
    this.node = document.createElement("img");
    this.node.src =
      "./Animated_Pixel_Ships_v1.5.6/Plane 01/Normal/Hero-normal.gif";

    gameBoxNode.append(this.node);

    // las propiedades de mi nave hero

    this.x = 190;
    this.y = 525;
    this.w = 42;
    this.h = 71;

    this.health = 3;

    this.movingRight = false;

    this.movingLeft = false;

    this.imgLeft = false;
    this.imgRight = false;
    this.imgForward = true;

    this.heroShield = false;
    this.heroShieldImg = false;
    this.shieldCount = 0;

    this.misileCount = 0;

    // propiedades de proyectiles
    //this.fire = document.createElement("img")
    //this.fire.src = "./Animated_Pixel_Ships_v1.5.6/Projectiles/laser_basico.png"

    //gameBoxNode.append(this.fire)

    // this.fire._x = 190;
    // this.fire._y = 525;
    // this.fire._w = 8;
    // this.fire._h = 26;

    //ajustes tamaño y posicion de los proyectiles

    //  this.fire.style.width = `${this.fire._w}px`;

    //  this.fire.style.position = "absolute";
    //  this.fire.style.top = `${this.fire._y}px`;
    // this.fire.style.left = `${this.x}px`;

    // ajuste de tamaño y posicion de mi nave Hero

    this.node.style.width = `${this.w}px`;

    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  }

  // las funciones de mi nave hero

  spaceShipHeroHealth = () => {
    if (gameObject.heroHealthCount === null) {
      gameObject.heroHealthCount = new HealthCount();
    }
  };

  spaceShipHeroPosition = () => {
    if (this.movingLeft === false && this.movingRight === false) {
      this.imgForward = true;
      this.imgLeft = false;
      this.imgRight = false;
    } else if (this.movingLeft === true) {
      this.imgRight = false;
      this.imgForward = false;
      this.x -= 5;
      this.positionUpdate();
    } else if (this.movingRight === true) {
      this.imgleft = false;
      this.imgForward = false;

      this.x += 5;
      this.positionUpdate();
    }
  };

  HeroimgControl = () => {
    if (this.movingLeft === true && this.imgLeft === false) {
      this.node.src =
        "./Animated_Pixel_Ships_v1.5.6/Plane 01/Normal/Hero-left.gif";
        this.h = 71;
      this.imgLeft = true;
    } else if (this.movingRight === true && this.imgRight === false) {
      this.node.src =
        "./Animated_Pixel_Ships_v1.5.6/Plane 01/Normal/Hero-right.gif";
        this.h = 71;
      this.imgRight = true;
    }
    // else   {
    //   this.node.src =
    //     "./Animated_Pixel_Ships_v1.5.6/Plane 01/Normal/Hero-normal.gif";
    //     this.imgForward = false
    // }
  };

  // spaceShipHeroMovementEffect = (event) => {
  //   if (event === "ArrowLeft" && this.x > 0 && gameObject.isGameOn === true) {
  //     // this.node.src = "./Animated_Pixel_Ships_v1.5.6/Plane 01/Normal/Hero-sip-izquierda.png"
  //     this.x -= 20;
  //     this.positionUpdate()

  //   } else if (event === "ArrowRight" && this.x < 458 && gameObject.isGameOn === true) {
  //     this.x += 20;
  //     this.positionUpdate()

  //   }
  // };

  positionUpdate = () => {
    this.node.style.left = `${this.x}px`;
    if (this.x >= 458) {
      this.x = 458;
    } else if (this.x <= 0) {
      this.x = 0;
    }
    this.node.style.left = `${this.x}px`;
  };


  heroMisileIcon = () => {
    if (gameObject.MisileIcon === null) {
      gameObject.MisileIcon = new HeroMisileImgHud();
      gameObject.MisileIcon.node.style.display = "none";
  } else {

    if (this.misileCount >= 10) {
      gameObject.MisileIcon.node.style.display = "flex";
    } else {
      gameObject.MisileIcon.node.style.display = "none";
    }
  }
}
  
  spaceShipHeroShield = () => {
    if (gameObject.shieldIcon === null) {
      gameObject.shieldIcon = new HeroShieldImgHud();
      gameObject.shieldIcon.node.style.display = "none";
    } else {
      if (this.shieldCount >= 5) {
        console.log("shield activated");
        gameObject.shieldIcon.node.style.display = "flex";

        if (this.heroShield === true && gameObject.heroShieldArr.length === 0) {
          

          let heroShield = new HeroShield(this.x);
          this.shieldCount = 0;
          gameObject.heroShieldArr.push(heroShield);
          gameObject.heroShieldArr[0].posicionShield(this.x);

          setTimeout(() => {
            this.shieldCount = 0;
            this.heroShield = false;
            gameObject.heroShieldArr[0].node.remove();
            gameObject.heroShieldArr.shift();
          }, 4000);
        }
      } else {
        gameObject.shieldIcon.node.style.display = "none";
      }
    }
  };

  spaceShipHeroFire = (event) => {
    if (event === " ") {
      let heroFire = new FuegoSpaceShipHero(this.x);

      gameObject.heroFireArr.push(heroFire);
    } else if (event === "f" && this.misileCount >= 10) {
      let heroFireMisile = new FuegoSpaceShipMissile(this.x + 20);
      gameObject.heroFireMissil.push(heroFireMisile);
      this.misileCount = 0;
    }
  };
}
