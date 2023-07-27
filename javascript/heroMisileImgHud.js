class HeroMisileImgHud {
    constructor() {
      this.node = document.createElement("img");
      this.node.src = "Animated_Pixel_Ships_v1.5.6/Projectiles/misil-hero.gif"
  
      gameBoxNode.append(this.node);
  
      this.x = 350;
      this.y = 650;
      this.w = 
      this.h = 35
  
      this.node.style.width = `${this.w}px`;
     this.node.style.height = `${this.h}px`;
      this.node.style.position = "absolute";
      this.node.style.top = `${this.y}px`;
      this.node.style.left = `${this.x}px`;
    }
  
  
    
  }
  