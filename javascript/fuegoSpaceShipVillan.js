//console.log("fuegoSpaceShipVillan.js");

class FuegoSpaceShipVillan {
  constructor(position, fire, direction, id) {
    this.node = document.createElement("img");
    this.node.src = fire;
    this.direction = direction;

    gameBoxNode.append(this.node);

    this.x = position + 30;
    this.y = 100;
    this.w = 8;
    this.h = 26;
    this.id = id;
    this.damage = 1;
  

    this.node.style.width = `${this.w}px`;

    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  }

  fuegoSpaceShipVillanMovement = () => {
    this.y += 2;
    if (this.direction === "left") {
      this.x -= 0.35;
    } else if (this.direction === "right") {
      this.x += 0.35;
    } else {
    }
    this.fuegoSpaceShipPositionUpdate();
  };

  fuegoSpaceShipPositionUpdate = () => {
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  };
  
}