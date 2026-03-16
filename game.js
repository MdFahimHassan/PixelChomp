const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let currentLevel = 1;
let maxLevels = 10;
let difficulty = "easy";
let maze = [];
let dots = [];
let player = {x:1,y:1};
let direction = "right";
let score = 0;
let mouthAngle = 0;
let mouthOpening = true;

// --- LEVEL DATA ---
// Placeholder: add your 30 levels here later
const levels = {
  easy: [
    // Level 1
    [
      [1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,1,1,0,0,1],
      [1,0,0,0,1,0,1,1],
      [1,1,1,0,1,0,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,1,1,1,0,1],
      [1,1,1,1,1,1,1,1]
    ],
    // Level 2
    [
      [1,1,1,1,1,1,1,1],
      [1,0,0,1,0,0,0,1],
      [1,0,1,0,1,0,1,1],
      [1,0,0,0,0,0,0,1],
      [1,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,1,1,1,0,1],
      [1,1,1,1,1,1,1,1]
    ],
    // Level 3
    [
      [1,1,1,1,1,1,1,1],
      [1,0,0,0,1,0,0,1],
      [1,0,1,0,0,0,1,1],
      [1,0,0,0,1,0,0,1],
      [1,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,1,1,1,0,1],
      [1,1,1,1,1,1,1,1]
    ],
    // Level 4
    [
      [1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,1,1,1,0,1],
      [1,0,0,0,0,0,0,1],
      [1,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,1,1,1,0,1],
      [1,1,1,1,1,1,1,1]
    ],
    // Level 5
    [
      [1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,1,0,1,0,1],
      [1,0,0,0,0,0,0,1],
      [1,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,0,1,0,0,1],
      [1,1,1,1,1,1,1,1]
    ],
    // Level 6
    [
      [1,1,1,1,1,1,1,1],
      [1,0,0,0,1,0,0,1],
      [1,0,1,0,1,0,1,1],
      [1,0,0,0,0,0,0,1],
      [1,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,1,1,1,0,1],
      [1,1,1,1,1,1,1,1]
    ],
    // Level 7
    [
      [1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,1,1,0,1,1],
      [1,0,0,0,0,0,0,1],
      [1,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,0,1,0,0,1],
      [1,1,1,1,1,1,1,1]
    ],
    // Level 8
    [
      [1,1,1,1,1,1,1,1],
      [1,0,0,0,1,0,0,1],
      [1,0,1,0,0,0,1,1],
      [1,0,0,0,1,0,0,1],
      [1,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,1,1,1,0,1],
      [1,1,1,1,1,1,1,1]
    ],
    // Level 9
    [
      [1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,1,1,0,1,1],
      [1,0,0,0,0,0,0,1],
      [1,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,0,1,0,0,1],
      [1,1,1,1,1,1,1,1]
    ],
    // Level 10
    [
      [1,1,1,1,1,1,1,1],
      [1,0,0,0,1,0,0,1],
      [1,0,1,0,0,0,1,1],
      [1,0,0,0,1,0,0,1],
      [1,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,1,1,1,0,1],
      [1,1,1,1,1,1,1,1]
    ]
  ],
  medium: [
    // Level 1
    [
      [1,1,1,1,1,1,1,1],
      [1,0,0,1,0,0,0,1],
      [1,0,1,0,1,0,1,1],
      [1,0,0,0,0,0,0,1],
      [1,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,1,1,1,0,1],
      [1,1,1,1,1,1,1,1]
    ],
    // Level 2
    [
      [1,1,1,1,1,1,1,1],
      [1,0,1,0,0,1,0,1],
      [1,0,1,0,1,0,0,1],
      [1,0,0,0,1,0,1,1],
      [1,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,1,1,1,0,1],
      [1,1,1,1,1,1,1,1]
    ],
    // Level 3
    [
      [1,1,1,1,1,1,1,1],
      [1,0,0,0,1,0,0,1],
      [1,0,1,1,0,1,0,1],
      [1,0,0,0,0,0,0,1],
      [1,1,0,1,1,1,0,1],
      [1,0,0,1,0,0,0,1],
      [1,0,1,0,1,1,0,1],
      [1,1,1,1,1,1,1,1]
    ],
    // Level 4
    [
      [1,1,1,1,1,1,1,1],
      [1,0,1,0,0,0,0,1],
      [1,0,0,0,1,1,0,1],
      [1,0,1,0,0,0,0,1],
      [1,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,1,1,0,0,1],
      [1,1,1,1,1,1,1,1]
    ],
    // Level 5
    [
      [1,1,1,1,1,1,1,1],
      [1,0,0,0,1,0,0,1],
      [1,0,1,0,0,0,1,1],
      [1,0,0,0,1,0,0,1],
      [1,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,1,1,1,0,1],
      [1,1,1,1,1,1,1,1]
    ],
    // Level 6
    [
      [1,1,1,1,1,1,1,1],
      [1,0,1,0,0,0,0,1],
      [1,0,0,0,1,0,1,1],
      [1,0,1,0,0,0,0,1],
      [1,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,1,1,0,0,1],
      [1,1,1,1,1,1,1,1]
    ],
    // Level 7
    [
      [1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,1,1,0,1,1],
      [1,0,0,0,0,0,0,1],
      [1,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,0,1,0,0,1],
      [1,1,1,1,1,1,1,1]
    ],
    // Level 8
    [
      [1,1,1,1,1,1,1,1],
      [1,0,1,0,0,0,0,1],
      [1,0,0,0,1,0,1,1],
      [1,0,1,0,0,0,0,1],
      [1,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,1,1,0,0,1],
      [1,1,1,1,1,1,1,1]
    ],
    // Level 9
    [
      [1,1,1,1,1,1,1,1],
      [1,0,0,0,1,0,0,1],
      [1,0,1,0,0,0,1,1],
      [1,0,0,0,1,0,0,1],
      [1,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,1,1,1,0,1],
      [1,1,1,1,1,1,1,1]
    ],
    // Level 10
    [
      [1,1,1,1,1,1,1,1],
      [1,0,1,0,0,0,0,1],
      [1,0,0,0,1,0,1,1],
      [1,0,1,0,0,0,0,1],
      [1,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,1,1,0,0,1],
      [1,1,1,1,1,1,1,1]
    ]
  ],
  hard: [
    // Level 1
    [
      [1,1,1,1,1,1,1,1],
      [1,0,1,0,0,1,0,1],
      [1,0,1,0,1,0,1,1],
      [1,0,0,0,0,0,0,1],
      [1,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,1,1,1,0,1],
      [1,1,1,1,1,1,1,1]
    ],
    // Level 2
    [
      [1,1,1,1,1,1,1,1],
      [1,0,1,0,1,0,0,1],
      [1,0,0,0,1,0,1,1],
      [1,1,0,1,0,0,0,1],
      [1,0,0,0,1,1,0,1],
      [1,0,1,0,0,0,0,1],
      [1,0,0,1,1,0,0,1],
      [1,1,1,1,1,1,1,1]
    ],
    // Level 3
    [
      [1,1,1,1,1,1,1,1],
      [1,0,0,0,1,0,0,1],
      [1,0,1,1,0,1,0,1],
      [1,0,0,0,0,0,0,1],
      [1,1,0,1,1,1,0,1],
      [1,0,0,1,0,0,0,1],
      [1,0,1,0,1,1,0,1],
      [1,1,1,1,1,1,1,1]
    ],
    // Level 4
    [
      [1,1,1,1,1,1,1,1],
      [1,0,1,0,0,0,0,1],
      [1,0,0,0,1,1,0,1],
      [1,0,1,0,0,0,0,1],
      [1,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,1,1,0,0,1],
      [1,1,1,1,1,1,1,1]
    ],
    // Level 5
    [
      [1,1,1,1,1,1,1,1],
      [1,0,1,0,0,0,0,1],
      [1,0,0,0,1,0,1,1],
      [1,0,1,0,0,0,0,1],
      [1,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,1,1,0,0,1],
      [1,1,1,1,1,1,1,1]
    ],
    // Level 6
    [
      [1,1,1,1,1,1,1,1],
      [1,0,0,1,0,0,0,1],
      [1,0,1,0,1,0,1,1],
      [1,0,0,0,0,0,0,1],
      [1,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,1,1,1,0,1],
      [1,1,1,1,1,1,1,1]
    ],
    // Level 7
    [
      [1,1,1,1,1,1,1,1],
      [1,0,1,0,0,0,0,1],
      [1,0,0,0,1,0,1,1],
      [1,0,1,0,0,0,0,1],
      [1,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,1,1,0,0,1],
      [1,1,1,1,1,1,1,1]
    ],
    // Level 8
    [
      [1,1,1,1,1,1,1,1],
      [1,0,0,0,1,0,0,1],
      [1,0,1,1,0,1,0,1],
      [1,0,0,0,0,0,0,1],
      [1,1,0,1,1,1,0,1],
      [1,0,0,1,0,0,0,1],
      [1,0,1,0,1,1,0,1],
      [1,1,1,1,1,1,1,1]
    ],
    // Level 9
    [
      [1,1,1,1,1,1,1,1],
      [1,0,1,0,0,0,0,1],
      [1,0,0,0,1,1,0,1],
      [1,0,1,0,0,0,0,1],
      [1,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,1,1,0,0,1],
      [1,1,1,1,1,1,1,1]
    ],
    // Level 10
    [
      [1,1,1,1,1,1,1,1],
      [1,0,0,0,1,0,0,1],
      [1,0,1,0,0,0,1,1],
      [1,0,0,0,1,0,0,1],
      [1,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,1,1,1,0,1],
      [1,1,1,1,1,1,1,1]
    ]
  ]
};

