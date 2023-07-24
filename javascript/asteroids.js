console.log("asteroids.js");

class Asteroid {
  constructor(randomPositionX) {
    this.node = document.createElement("img");
    this.node.src = "./Animated_Pixel_Ships_v1.5.6/Background/asteroid_01.png";

    this.explosion = false;
    this.randomMovementX = Math.floor(Math.random() * 100);

    gameBoxNode.append(this.node);

    // las propiedades de meteorito
    this.health = 1;

    this.x = randomPositionX;

    this.y = -32;
    this.w = 32;
    this.h = 32;

    this.gravitySpeedY = 2;
    this.gravitySpeedX = 0.3;

    this.node.style.width = `${this.w}px`;

    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  }

  // asteroidHealth = () => {

  // if (this.healt <= 0 || )

  // //   if (this.health <= 0 && this.explosion === false) {
  // //     console.log("asteroideHealth")
  // // this.node.src= "./Animated_Pixel_Ships_v1.5.6/Explosion/Small/explosion-pequeña.gif"
  // // this.explosion = true;

  // // }

  // }
  asteroidMovement = () => {
    if (this.health < 1) {
    } else {
      if (this.randomMovementX <= 50) {
        this.y += this.gravitySpeedY;
        this.x-= this.gravitySpeedX 
        this.positionUpdate();
      } else {
        this.y += this.gravitySpeedY;
        this.x += this.gravitySpeedX 
        this.positionUpdate();
      }
    }
  };

  positionUpdate = () => {
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  };
}
