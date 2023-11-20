function mainmenu() {

let buttonWidth = 180;
let buttonHeight = 40;
let buttonSpacing = 20;
let cornerRadius = 10;
let games = ["Whack A Mole", "Type Racer", "Space Jumper"];
let levels = ["Easy", "Medium", "Hard"];
let startX; //Starting X position for the first button



this.setup = function () {
  textFont("monospace");
  startX = (width - (buttonWidth + buttonSpacing) * games.length) / 2 + 8; //Calculate the starting X position
}

this.draw = function() {
  background(0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(h/15);
  text("LET'S PLAY A GAME", w / 2, h / 8);

  displayButtons();

  
}

function displayButtons() {
  textSize(h/30);
  for (let i = 0; i < games.length; i++) {
    let x = startX + (buttonWidth + buttonSpacing) * i;

    //Display the game titles
    fill(255);
    text(games[i], x + buttonWidth / 2, h/4);

    //Level buttons
    for (let j = 0; j < levels.length; j++) {
      let y = h/2.625 + (buttonHeight + h/48) * j;
      fill(255);
      rect(x, y, buttonWidth, buttonHeight, cornerRadius); //Make it rounded corners
      fill(0);
      text(levels[j], x + buttonWidth / 2, y + buttonHeight / 2);
      fill(255);
      
    }
    if(i < games.length - 1){
    rect(x + buttonWidth + h/72, h/2.625 - h/6,  h/96, h/2.625 + (buttonHeight + h/48))
    }
  }
}

this.mousePressed = function() {
  for (let i = 0; i < games.length; i++) {
    let x = startX + (buttonWidth + buttonSpacing) * i;

    for (let j = 0; j < levels.length; j++) {
      let y = h/2.625 + (buttonHeight + h/48) * j;

      if (
        mouseX > x &&
        mouseX < x + buttonWidth &&
        mouseY > y &&
        mouseY < y + buttonHeight
      ) {
        launchGame(games[i], levels[j]);
      }
    }
  }
}

function launchGame(gameName, level) {
  
  if (gameName === "Whack A Mole") {
    if (level === "Easy") {
      mgr.showScene(spring);
    } else if (level === "Medium") {
      mgr.showScene(spring);
    } else if (level === "Hard") {
      mgr.showScene(spring);
    }
  } else if (gameName === "Type Racer") {
    mgr.showScene(typeracer);
  } else if (gameName === "Space Jumper") {
    if (level === "Easy") {
      difficulty = 1;
    } else if (level === "Medium") {
      difficulty= 2;
    } else if (level === "Hard") {
      difficulty = 3;
    }
    mgr.showScene(spacegame);
  }
}

window.onresize = function () {
  // assigns new values for width and height variables
  if (!w * 1.6 > h) {
    h = window.innerHeight;
    w = h * 1.6;
  } else {
    w = window.innerWidth;
    h = w / 1.6;
  }
  buttonWidth = h/2.625;
  buttonHeight = h/12;
  buttonSpacing = h/24;
  cornerRadius = h/48;
  startX = (width - (buttonWidth + buttonSpacing) * games.length) / 2 + 8;
  resizeCanvas(w, h);
};  
}
//Whackamole
function whackAMoleGame() {
  let level = difficulty + 1; //Difficulty
  let gridSize,
    moleSpeed,
    holes = [],
    currentMoleHole,
    lastWhackedTime,
    score,
    highScore = 0;
  let gameState = "start",
    prevLevel = level,
    startTime,
    gameDuration = 30000,
    moleVisible = [false, false],
    countdown;
  let moleHit = [false, false];
  let flashTimer = false;

  function setup() {
    createCanvas(640, 400);
    textSize(32);
    textFont("monospace");
    textAlign(CENTER, CENTER);
  }

  function draw() {
    background(0);
    switch (gameState) {
      case "start":
        fill(255);
        text("Whack-A-Mole\nClick to Start", width / 2, height / 2 - 50);
        displayInstructions();
        break;
      case "countdown":
        displayCountdown();
        break;
      case "playing":
        displayGame();
        break;
      case "end":
        displayEndScreen();
        break;
    }
  }

  function displayInstructions() {
    textSize(16);
    fill(255);
    let instructions =
      "\nInstructions:\nMoles appear on the holes.\nClick on the moles to whack them.\nYou gain a point for each mole whacked.\nTry to get the highest score before time runs out!";
    text(instructions, width / 2, height / 2 + 50);
    textSize(32);
  }

  function displayCountdown() {
    let currentTime = millis();
    let count = 3 - floor((currentTime - countdown) / 1000);
    if (count <= 0) {
      if (gameState !== "playing") {
        startGame();
        gameState = "playing";
        startTime = millis();
      }
      return;
    }
    fill(255);
    text(count.toString(), width / 2, height / 2);
  }

  function displayGame() {
    let timeRemaining = gameDuration - (millis() - startTime);
    if (timeRemaining <= 0) {
      gameState = "end";
      return;
    }

    holes.forEach((hole) => {
      fill(255);
      ellipse(hole.x, hole.y, 35, 35);
    });

    displayTimer(timeRemaining);

    for (let i = 0; i < 2; i++) {
      if (moleVisible[i]) {
        let moleHole = holes[currentMoleHole[i]];
        fill(255, 0, 0);
        ellipse(moleHole.x, moleHole.y, 35, 35);
      }

      if (millis() - lastWhackedTime[i] > 1000 / moleSpeed) {
        toggleMoleVisibility(i);
      }
    }
    displayScore();
  }

  function displayTimer(timeRemaining) {
    let seconds = floor(timeRemaining / 1000);
    let milliseconds = timeRemaining % 1000;
    let formattedTime = nf(seconds, 2) + "." + nf(milliseconds, 3, 0);

    textSize(20);
    if (timeRemaining <= 6000) {
      if (floor(millis() / 500) % 2 === 0) {
        fill(255, 0, 0);
      } else {
        fill(255);
      }
    } else {
      fill(255);
    }

    text(formattedTime, width - 100, 30);
  }

  function displayEndScreen() {
    fill(255);
    text(
      `Game Over\nYour score: ${score}\nHigh score: ${highScore}`,
      width / 2,
      height / 2 - 60
    );
    drawButton(width / 2 - 60, "Replay");
    drawButton(width / 2 - 200, "Home");
    if (level < 3) drawButton(width / 2 + 80, "Next");
  }

  function drawButton(x, label) {
    fill(0, 0, 0);
    rect(x, height / 2 + 20, 120, 40);
    fill(255);
    text(label, x + 60, height / 2 + 40);
  }

  function displayScore() {
    fill(255);
    text(`Score: ${score}`, 120, 30);
  }

  function toggleMoleVisibility(index) {
    moleVisible[index] = !moleVisible[index];
    lastWhackedTime[index] = millis();
    if (moleVisible[index]) {
      currentMoleHole[index] = floor(random(holes.length));
      moleHit[index] = false;
    }
  }

  function mouseClicked() {
    if (gameState === "start") {
      gameState = "countdown";
      countdown = millis();
    } else if (gameState === "playing") {
      checkWhack();
    } else if (gameState === "end") {
      handleEndScreenClick();
    }
  }

  function checkWhack() {
    for (let i = 0; i < 2; i++) {
      if (moleHit[i]) continue;
      let moleHole = holes[currentMoleHole[i]];
      if (
        moleVisible[i] &&
        dist(mouseX, mouseY, moleHole.x, moleHole.y) < 17.5
      ) {
        moleHit[i] = true;
        score++;
        if (score > highScore) highScore = score;
        moleVisible[i] = false;
        lastWhackedTime[i] = millis();
      }
    }
  }

  function handleEndScreenClick() {
    //Replay button is clicked
    if (
      mouseX > width / 2 - 60 &&
      mouseX < width / 2 + 60 &&
      mouseY > height / 2 + 20 &&
      mouseY < height / 2 + 60
    ) {
      startGame();
    }
    //Next button is clicked (only if level < 3)
    else if (
      level < 3 &&
      mouseX > width / 2 + 80 &&
      mouseX < width / 2 + 200 &&
      mouseY > height / 2 + 20 &&
      mouseY < height / 2 + 60
    ) {
      level++;
      startGame();
    }
    //Check if Home button is clicked
    else if (
      mouseX > width / 2 - 200 &&
      mouseX < width / 2 - 80 &&
      mouseY > height / 2 + 20 &&
      mouseY < height / 2 + 60
    ) {
      //Placeholder action for the Home button
      this.sceneManager.showScene(mainmenu);
    }
  }

  function startGame() {
    if (level !== prevLevel) {
      highScore = 0;
    }

    gridSize = 3 + level;
    moleSpeed = level === 3 ? 1.5 : level === 2 ? 1.25 : 1;
    score = 0;
    lastWhackedTime = [millis(), millis()];
    currentMoleHole = [
      floor(random(gridSize * gridSize)),
      floor(random(gridSize * gridSize)),
    ];
    holes = [];

    let holeSize = 35;
    let padding = 40;
    let gridWidth = gridSize * padding;
    let offsetX = (width - gridWidth) / 2 + padding / 2;
    let offsetY = (height - gridWidth) / 2 + padding / 2;

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        holes.push({
          x: offsetX + i * padding,
          y: offsetY + j * padding,
        });
      }
    }

    moleVisible = [false, false];
    moleHit = [false, false];
    countdown = millis();
    gameState = "countdown";
    prevLevel = level;
  }

  window.setup = setup;
  window.draw = draw;
  window.mouseClicked = mouseClicked;
}
