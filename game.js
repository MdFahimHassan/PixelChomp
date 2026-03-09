let state = "menu";

function startGame() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("gameCanvas").style.display = "block";
  state = "playing";

  // Start the game loop here
  setInterval(gameLoop, 300); 
  render();
}

function openSettings() {
  alert("Settings menu coming soon!");
}

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Maze grid (1 = wall, 0 = empty)
const maze = [
  [1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,1],
  [1,0,1,1,1,0,0,1],
  [1,0,0,0,1,0,1,1],
  [1,1,1,0,1,0,0,1],
  [1,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,0,1],
  [1,1,1,1,1,1,1,1]
];

const tileSize = 50;
const mazeWidth = maze[0].length * tileSize;
const mazeHeight = maze.length * tileSize;

const offsetX = (canvas.width - mazeWidth) / 2;
const offsetY = (canvas.height - mazeHeight) / 2;

let player = { x: 1, y: 1 };
let direction = "right"; // default starting direction
let score = 0;

// Initialize dots
let dots = [];
for (let y = 0; y < maze.length; y++) {
  dots[y] = [];
  for (let x = 0; x < maze[y].length; x++) {
    dots[y][x] = maze[y][x] === 0 ? true : false;
  }
}

// Eat the starting dot immediately
if (dots[player.y][player.x]) {
  dots[player.y][player.x] = false;
  score++;
  console.log("Score:", score);
}

function drawMaze() {
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      if (maze[y][x] === 1) {
        ctx.fillStyle = "blue";
        ctx.fillRect(offsetX + x * tileSize, offsetY + y * tileSize, tileSize, tileSize);
      }
    }
  }
}

function drawDots() {
  ctx.fillStyle = "white";
  for (let y = 0; y < dots.length; y++) {
    for (let x = 0; x < dots[y].length; x++) {
      if (dots[y][x]) {
        ctx.fillRect(
          offsetX + x * tileSize + tileSize/2 - 3, // center the pixel
          offsetY + y * tileSize + tileSize/2 - 3,
          6, // width
          6  // height
        );
      }
    }
  }
}

function drawPlayer() {
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(
    offsetX + player.x * tileSize + tileSize/2,
    offsetY + player.y * tileSize + tileSize/2,
    tileSize/2 - 5,
    0,
    Math.PI * 2
  );
  ctx.fill();
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.textAlign = "left";
  ctx.fillText("Score: " + score, 10, 25);
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMaze();
  drawDots();
  drawPlayer();
  drawScore(); // show score at top-left
}

// Movement logic
function movePlayer() {
  let newX = player.x;
  let newY = player.y;

  if (direction === "up") newY--;
  if (direction === "down") newY++;
  if (direction === "left") newX--;
  if (direction === "right") newX++;

  if (maze[newY][newX] === 0) {
    player.x = newX;
    player.y = newY;
    if (dots[newY][newX]) {
      dots[newY][newX] = false;
      score++;
      console.log("Score:", score);
    }
  }
}

// Listen for arrow keys to change direction
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") direction = "up";
  if (e.key === "ArrowDown") direction = "down";
  if (e.key === "ArrowLeft") direction = "left";
  if (e.key === "ArrowRight") direction = "right";
});

// Game loop (runs every 300ms)
function gameLoop() {
  movePlayer();
  render();
}

// Initial draw (menu shows first, game starts only when Start is pressed)
render();
