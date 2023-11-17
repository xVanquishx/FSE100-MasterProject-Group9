let gridSize, moleSpeed, holes = [], currentMoleHole, lastWhackedTime, score, highScore = 0;
let gameState, level, startTime, gameDuration = 30000, moleVisible = false;
let moleHit = [false, false];

function setup() {
    createCanvas(640, 400);
    textSize(32);
    textFont('monospace');
    textAlign(CENTER, CENTER);
}

function draw() {
    background(0);
    if (gameState) {
        displayScreen();
    }
}

function whackamole(startingLevel) {
    gameState = 'start';
    level = startingLevel; // Set the level directly
    startGame();
}

function displayScreen() {
  switch (gameState) {
    case 'start':
      fill(255);
      text('Whack-A-Mole\nClick to Start', width / 2, height / 2);
      break;

    case 'playing':
      displayGame();
      if (millis() - startTime > gameDuration) gameState = 'end';
      break;

    case 'end':
      fill(255);
      text(`Game Over\nYour score: ${score}\nHigh score: ${highScore}`, width / 2, height / 2 - 60);
      drawReplayButton();
      drawHomeButton();
      drawNextLevelButton();
      break;
  }
}

function drawReplayButton() {
  fill(0, 0, 0);
  rect(width / 2 - 60, height / 2 + 20, 120, 40);
  fill(255);
  text('Replay', width / 2, height / 2 + 40);
}

function drawHomeButton() {
  fill(0, 0, 0);
  rect(width / 2 - 200, height / 2 + 20, 120, 40);
  fill(255);
  text('Home', width / 2 - 140, height / 2 + 40);
}

function drawNextLevelButton() {
  // Only draw the button if the level is less than 3
  if (level < 3) {
    fill(0, 0, 0);
    rect(width / 2 + 80, height / 2 + 20, 120, 40);
    fill(255);
    text('Next', width / 2 + 140, height / 2 + 40);
  }
}

function displayGame() {
  holes.forEach(hole => {
    fill(255);
    ellipse(hole.x, hole.y, 35, 35); // Draw holes
  });

  for (let i = 0; i < 2; i++) { // Loop for two moles
    if (moleVisible[i]) {
      let moleHole = holes[currentMoleHole[i]];
      fill(255, 0, 0);
      ellipse(moleHole.x, moleHole.y, 35, 35); // Draw moles
    }

    // Toggle mole visibility based on moleSpeed
    if (millis() - lastWhackedTime[i] > (1000 / moleSpeed)) {
      moleVisible[i] = !moleVisible[i];
      lastWhackedTime[i] = millis();
      if (moleVisible[i]) {
        currentMoleHole[i] = floor(random(holes.length));
        moleHit[i] = false; // Reset the hit flag
      }
    }
  }

  fill(255);
  text(`Score: ${score}`, 120, 30); // Display score
}

function mouseClicked() {
  if (gameState === 'start') {
    startGame();
  } else if (gameState === 'playing' && moleVisible) {
    checkWhack();
  } else if (gameState === 'end') {
    if (mouseX > width / 2 - 60 && mouseX < width / 2 + 60 && mouseY > height / 2 + 20 && mouseY < height / 2 + 60) {
      startGame(); // Replay button
    } else if (mouseX > width / 2 - 200 && mouseX < width / 2 - 80 && mouseY > height / 2 + 20 && mouseY < height / 2 + 60) {
      // Home button functionality
    } else if (mouseX > width / 2 + 80 && mouseX < width / 2 + 200 && mouseY > height / 2 + 20 && mouseY < height / 2 + 60 && level != 3) {
      level++; // Increment level
      startGame(); // Next Level button
    }
  }
}

// Set the gridSize to a smaller value
function startGame() {
  if (level > 3) {
    level = 3; // Ensures level does not go above 3
  }

  gridSize = 3 + level; // Adjusted grid size

  switch (level) {
    case 1:
      moleSpeed = 1;
      break;
    case 2:
      moleSpeed = 1.25;
      break;
    case 3:
      moleSpeed = 1.5;
      break;
    default:
      moleSpeed = 1;
  }

  score = 0;
  lastWhackedTime = [millis(), millis()];
  currentMoleHole = [floor(random(gridSize * gridSize)), floor(random(gridSize * gridSize))];
  holes = [];

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      holes.push({
        x: width / 2 - gridSize * 20 + i * 40,
        y: height / 2 - gridSize * 20 + j * 40
      });
    }
  }

  gameState = 'playing';
  startTime = millis();
  moleVisible = [true, true];
  moleHit = [false, false];
}


function checkWhack() {
  for (let i = 0; i < 2; i++) {
    let moleHole = holes[currentMoleHole[i]];
    if (moleVisible[i] && !moleHit[i] && dist(mouseX, mouseY, moleHole.x, moleHole.y) < 17.5) {
      moleHit[i] = true;
      score++;
      if (score > highScore) highScore = score;
      moleVisible[i] = false;
      lastWhackedTime[i] = millis();
    }
  }
}

whackamole(1);
