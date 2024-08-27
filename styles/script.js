const board = document.querySelector(".board");

const MAX_WIDTH = 500; 
let SCORE = 0;
let ROW_COUNT = 2;
let COL_COUNT = 2;
let MARGIN = 100;
let TIMER = 60;


const updateScore = () => {
  const pointEl = document.querySelector("#point");
  pointEl.innerHTML = SCORE;
}; 

const gameover = () => {
  const gameoverEl = document.querySelector("#game-over");
  gameoverEl.className = "shown";

};

const restart = () => {
  const restartEl = document.querySelector("#restart");
  restartEl.className = "shownn";
  restartEl.addEventListener("click", () => {
    resetGame();
    draw();
    restartEl.className = "restart"
  }) 
}


const updateCountdown = () => {
  const countdownEl = document.querySelector("#countdown");
  countdownEl.innerHTML = TIMER;
}; 

const countdown = () => {
  if (TIMER !== 0) {
    TIMER--;
    updateCountdown();
  } else if (TIMER < 0 ) {
    gameover();
    restart();
  }
};


setInterval(countdown, 1000);



const draw = () => {
    board.innerHTML = "";
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  const oddIndex = Math.floor(Math.random () * ROW_COUNT * COL_COUNT);

  for (let i = 0; i < ROW_COUNT * COL_COUNT; i++) {
    const tileEl = document.createElement("div");
    tileEl.className = "tile";
    tileEl.style.width = `${MAX_WIDTH / COL_COUNT}px`;
    tileEl.style.height = `${MAX_WIDTH / ROW_COUNT}px`;

    if (i === oddIndex) {
      tileEl.addEventListener("click", handleCorrectClick);
      tileEl.style.backgroundColor = `rgb(${red - MARGIN}, ${green - MARGIN}, ${
        blue - MARGIN
      })`;
    } else {
      tileEl.addEventListener("click", handleClick);
      tileEl.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    }

    board.appendChild(tileEl);
    updateScore();
  }
};

const handleClick = () => {
    TIMER -= 5;
    if (TIMER < 1){
      gameover();
      restart();
    }
    updateCountdown();
};

const handleCorrectClick = () => {
    SCORE++;
 if(TIMER ===0) {
  gameover();
  restart();
}
    if (SCORE % 3 === 0) {
      ROW_COUNT++;
      COL_COUNT++;
      if (MARGIN !== 20) {
        MARGIN -= 15;
      }
    } 
    draw();
};
const resetGame = () => {
  SCORE = 0;
  ROW_COUNT = 2;
  COL_COUNT = 2;
  MARGIN = 100;
  TIMER = 60;
  updateScore();
  updateCountdown();
  document.querySelector("#game-over").className = "hidden";
};

draw();
