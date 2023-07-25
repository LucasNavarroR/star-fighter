console.log("fueoMissilHero.js");

class FuegoSpaceShipMissile {

  constructor(position) {

  this.node = document.createElement("img")
  this.node.src = "./Animated_Pixel_Ships_v1.5.6/Projectiles/Misil-Hero.gif"

 
  gameBoxNode.append(this.node)

  this.x = position;
  this.y = 525;
  this.w = 14;
  this.h = 29;
  this.explode = true;
  this.explosionActive = false;

  this.damage = 3;

  this.node.style.width = `${this.w}px`;

    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
  this.node.style.left =  `${this.x}px`;
  }

  fuegoSpaceShipHeroMovement = () => {
    this.y -= 2;
    this.fuegoSpaceShipPositionUpdate();
  };

  fuegoSpaceShipPositionUpdate = () => {
    this.node.style.top = `${this.y}px`;
  };

 
}