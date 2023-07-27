//console.log("main.js");

// GLOBAL VARIABLES
const startButtonNode = document.querySelector("#start-btn");
const startScreenNode = document.querySelector("#start-screen");
const gameScreenNOde = document.querySelector("#game-screen");
const gameBoxNode = document.querySelector("#game-box");
const gameOverScreenNode = document.querySelector("#gameover-screen");
const playAgainButtonNode = document.querySelector("#playAgain-btn");
const playAgainGameOverButton = document.querySelector(
  "#playAgain-gamOver-btn");

  // VARIABLES DE AUDIO
const laserHeroSoundNode = new Audio(src= "./Animated_Pixel_Ships_v1.5.6/sounds/laser-gun-fire.mp3")
const miniExplosionSoundNode = new Audio(src= "./Animated_Pixel_Ships_v1.5.6/sounds/mini-explosion.mp3")
const bigExplosionSoundNode = new Audio(src= "./Animated_Pixel_Ships_v1.5.6/sounds/misil-explosion.mp3")
const launchRocketSoundNode = new Audio(src= "./Animated_Pixel_Ships_v1.5.6/sounds/misil-launch.mp3")
const hitHeroDamageSoundNode = new Audio(src= "./Animated_Pixel_Ships_v1.5.6/sounds/hero-get-hit.mp3")
const bsoGameSoundNode = new Audio(src= "./Animated_Pixel_Ships_v1.5.6/sounds/bso-music.mp3")
const weaponReadySoundNode = new Audio(src="./Animated_Pixel_Ships_v1.5.6/sounds/weapon-ready.mp3")
const shieldReadySoundNode = new Audio(src="./Animated_Pixel_Ships_v1.5.6/sounds/shield-ready.mp3")
const shieldActivatedSoundNode = new Audio(src="./Animated_Pixel_Ships_v1.5.6/sounds/shield-activated.mp3")

laserHeroSoundNode.volume = 0.1
miniExplosionSoundNode.volume = 0.1
bigExplosionSoundNode.volume = 0.1
launchRocketSoundNode.volume = 0.1
hitHeroDamageSoundNode.volume = 0.1
bsoGameSoundNode.volume = 0.1
weaponReadySoundNode.volume = 0.1
shieldReadySoundNode.volume = 0.1
shieldActivatedSoundNode.volume = 0.1
let scoreNode = document.querySelector("#score")
let gameObject = null;

// STATE MANAGEMENT FUNCTIONS

function startGame() {

  console.log("game started");

  gameOverScreenNode.style.display = "none";
  startScreenNode.style.display = "none";
  gameScreenNOde.style.display = "flex";

  //el juego inicie
  gameObject = new Game();
  gameObject.gameLoop();
}

//console.log(typeof gameBoxNode)
function restartGame() {
  gameBoxNode.innerHTML = `<h1 id="score-box">SCORE <span id="score"> 0</span></h1>`
  gameObject.bsoSOundVar = false;

 
  gameScreenNOde.style.display = "none";

  startGame();
  playAgainButtonNode.style.display = "none"
}

// ADD EVENT LISTENERS
startButtonNode.addEventListener("click", startGame);
playAgainButtonNode.addEventListener("click", restartGame);
playAgainGameOverButton.addEventListener("click", restartGame);

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    gameObject.spaceShipHero.movingLeft = true;
  } else if (event.key === "ArrowRight") {
    gameObject.spaceShipHero.movingRight = true;
  } else if (event.key === " " || event.key === "f" || event.key === "F") {
    gameObject.spaceShipHero.spaceShipHeroFire(event.key);
  } else if (event.key === "s" || event.key === "S") {
   
    gameObject.spaceShipHero.heroShield = true;
   
  }
});

window.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft") {
    gameObject.spaceShipHero.movingLeft = false;
  } else if (event.key === "ArrowRight") {
    gameObject.spaceShipHero.movingRight = false;
  }  else if (event.key === "s" || event.key === "S") {
    
     gameObject.spaceShipHero.heroShield = false;
     //console.log(gameObject.spaceShipHero.heroShield)
     
}}
);
