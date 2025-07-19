const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const grid = 20;
let snake = [{ x: 160, y: 160 }];
let direction = "RIGHT";
let food = generateFood();
let score = 0;

function generateFood() {
  return {
    x: Math.floor(Math.random() * (canvas.width / grid)) * grid,
    y: Math.floor(Math.random() * (canvas.height / grid)) * grid
  };
}

function drawSnake() {
  ctx.fillStyle = "#4caf50";
  snake.forEach(part => {
    ctx.fillRect(part.x, part.y, grid, grid);
  });
}

function drawFood() {
  ctx.fillStyle = "#f44336";
  ctx.fillRect(food.x, food.y, grid, grid);
}

function updateSnake() {
  const head = { ...snake[0] };

  if (direction === "LEFT") head.x -= grid;
  if (direction === "RIGHT") head.x += grid;
  if (direction === "UP") head.y -= grid;
  if (direction === "DOWN") head.y += grid;

  // Tabrak dinding
  if (
    head.x < 0 || head.y < 0 ||
    head.x >= canvas.width || head.y >= canvas.height
  ) {
    return gameOver();
  }

  // Tabrak badan sendiri
  if (snake.some((part, i) => i !== 0 && part.x === head.x && part.y === head.y)) {
    return gameOver();
  }

  snake.unshift(head);

  // Makan makanan
  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("score").textContent = "Skor: " + score;
    food = generateFood();
  } else {
    snake.pop();
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateSnake();
  drawSnake();
  drawFood();
}

function gameOver() {
  alert("Game Over! Skor: " + score);
  snake = [{ x: 160, y: 160 }];
  direction = "RIGHT";
  food = generateFood();
  score = 0;
  document.getElementById("score").textContent = "Skor: 0";
}

document.addEventListener("keydown", (e) => {
  const key = e.key;
  if (key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  if (key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

setInterval(gameLoop, 120);
