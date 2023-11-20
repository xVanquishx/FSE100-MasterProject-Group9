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