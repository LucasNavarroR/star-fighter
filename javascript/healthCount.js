class HealthCount {
  constructor() {
    this.node = document.createElement("img");
    this.node.src = "./Animated_Pixel_Ships_v1.5.6/Plane 01/Normal/3-vidas.png";

    gameBoxNode.append(this.node);

    this.x = 25;
    this.y = 650;
    this.w = 100;
    this.h = 35 

    this.node.style.width = `${this.w}px`;

    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  }


  actualizacionVidas = () => {
    if (gameObject.spaceShipHero.health === 3) {
      this.node.src =
        "./Animated_Pixel_Ships_v1.5.6/Plane 01/Normal/3-vidas.png";
    } else if (gameObject.spaceShipHero.health === 2) {
      this.node.src =
        "./Animated_Pixel_Ships_v1.5.6/Plane 01/Normal/2-vidas.png";
    } else if (gameObject.spaceShipHero.health === 1) {
      this.node.src =
        "./Animated_Pixel_Ships_v1.5.6/Plane 01/Normal/1-vida.png";
    }
  };
}
