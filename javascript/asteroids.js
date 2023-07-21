console.log("asteroids.js")


class Asteroid {

    constructor() {
this.node = document.createElement("img")
this.node.src = "./Animated_Pixel_Ships_v1.5.6/Background/asteroid_01.png"
gameBoxNode.append(this.node);

    // las propiedades de meteorito

    this.x = 100;

this.y = 100;
this.w = 32;

this.gravitySpeed = 1;

this.node.style.width = `${this.w}px`

this.node.style.position = "absolute";
this.node.style.top = `${this.y}px`
this.node.style.left = `${this.x}px`

    }

  asteroidMovement = () => { // dentro del gameLoop
        this.y += this.gravitySpeed;
       this.node.style.top = `${this.y}px`
      }
}