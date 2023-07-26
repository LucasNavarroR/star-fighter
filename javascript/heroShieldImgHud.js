class HeroShieldImgHud {
    constructor() {
      this.node = document.createElement("img");
      this.node.src = "Animated_Pixel_Ships_v1.5.6/Icons/Power-Ups/icon-shield.png"
  
      gameBoxNode.append(this.node);
  
      this.x = 135;
      this.y = 650;
      this.w = 35;
      this.h = 35
  
      this.node.style.width = `${this.w}px`;
  
      this.node.style.position = "absolute";
      this.node.style.top = `${this.y}px`;
      this.node.style.left = `${this.x}px`;
    }
  
  
    
  }
  