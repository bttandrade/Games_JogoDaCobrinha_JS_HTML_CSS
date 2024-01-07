const scoreElement = document.querySelector('.score');
const playBoard = document.getElementById("board");

let gridSize = 20;
playBoard.style.gridTemplate = `repeat(${gridSize}, 1fr) / repeat(${gridSize}, 1fr)`;

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0;

let snakeHead = document.createElement('div');
snakeHead.id = 'snake-head';
snakeHead.className = 'body';
eye1 = document.createElement('div');
eye1.className = "eye1";
eye2 = document.createElement('div');
eye2.className = "eye2";
snakeHead.appendChild(eye1);
snakeHead.appendChild(eye2);

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * gridSize) + 1;
    foodY = Math.floor(Math.random() * gridSize) + 1;
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Fim de Jogo! Tente novamente.");
    location.reload();
}

function playSound(audioName) {
    let audio = new Audio(`./src/sounds/${audioName}`);
    audio.play();
}

const changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
        snakeHead.style.transform = "rotate(0deg)";
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
        snakeHead.style.transform = "rotate(180deg)";
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
        snakeHead.style.transform = "rotate(270deg)";
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
        snakeHead.style.transform = "rotate(90deg)";
    }
    initGame();
}

const initGame = () => {
    if (gameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if (snakeX === foodX && snakeY === foodY) {
        playSound("eating.wav");
        changeFoodPosition();
        snakeBody.push([foodX, foodY]);
        score++;
        scoreElement.innerText = `Pontuação: ${score}`;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];  
    }

    snakeBody[0] = [snakeX, snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    if (snakeX <= 0 || snakeX > gridSize || snakeY <= 0 || snakeY > gridSize) {
        gameOver = true;
    }

    for (let i = 1; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="body" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }
    playBoard.innerHTML = htmlMarkup;
    if (snakeBody[0][1] && snakeBody[0][0]) {
        snakeHead.style.gridArea = `${snakeBody[0][1]} / ${snakeBody[0][0]}`
        playBoard.appendChild(snakeHead);
    }

}
changeFoodPosition();
setIntervalId =  setInterval(initGame, 125);

document.addEventListener("keydown", changeDirection);