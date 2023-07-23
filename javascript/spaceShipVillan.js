console.log("spaceShip villan.js")



class SpaceShipVillan {

   

    constructor(randomPositionX) {

        this.modelArr = [
            { villan: "villan1",
            life : 1,
            velocity : 5,
            skin: "./Animated_Pixel_Ships_v1.5.6/Plane 05/Villano1.png"
      
      
              },
            ]


      this.node = document.createElement("img");
    
      this.node.src = this.modelArr[0].skin;
      gameBoxNode.append(this.node);
  
      // las propiedades de meteorito
  
      this.x = randomPositionX;
  
      this.y = -69;
      this.w = 50;
      this.h = 69;
  
      this.gravitySpeed = this.modelArr[0].velocity;
  
      this.node.style.width = `${this.w}px`;
  
      this.node.style.position = "absolute";
      this.node.style.top = `${this.y}px`;
      this.node.style.left = `${this.x}px`;
    }
  
    villanShipMovement = () => {
      this.y += this.gravitySpeed;
      this.positionUpdate();
    };
  
    positionUpdate = () => {
      this.node.style.top = `${this.y}px`;
    };
  }
  