let mole;
let score;
let speed;
let time;

function preload() {
  mole = loadImage('moleimage.png');
}

function setup(speed) {
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

function createHoles(holeColor) {
  noStroke();
  fill(holeColor);
  ellipse(160, 100, 100, 100);
  ellipse(480, 100, 100, 100);
  ellipse(160, 300, 100, 100);
  ellipse(480, 300, 100, 100);
  ellipse(320, 100, 100, 100);
  ellipse(320, 300, 100, 100);
}

function playGame(speed) {
  let currentMole = Math.floor(Math.random() * 6) + 1
  makeMole(currentMole);
}

function makeMole(num) {
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

function gameOver(lastScore, highScore) {
  
}