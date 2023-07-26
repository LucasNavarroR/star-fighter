

class HeroShield {

  constructor(position) {

  this.node = document.createElement("img")
  this.node.src = "./Animated_Pixel_Ships_v1.5.6/Plane 01/Normal/Hero-Shield.gif"

 
  gameBoxNode.append(this.node)

  this.x = position;
  this.y = 500;
  this.w = 110;
  this.h = 110;

  this.damage = 1;


  this.node.style.width = `${this.w}px`;

    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
  this.node.style.left =  `${this.x}px`;
  }



  posicionShield = (position) => {

    this.node.style.left =  `${position-30}px`;
  };
}
