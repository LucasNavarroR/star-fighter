console.log("spaceHip hero.js");

class SpaceShipHero {
  constructor() {
    //DOM
    this.node = document.createElement("img");
    this.node.src =
      "./Animated_Pixel_Ships_v1.5.6/Plane 01/Normal/Hero-ship-centrada.png";
    gameBoxNode.append(this.node);

    // las propiedades de mi nave hero

    this.x = 190;
    this.y = 525;
    this.w = 42;
    this.h = 71;

    this.health = 3;

    this.movingRight = false;
    this.movingLeft = false;

    this.heroShield = false;
    this.shieldCount = 0;

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
  spaceShipHeroPosition = () => {
    if (this.movingLeft === true) {
      this.x -= 5;
      this.positionUpdate();
    } else if (this.movingRight === true) {
      this.x += 5;
      this.positionUpdate();
    }
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

  spaceShipHeroShield = () => {
    
   
    if (this.heroShield === true && this.shieldCount >= 5) {
      console.log("hero shield")
this.health += 3
      this.node.src =
        "/Animated_Pixel_Ships_v1.5.6/Plane 01/Normal/Hero-ship-centrada-shield-on.png";

      this.node.style.width = `${96}px`;

      this.node.style.height = `${96}px`;
     
      setTimeout(() => {
        this.shieldCount = 0;
        this.heroShield = false;
        this.node.style.width = `${this.w}px`;

        this.node.style.height = `${this.h}px`;
        this.node.src = "./Animated_Pixel_Ships_v1.5.6/Plane 01/Normal/Hero-ship-centrada.png"
      }, 3000);
    }
  };

  spaceShipHeroFire = () => {
    let heroFire = new FuegoSpaceShipHero(this.x);

    gameObject.heroFireArr.push(heroFire);
  };
}
