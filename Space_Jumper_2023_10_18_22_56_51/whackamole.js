function whackAMole() { 

let mole;
let score;
let speed;
let time;

this.preload = function() {
  mole = loadImage('moleimage.png');
}

this.setup = function(speed) {
  var lastScore = 0;
  var highScore = 0;
  createCanvas(640, 400);
  background(0);
  createHoles(200);
  playGame(speed);
  if (lastScore > highScore) {
    highscore = lastScore();
  }
  gameOver(lastScore, highScore);
}

this.createHoles = function(holeColor) {
  noStroke();
  fill(holeColor);
  ellipse(160, 100, 100, 100);
  ellipse(480, 100, 100, 100);
  ellipse(160, 300, 100, 100);
  ellipse(480, 300, 100, 100);
  ellipse(320, 100, 100, 100);
  ellipse(320, 300, 100, 100);
}

this.playGame = function(speed) {
  let currentMole = Math.floor(Math.random() * 6) + 1
  makeMole(currentMole);
}

this.makeMole = function(num) {
  var score;
  if (num <= 1) {
    image(mole, 122, 55, 80, 100); //mole 1
  } else if (num <= 2) {
    image(mole, 280, 55, 80, 100);
  } else if (num <= 3) {
    image(mole, 442, 55, 80, 100);
  } else if (num <= 4) {
    image(mole, 122, 255, 80, 100);
  } else if (num <= 5) {
    image(mole, 280, 255, 80, 100);
  } else {
    image(mole, 442, 255, 80, 100);
  }
}

this.gameOver = function(lastScore, highScore) {
  
}
}