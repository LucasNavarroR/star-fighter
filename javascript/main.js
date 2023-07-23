console.log("main.js");

// GLOBAL VARIABLES
const startButtonNode = document.querySelector("#start-btn");
const startScreenNode = document.querySelector("#start-screen");
const gameScreenNOde = document.querySelector("#game-screen");
const gameBoxNode = document.querySelector("#game-box");
const gameOverScreenNode = document.querySelector("#gameover-screen")
const playAgainButtonNode = document.querySelector("#playAgain-btn")
const playAgainGameOverButton = document.querySelector("#playAgain-gamOver-btn")
gameObject = null;

// STATE MANAGEMENT FUNCTIONS

function startGame() {
  console.log("game started");

 delete gameObject

  
  

  startScreenNode.style.display = "none";
  gameScreenNOde.style.display = "flex";

  //el juego inicie
  gameObject = new Game();
  gameObject.gameLoop();
}

function restartGame() {
  startScreenNode.style.display = "flex"
  gameScreenNOde.style.display = "none";

  startGame()

}


// ADD EVENT LISTENERS
startButtonNode.addEventListener("click", startGame);
playAgainButtonNode.addEventListener("click", restartGame);
playAgainGameOverButton.addEventListener("click", startGame);




window.addEventListener("keydown", (event) => {
  gameObject.spaceShipHero.spaceShipHeroMovementEffect(event.key);
});
