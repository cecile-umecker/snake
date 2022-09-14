// canvas
var canvas;
var gameContainer;
var scoreContainer;
const canvasSize = 400;
const canvasBorder = "1px solid red";
const canvasBorderRadius = "5px";
const canvasBackgroundColor = "#1d1d1d";
const canvasOpacity = 0.8;
const scoreColor = "#ffffff";
var score = 0;
var audioWin;
var audioLose;
var ctx;

// snake
const snakeColor = "lightblue";
const snakeSize = 20;
const blockUnit = canvasSize / snakeSize;
var snakeX = Math.trunc(Math.random() * blockUnit) * snakeSize;
var snakeY = Math.trunc(Math.random() * blockUnit) * snakeSize;
var stepX = 0;
var stepY = 0;

// food
const foodColor = "red";
const foodSize = snakeSize;
const rayonFood = foodSize/2;
var foodX = Math.trunc(Math.random() * blockUnit) * foodSize + rayonFood;
var foodY = Math.trunc(Math.random() * blockUnit) * foodSize + rayonFood;

export const SnakeGame = {

    start: () => {
        SnakeGame.initMedia();
        SnakeGame.createCanvas();
        SnakeGame.createSnake();
        SnakeGame.initMoveSnake();
        setInterval(SnakeGame.updateSnakePosition,130);
    },

    createCanvas: () => {
        gameContainer = document.createElement('div');
        scoreContainer = document.createElement('div');
        scoreContainer.id = "score";
        scoreContainer.innerHTML = score;
        scoreContainer.style.color = scoreColor;
        scoreContainer.style.fontSize = "50px";
        scoreContainer.style.opacity = 0.5;
        scoreContainer.style.zIndex = 1000;
        scoreContainer.style.position = "fixed";
        gameContainer.id = "game-container";
        canvas = document.createElement('canvas');
        canvas.width = canvasSize;
        canvas.height = canvasSize;
        canvas.style.border = canvasBorder;
        canvas.style.borderRadius = canvasBorderRadius;
        canvas.style.backgroundColor = canvasBackgroundColor;
        canvas.style.opacity = canvasOpacity;
        gameContainer.style.display = "flex";
        gameContainer.style.justifyContent = "center";
        gameContainer.style.alignItems = "center";
        ctx = canvas.getContext("2d");
        gameContainer.appendChild(scoreContainer);
        gameContainer.appendChild(canvas);
        document.body.appendChild(gameContainer);
    },

    initMedia: () => {
        audioWin = document.createElement('audio');
        audioWin.src = "./assets/media/croc.mp3";
        audioLose = document.createElement('audio');
        audioLose.src = "./assets/media/boing.mp3";
    },

    createSnake: () => {
        ctx.fillStyle = snakeColor;
        ctx.clearRect(0, 0, canvasSize, canvasSize);
        ctx.fillRect(snakeX, snakeY, snakeSize, snakeSize);
        SnakeGame.createFood();
    },

    createFood: () => {
        ctx.beginPath();
        ctx.arc(foodX, foodY, rayonFood, 0, 2*Math.PI);
        ctx.fillStyle = foodColor;
        ctx.fill();
        ctx.closePath();
    },

    updateSnakePosition: () => {
        snakeX += stepX;
        snakeY += stepY;
        SnakeGame.createSnake();
        SnakeGame.checkCollision();
    },

    initMoveSnake: () => {
        document.addEventListener('keydown', () => {
            switch (event.key) {
                case "ArrowUp":
                    stepY = -20;
                    stepX = 0;
                    break;
                case "ArrowDown":
                    stepY = 20;
                    stepX = 0;
                    break;
                case "ArrowLeft":
                    stepX = -20;
                    stepY = 0;
                    break;
                case "ArrowRight":
                    stepX = 20;
                    stepY = 0;
                    break;
                case " ":
                    stepX = 0;
                    stepY = 0;
                    break;
            }   
        });
    },

    checkCollision: () => {
        if (snakeX < 0 || snakeX > (canvasSize - snakeSize) || snakeY < 0 || snakeY > (canvasSize - snakeSize)) {
            audioLose.play();
            stepX = 0;
            stepY = 0;
            snakeX = 0;
            snakeY = 0;
            scoreContainer.innerHTML = "Game Over";
            setTimeout(() => {
            location.reload();
            }, 1000); 
        }
        else if (snakeX === foodX - rayonFood && snakeY === foodY - rayonFood) {
            audioWin.play();
            foodX = Math.trunc(Math.random()* blockUnit) * foodSize + rayonFood;
            foodY = Math.trunc(Math.random()* blockUnit) * foodSize + rayonFood;
            SnakeGame.createFood();
            scoreContainer.innerHTML = parseInt(scoreContainer.innerHTML) + 1;
        }
    },
}