// --- MENU FUNCTIONS ---
function startGame() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("difficultyMenu").style.display = "block";
}

function setDifficulty(level) {
  difficulty = level;
  currentLevel = 1;
  document.getElementById("difficultyMenu").style.display = "none";
  document.getElementById("gameCanvas").style.display = "block";
  initGame(level);
}

function openSettings() {
  alert("Settings menu coming soon!");
}

// --- GAME INIT ---
function initGame(level) {
  maze = levels[level][currentLevel-1]; // load maze later
  resetDots();
  score = 0;
  player = {x:1,y:1};
  setInterval(gameLoop, 300); // movement loop
  animateMouth();             // mouth animation loop
}

// --- DOTS ---
function resetDots() {
  dots = [];
  if (!maze) return;
  for (let y = 0; y < maze.length; y++) {
    dots[y] = [];
    for (let x = 0; x < maze[y].length; x++) {
      dots[y][x] = maze[y][x] === 0;
    }
  }
}

// --- DRAWING ---
function drawMaze() {
  if (!maze) return;
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      if (maze[y][x] === 1) {
        ctx.fillStyle = "blue";
        ctx.fillRect(x*50, y*50, 50, 50);
      }
    }
  }
}

function drawDots() {
  ctx.fillStyle = "white";
  for (let y = 0; y < dots.length; y++) {
    for (let x = 0; x < dots[y].length; x++) {
      if (dots[y][x]) {
        ctx.fillRect(x*50+22, y*50+22, 6, 6);
      }
    }
  }
}

