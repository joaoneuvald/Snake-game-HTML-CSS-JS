const playBoard = document.querySelector('.play_board');
const scoreElement = document.querySelector('.score');
const highScoreElement = document.querySelector('.high_score');
const controls = document.querySelectorAll(".controls i")


let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId = 0;
let score = 0;

let highScore = localStorage.getItem("high_score") || 0;
highScoreElement.innerHTML = `High Score: ${highScore}`;
// making the arrowkeys move the snake
const changeDirection = (e) => { 
    if(e.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }else if(e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }else if(e.key === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}
controls.forEach(key =>{
    key.addEventListener("click", () => changeDirection({key: key.dataset.key}
        ));
})

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert('Game over! Press "Ok" to replay');
    location.reload();
}

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1; 
    foodY = Math.floor(Math.random() * 30) + 1;
}
const initGame = () =>{
    if (gameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY}/${foodX}"></div>`; // div for snake head
  

    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition();
        snakeBody.push([foodX,foodY]);
        score++;

        highScore = score>= highScore ? score :highScore;
        localStorage.setItem("high_score", highScore);
        scoreElement.innerHTML = `Score: ${score}`;
        highScoreElement.innerHTML = `High Score: ${highScore}`;
    } 
    for (let index = snakeBody.length - 1; index > 0; index--) {
        snakeBody[index] = snakeBody[index - 1];
        
    }

    snakeBody[0] = [snakeX, snakeY];
    snakeX += velocityX;
    snakeY += velocityY;

    // Game over
    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        gameOver = true;
    }


    for (let index = 0; index < snakeBody.length; index++) {
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[index][1]}/${snakeBody[index][0]}"></div>`; // adding div to snakeBody
        if(index !== 0 && snakeBody[0][1] === snakeBody[index][1] && snakeBody[0][0] === snakeBody[index][0]){
            gameOver = true;
        }
    }
    playBoard.innerHTML = htmlMarkup; 
}

changeFoodPosition();
setIntervalId = setInterval(initGame, 125); // Making the snake moving constant
document.addEventListener('keydown', changeDirection);
