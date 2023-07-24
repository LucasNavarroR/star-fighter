console.log("spaceShip villan.js");

class SpaceShipVillan {
  constructor(name, health, randomPositionX, skin, height, width, velocity) {
    this.node = document.createElement("img");

    this.node.src = skin;
    gameBoxNode.append(this.node);

    // las propiedades de SpaceShipVillan
    this.name = name;
    console.log(this.name);
    this.health = health;
    this.x = randomPositionX;
    this.explosion = false;

    this.y = height * -1;
    this.w = width;
    this.h = height;

    this.gravitySpeed = velocity;

    this.node.style.width = `${this.w}px`;

    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  }

  villanShipMovement = () => {
    if (this.health < 1) {
    } else {
      this.y += this.gravitySpeed;
      this.positionUpdate();
    }
  };

  positionUpdate = () => {
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
    if (this.name === "villan2" && this.y >= 100) {
      console.log("hey");
      this.y = 100;
    } else {
    }
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  };
}
