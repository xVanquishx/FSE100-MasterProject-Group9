var w = 640;
var h = 400;
var shipHeight = h / 2;
var obstacles = [];


var img;

function preload() {
}

function setup() {
  createCanvas(w, h);
  img = loadImage("assets/spaceship.png");
  spaceship = new Spaceship;
  obstacles.push(new Obstacle());  
}

function draw() {
  background(255, 255, 128);
  /** A rectangle
  fill(200, 200, 0);
  noStroke();
  rect(20, 20, w - 40, h - 40);
  */
  // uses global variables for width and height

  //Ship Flying Logic
  /**if ((keyIsDown(32) || mouseIsPressed) && shipHeight > 2){
    shipHeight = shipHeight - 2;
  } else if (shipHeight < (h - h/10)) {
    shipHeight = shipHeight + 2;
  }
  image(img, (w) / 9, shipHeight);

  //Ship Resize Logic
  img.resize(w/6, h/10);
  */

  for (var i = obstacles.length-1; i >= 0; i--) {
    obstacles[i].show();
    obstacles[i].update();

    if (obstacles[i].hits(spaceship)) {
      console.log("HIT");
    }

    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
    }
  }

  if(keyIsDown(32)){
    spaceship.up();
  }
  spaceship.update();
  spaceship.show();

  if (frameCount % 75 == 0) {
    obstacles.push(new Obstacle());
  }
}

function keyIsDown(UP_ARROW) {
    spaceship.up();
    //console.log("SPACE");
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

