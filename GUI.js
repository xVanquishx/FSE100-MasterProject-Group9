let buttonWidth = 180;
let buttonHeight = 40;
let buttonSpacing = 20;
let cornerRadius = 10;
let games = ["Whack A Mole", "Type Racer", "Space Jumper"];
let levels = ["Easy", "Medium", "Hard"];
let startX; //Starting X position for the first button

function setup() {
  createCanvas(640, 400);
  textFont("monospace");
  startX = (width - (buttonWidth + buttonSpacing) * games.length) / 2 + 8; //Calculate the starting X position
}

function draw() {
  background(0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("LET'S PLAY A GAME", width / 2, 60);

  displayButtons();
}

function displayButtons() {
  textSize(16);
  for (let i = 0; i < games.length; i++) {
    let x = startX + (buttonWidth + buttonSpacing) * i;

    //Display the game titles
    fill(255);
    text(games[i], x + buttonWidth / 2, 130);

    //Level buttons
    for (let j = 0; j < levels.length; j++) {
      let y = 160 + (buttonHeight + 10) * j;
      fill(255);
      rect(x, y, buttonWidth, buttonHeight, cornerRadius); //Make it rounded corners
      fill(0);
      text(levels[j], x + buttonWidth / 2, y + buttonHeight / 2);
    }
  }
}

function mousePressed() {
  for (let i = 0; i < games.length; i++) {
    let x = startX + (buttonWidth + buttonSpacing) * i;

    for (let j = 0; j < levels.length; j++) {
      let y = 140 + (buttonHeight + 10) * j;

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
      whackAMole(1);
    } else if (level === "Medium") {
      whackAMole(2);
    } else if (level === "Hard") {
      whackAMole(3);
    }
  } else if (gameName === "Type Racer") {
    //Type Racer
  } else if (gameName === "Space Jumper") {
    //Soace Jumper
  }
}