function drawPlayer() {
  ctx.fillStyle = "yellow";
  const cx = player.x*50+25;
  const cy = player.y*50+25;
  const r = 20;
  let start, end;
  if (direction === "right") {
    start = mouthAngle;
    end   = 2*Math.PI - mouthAngle;
  } else if (direction === "left") {
    start = Math.PI + mouthAngle;
    end   = Math.PI - mouthAngle;
  } else if (direction === "up") {
    start = 1.5*Math.PI + mouthAngle;
    end   = 1.5*Math.PI - mouthAngle + 2*Math.PI;
  } else if (direction === "down") {
    start = 0.5*Math.PI + mouthAngle;
    end   = 0.5*Math.PI - mouthAngle + 2*Math.PI;
  }
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.arc(cx, cy, r, start, end, false);
  ctx.closePath();
  ctx.fill();
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 25);
  ctx.fillText("Level: " + currentLevel + "/" + maxLevels, 10, 50);
}

function render() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawMaze();
  drawDots();
  drawPlayer();
  drawScore();
}

// --- MOVEMENT ---
function movePlayer() {
  let newX = player.x;
  let newY = player.y;
  if (direction === "up") newY--;
  if (direction === "down") newY++;
  if (direction === "left") newX--;
  if (direction === "right") newX++;
  if (maze && maze[newY][newX] === 0) {
    player.x = newX;
    player.y = newY;
    if (dots[newY][newX]) {
      dots[newY][newX] = false;
      score++;
    }
  }
}

// --- INPUT ---
document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") direction = "up";
  if (e.key === "ArrowDown") direction = "down";
  if (e.key === "ArrowLeft") direction = "left";
  if (e.key === "ArrowRight") direction = "right";
});

// --- GAME LOOP ---
function gameLoop() {
  movePlayer();
  render();
  if (checkLevelComplete()) nextLevel();
}

// --- MOUTH ANIMATION ---
function animateMouth() {
  if (mouthOpening) {
    mouthAngle += 0.08;
    if (mouthAngle >= Math.PI/6) mouthOpening = false;
  } else {
    mouthAngle -= 0.08;
    if (mouthAngle <= 0) mouthOpening = true;
  }
  requestAnimationFrame(animateMouth);
}

// --- LEVEL PROGRESSION ---
function checkLevelComplete() {
  for (let y = 0; y < dots.length; y++) {
    for (let x = 0; x < dots[y].length; x++) {
      if (dots[y][x]) return false;
    }
  }
  return true;
}

function nextLevel() {
  if (currentLevel < maxLevels) {
    currentLevel++;
    maze = levels[difficulty][currentLevel-1];
    resetDots();
    player = {x:1,y:1};
    alert("Level " + currentLevel + "!");
  } else {
    alert("You finished all " + maxLevels + " levels!");
  }
}

// --- INITIAL DRAW ---
render();