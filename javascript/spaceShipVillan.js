console.log("spaceShip villan.js");

class SpaceShipVillan {
  constructor(
    name,
    health,
    randomPositionX,
    skin,
    height,
    width,
    velocity,
    id,
    fire
  ) {
    this.node = document.createElement("img");

    this.node.src = skin;
    gameBoxNode.append(this.node);

    // las propiedades de SpaceShipVillan
    this.name = name;
    this.id = id;
    this.health = health;
    this.x = randomPositionX;
    this.explosion = false;
    this.fire = fire;

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

  spaceShipVillanFire = () => {
    if (name === "villan1") {
      return
    } else if (name !== "villan1" && this.explosion === false) {
      
        let direction1 = "center";
        let direction2 = "left";
        let direction3 = "right";

        let newVillanFire1 = new FuegoSpaceShipVillan(
          this.x,
          this.fire,
          direction1
        );
        let newVillanFire2 = new FuegoSpaceShipVillan(
          this.x,
          this.fire,
          direction2
        );
        let newVillanFire3 = new FuegoSpaceShipVillan(
          this.x,
          this.fire,
          direction3
        );
        gameObject.villanFireArr.push(
          newVillanFire1,
          newVillanFire2,
          newVillanFire3
        );
      
    }
  };
}
