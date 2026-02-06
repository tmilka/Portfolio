/* =========================================
   SNAKE OS - CORE ENGINE (REACTIVE VERSION)
   ========================================= */

const playBoard = document.querySelector(".play-board");
const scoreElements = document.querySelectorAll(".score");
const highScoreElements = document.querySelectorAll(".high-score");

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0;

// Grid-Variablen (werden dynamisch berechnet)
let gridX, gridY, TOTAL_FIELDS;

const updateGridSize = () => {
    if (window.innerWidth <= 768) {
        gridX = 25; // Muss zum CSS Mobile Grid passen
        gridY = 25;
    } else {
        gridX = 40; // Muss zum CSS Desktop Grid passen
        gridY = 20;
    }
    TOTAL_FIELDS = gridX * gridY;
};

// Highscore laden
let highScore = localStorage.getItem("high-score") || 0;
highScoreElements.forEach(el => el.innerText = highScore);

const changeFoodPosition = () => {
    // Nutzt die aktuell berechneten Grid-Werte
    foodX = Math.floor(Math.random() * gridX) + 1;
    foodY = Math.floor(Math.random() * gridY) + 1;
    
    // Check gegen Schlangenkörper
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeBody[i][0] === foodX && snakeBody[i][1] === foodY) {
            return changeFoodPosition();
        }
    }
};

const handleGameOver = (isWin = false) => {
    clearInterval(setIntervalId);
    const overlay = document.getElementById("game-over-overlay");
    const reasonText = document.getElementById("death-reason");
    
    if (overlay) {
        overlay.style.display = "flex";
        reasonText.innerText = isWin ? "SUCCESS: Grid gefüllt" : "CRITICAL_ERROR: Collision Detected";
    }
};

const resetGame = () => {
    const overlay = document.getElementById("game-over-overlay");
    if (overlay) overlay.style.display = "none";
    
    updateGridSize(); // Grid beim Reset neu prüfen
    gameOver = false;
    snakeX = 5;
    snakeY = 10;
    snakeBody = [];
    velocityX = 0;
    velocityY = 0;
    score = 0;
    
    scoreElements.forEach(el => el.innerText = score);
    changeFoodPosition();
    setIntervalId = setInterval(initGame, 125);
};

// Touch-Funktion für Buttons
const handleTouch = (key) => {
    changeDirection({ key: key, preventDefault: () => {} });
};

const changeDirection = (e) => {
    if(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
    }

    if(e.key === "ArrowUp" && velocityY !== 1) {
        velocityX = 0; velocityY = -1;
    } else if(e.key === "ArrowDown" && velocityY !== -1) {
        velocityX = 0; velocityY = 1;
    } else if(e.key === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1; velocityY = 0;
    } else if(e.key === "ArrowRight" && velocityX !== -1) {
        velocityX = 1; velocityY = 0;
    }
};

const initGame = () => {
    if(gameOver) return handleGameOver();
    
    // Bewegung
    snakeX += velocityX;
    snakeY += velocityY;

    // Kollision Wand
    if(snakeX <= 0 || snakeX > gridX || snakeY <= 0 || snakeY > gridY) {
        return gameOver = true;
    }

    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    // Futter essen
    if(snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX, foodY]);
        score++;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElements.forEach(el => el.innerText = score);
        highScoreElements.forEach(el => el.innerText = highScore);
    }

    // Körper bewegen
    for(let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY];

    // Zeichnen & Selbstkollision
    for(let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }
    playBoard.innerHTML = htmlMarkup;
};

/* =========================================
   START & RESIZE HANDLING
   ========================================= */
updateGridSize();
changeFoodPosition();
setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);

// Falls der Nutzer das Fenster während des Spiels ändert:
window.addEventListener("resize", updateGridSize);