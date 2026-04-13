const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let gameInterval = null;
let currentLevel = 1;
let maxLevels = 10;
let difficulty = "easy";
let maze = [];
let dots = [];
let player = { x: 1, y: 1 };
let direction = "right";
let score = 0;
let mouthAngle = 0;
let mouthOpening = true;
let ghost = {
  x: 10, // starting tile
  y: 10,
  color: "white",
  direction: "left"
};
let ghostCounter = 0;

const ghostSpeeds = {
  easy: 340,   // slower ghost
  medium: 320, // medium ghost
  hard: 300    // same as player
};
const gameOverMessages = [
  "Skill Issue!",
  "FAAAHHHH!",
  "Noob!",
  "Mission failed, well get em next time!",
];
const tileSize = 50;
const boardPadding = 100; // center 8x8 maze inside 600x600 canvas

// --- LEVEL DATA ---
// Placeholder: add your 30 levels here later
const levels = {
  easy: [
    // Level 1
    [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 1, 1],
      [1, 1, 1, 0, 1, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Level 2
    [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Level 3
    [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 1],
      [1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Level 4
    [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Level 5
    [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Level 6
    [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Level 7
    [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Level 8
    [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 1],
      [1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Level 9
    [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Level 10
    [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 1],
      [1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ]
  ],
  medium: [
    // Level 1
    [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Level 2
    [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 1, 1],
      [1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Level 3
    [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Level 4
    [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 1],
      [1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Level 5
    [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 1],
      [1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Level 6
    [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 1, 1],
      [1, 0, 1, 0, 0, 0, 0, 1],
      [1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Level 7
    [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Level 8
    [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 1, 1],
      [1, 0, 1, 0, 0, 0, 0, 1],
      [1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Level 9
    [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 1],
      [1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Level 10
    [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 1, 1],
      [1, 0, 1, 0, 0, 0, 0, 1],
      [1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ]
  ],
  hard: [
    // Level 1
    [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Level 2
    [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 0, 1, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 1, 1],
      [1, 1, 0, 1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 1, 1, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Level 3
    [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Level 4
    [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 1],
      [1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Level 5
    [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 1, 1],
      [1, 0, 1, 0, 0, 0, 0, 1],
      [1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Level 6
    [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Level 7
    [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 1, 1],
      [1, 0, 1, 0, 0, 0, 0, 1],
      [1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Level 8
    [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Level 9
    [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 1],
      [1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Level 10
    [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 1],
      [1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
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
  document.getElementById("levelSelect").style.display = "block";
}

function startLevel(levelNumber) {
  currentLevel = levelNumber;
  document.getElementById("levelSelect").style.display = "none";
  document.getElementById("gameCanvas").style.display = "block";
  initGame(difficulty);
  playMusic(); // start background music
}

function openSettings() {
  alert("Settings menu coming soon!");
}

// --- GAME INIT ---
function initGame(level) {
  ghostCounter = 0;
  if (gameInterval) clearInterval(gameInterval);
  maze = levels[level][currentLevel - 1];
  resetDots();
  score = 0;
  player = { x: 1, y: 1 };
  ghost = { x: maze[0].length - 2, y: maze.length - 2, color: "white", direction: "left" };

  gameInterval = setInterval(gameLoop, 300);
  animateMouth();
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
function getBoardOffset() {
  const boardWidth = maze[0].length * tileSize;
  const boardHeight = maze.length * tileSize;
  return {
    x: (canvas.width - boardWidth) / 2,
    y: (canvas.height - boardHeight) / 2
  };
}

function drawMaze() {
  if (!maze) return;
  const offset = getBoardOffset();
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      if (maze[y][x] === 1) {
        ctx.fillStyle = "blue";
        ctx.fillRect(offset.x + x * tileSize, offset.y + y * tileSize, tileSize, tileSize);
      }
    }
  }
}

function drawDots() {
  if (!dots) return;
  const offset = getBoardOffset();
  ctx.fillStyle = "white";
  for (let y = 0; y < dots.length; y++) {
    for (let x = 0; x < dots[y].length; x++) {
      if (dots[y][x]) {
        ctx.fillRect(offset.x + x * tileSize + 0.44 * tileSize,
          offset.y + y * tileSize + 0.44 * tileSize, 6, 6);
      }
    }
  }
}

function drawPlayer() {
  ctx.fillStyle = "yellow";
  const offset = getBoardOffset();
  const cx = offset.x + player.x * tileSize + tileSize / 2;
  const cy = offset.y + player.y * tileSize + tileSize / 2;
  const r = 20;
  let start, end;
  if (direction === "right") { start = mouthAngle; end = 2 * Math.PI - mouthAngle; }
  else if (direction === "left") { start = Math.PI + mouthAngle; end = Math.PI - mouthAngle; }
  else if (direction === "up") { start = 1.5 * Math.PI + mouthAngle; end = 1.5 * Math.PI - mouthAngle + 2 * Math.PI; }
  else if (direction === "down") { start = 0.5 * Math.PI + mouthAngle; end = 0.5 * Math.PI - mouthAngle + 2 * Math.PI; }

  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.arc(cx, cy, r, start, end, false);
  ctx.closePath();
  ctx.fill();
}

function drawGhost() {
  ctx.fillStyle = ghost.color;
  const offset = getBoardOffset();
  const cx = offset.x + ghost.x * tileSize + tileSize / 2;
  const cy = offset.y + ghost.y * tileSize + tileSize / 2;
  const r = 18;

  ctx.beginPath();
  ctx.arc(cx, cy, r, Math.PI, 2 * Math.PI); // head
  ctx.lineTo(cx + r, cy + r);
  ctx.lineTo(cx - r, cy + r);
  ctx.closePath();
  ctx.fill();
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "32px ByteBounce";
  ctx.textAlign = "left";
  ctx.fillText("Score: " + score, 5, 25);
  ctx.fillText("Level: " + currentLevel + "/" + maxLevels, 5, 50);
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMaze();
  drawDots();
  drawPlayer();
  drawGhost();
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

function moveGhost() {
  const path = findShortestPath(ghost, player);
  if (path && path.length > 1) {
    // path[0] is ghost’s current position, path[1] is the next step
    ghost.x = path[1].x;
    ghost.y = path[1].y;
  }
}

function findShortestPath(start, target) {
  const queue = [];
  const visited = new Set();
  const parent = {};

  queue.push({ x: start.x, y: start.y });
  visited.add(start.x + "," + start.y);

  while (queue.length > 0) {
    const current = queue.shift();

    if (current.x === target.x && current.y === target.y) {
      // reconstruct path
      const path = [];
      let node = current;
      while (node) {
        path.unshift(node);
        node = parent[node.x + "," + node.y];
      }
      return path;
    }

    const directions = [
      { x: 0, y: -1 }, // up
      { x: 0, y: 1 },  // down
      { x: -1, y: 0 }, // left
      { x: 1, y: 0 }   // right
    ];

    for (const d of directions) {
      const nx = current.x + d.x;
      const ny = current.y + d.y;
      if (maze[ny] && maze[ny][nx] === 0) {
        const key = nx + "," + ny;
        if (!visited.has(key)) {
          visited.add(key);
          parent[key] = current;
          queue.push({ x: nx, y: ny });
        }
      }
    }
  }
  return null; // no path found
}

function checkCollision() {
  if (player.x === ghost.x && player.y === ghost.y) {
    const randomMessage = gameOverMessages[Math.floor(Math.random() * gameOverMessages.length)];
    document.getElementById("completionMessage").innerText = randomMessage;

    document.getElementById("levelComplete").style.display = "block";
    document.getElementById("gameCanvas").style.display = "none";

    clearInterval(gameInterval);
    gameInterval = null;
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

  // ghost moves only when enough ticks have passed
  ghostCounter += 300; // player loop runs every 300ms
  if (ghostCounter >= ghostSpeeds[difficulty]) {
    moveGhost();
    ghostCounter = 0;
  }

  render();
  checkCollision();
  if (checkLevelComplete()) {
    showLevelComplete();
  }
}

// --- MOUTH ANIMATION ---
function animateMouth() {
  if (mouthOpening) {
    mouthAngle += 0.08;
    if (mouthAngle >= Math.PI / 6) mouthOpening = false;
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
  ghostCounter = 0;
  if (gameInterval) {
    clearInterval(gameInterval);
    gameInterval = null;
  }

  if (currentLevel < maxLevels) {
    currentLevel++;
    maze = levels[difficulty][currentLevel - 1];
    resetDots();
    score = 0;
    player = { x: 1, y: 1 };
    ghost = { x: maze[0].length - 2, y: maze.length - 2, color: "red", direction: "left" };

    document.getElementById("levelComplete").style.display = "none";
    document.getElementById("gameCanvas").style.display = "block";

    // restart loop
    gameInterval = setInterval(gameLoop, 300);
  } else {
    document.getElementById("completionMessage").innerText =
      "Congratulations! You have completed all levels on " + difficulty + " mode. Try other modes!";
    document.querySelector("#levelComplete .buttons button:nth-child(3)").style.display = "none"; // hide Next
  }
}

function showLevelComplete() {
  document.getElementById("gameCanvas").style.display = "none";
  document.getElementById("levelComplete").style.display = "block";

  if (currentLevel === maxLevels) {
    document.getElementById("completionMessage").innerText =
      "Congratulations! You have completed all levels on " + difficulty + " mode. Try other modes!";
    document.querySelector("#levelComplete .buttons button:nth-child(3)").style.display = "none";
  } else {
    document.getElementById("completionMessage").innerText = "Level Completed!";
    document.querySelector("#levelComplete .buttons button:nth-child(3)").style.display = "inline-block";
  }
}

function goToMenu() {
  if (gameInterval) {
    clearInterval(gameInterval);
    gameInterval = null;
  }
  stopMusic(); // stop background music
  document.getElementById("levelComplete").style.display = "none";
  document.getElementById("menu").style.display = "block";
}

function playMusic() {
  const music = document.getElementById("bgMusic");
  music.volume = 0.5; // adjust volume (0.0–1.0)
  music.play();
}

function stopMusic() {
  const music = document.getElementById("bgMusic");
  music.pause();
  music.currentTime = 0; // reset to start
}


function retryLevel() {
  ghostCounter = 0;
  if (gameInterval) {
    clearInterval(gameInterval);
    gameInterval = null;
  }

  // reset state for the same level
  maze = levels[difficulty][currentLevel - 1];
  resetDots();
  score = 0;
  player = { x: 1, y: 1 };
  ghost = { x: maze[0].length - 2, y: maze.length - 2, color: "white", direction: "left" };

  document.getElementById("levelComplete").style.display = "none";
  document.getElementById("gameCanvas").style.display = "block";

  // restart loop
  gameInterval = setInterval(gameLoop, 300);
}