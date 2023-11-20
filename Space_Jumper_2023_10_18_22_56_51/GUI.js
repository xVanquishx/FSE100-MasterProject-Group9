let buttonWidth = 180;
let buttonHeight = 40;
let buttonSpacing = 20;
let cornerRadius = 10;
let games = ["Whack A Mole", "Type Racer", "Space Jumper"];
let levels = ["Easy", "Medium", "Hard"];
let startX; //Starting X position for the first button


var difficulty = 0;
let gameScores = [];
gameScores[0] = [];
gameScores[1] = [];
gameScores[2] = [];
for(i = 0; i < 3; ++i){
  for(j = 0; j < 3; ++j){
    gameScores[i][j] = 0;
  }
}

let w = 640;
let h = 480;

var difficulty;
var score;

let mgr;

function setup() {
  createCanvas(w, h);
  textFont("monospace");
  startX = (width - (buttonWidth + buttonSpacing) * games.length) / 2 + 8; //Calculate the starting X position
  mgr = new SceneManager();
  mgr.wire();
  mgr.showScene(mainmenu);
}

function draw() {
  mgr.draw();
 
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
