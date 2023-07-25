console.log("main.js");

// GLOBAL VARIABLES
const startButtonNode = document.querySelector("#start-btn");
const startScreenNode = document.querySelector("#start-screen");
const gameScreenNOde = document.querySelector("#game-screen");
const gameBoxNode = document.querySelector("#game-box");
const gameOverScreenNode = document.querySelector("#gameover-screen");
const playAgainButtonNode = document.querySelector("#playAgain-btn");
const playAgainGameOverButton = document.querySelector(
  "#playAgain-gamOver-btn"
);
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
  gameBoxNode.innerHTML = " ";

  startScreenNode.style.display = "flex";
  gameScreenNOde.style.display = "none";

  startGame();
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
  } else if (event.key === " ") {
    gameObject.spaceShipHero.spaceShipHeroFire();
  } else if (event.key === "s") {
   // console.log("shield") 
    gameObject.spaceShipHero.heroShield = true;
    console.log(gameObject.spaceShipHero.heroShield)
  }
});

window.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft") {
    gameObject.spaceShipHero.movingLeft = false;
  } else if (event.key === "ArrowRight") {
    gameObject.spaceShipHero.movingRight = false;
  }  else if (event.key === "s") {
    
     gameObject.spaceShipHero.heroShield = false;
     console.log(gameObject.spaceShipHero.heroShield)
}}
);
