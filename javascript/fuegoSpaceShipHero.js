console.log("fuegoSpaceShipHero.js");

class FuegoSpaceShipHero {

  constructor(position) {

  this.node = document.createElement("img")
  this.node.src = "./Animated_Pixel_Ships_v1.5.6/Projectiles/laser_basico.png"


  gameBoxNode.append(this.node)
  this.x = position;
  this.y = 525;
  this.w = 8;
  this.h = 26;

  this.node.style.width = `${this.w}px`;

    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
  this.node.style.left =  `${this.x}px`;
  }

  fuegoSpaceShipHeroMovement = () => {
    this.y -= 8;
    this.fuegoSpaceShipPositionUpdate();
  };

  fuegoSpaceShipPositionUpdate = () => {
    this.node.style.top = `${this.y}px`;
  };
}
