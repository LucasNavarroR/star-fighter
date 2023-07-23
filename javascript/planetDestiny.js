class PlanetDestiny {
  constructor() {
    //DOM

    this.node = document.createElement("img");
    this.node.src = "./Animated_Pixel_Ships_v1.5.6/base/imagen-victoria.png";
    gameBoxNode.append(this.node);

    //las propiedades de PlanetDestiny
    this.y = -480;
    this.w = 500;
    this.x = 0;

    this.gravitySpeed = 0.5;

    //ajuste de tamaño y posicion

    this.node.style.width = `${this.w}px`;

    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  }

  planetDestinyMovementEffect = () => {
    this.y += this.gravitySpeed;
    this.positionUpdate();
  };

  positionUpdate = () => {
    this.node.style.top = `${this.y}px`;
  };



}
