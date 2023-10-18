var w = 640;
var h = 400;

var img;

function preload() {
}

function setup() {
  createCanvas(w, h);
  img = loadImage("assets/spaceship.png")
}

function draw() {
  background(255, 255, 128);
  // A rectangle
  fill(200, 200, 0);
  noStroke();
  rect(20, 20, w - 40, h - 40);
  // uses global variables for width and height
  
  imageMode(CENTER)
  image(img, width / 2, height / 2)
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
  resizeCanvas(w, h);
};
