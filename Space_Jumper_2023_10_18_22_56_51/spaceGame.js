import { difficulty } from "./storables";

function spacegame() {
  let obstacles = [];
  let score = 0;
  let highscore = 0;
  let spaceship;

  let img;
  let bg;
  let obstacleFrequency;


  this.setup = function() {
    img = loadImage("assets/spaceship.png");
    bg = loadImage('assets/SpaceBackground2.jpg');
    spaceship = new Spaceship;
    if(mainmenu.difficulty == 1){
      obstacleFrequency = 75;
    } else if (mainmenu.difficulty == 2){
      obstacleFrequency = 60;
    } else if (mainmenu.difficulty == 3){
      obstacleFrequency = 45;
    }
    obstacles.push(new Obstacle());
  }

  this.draw = function() {
    background(bg);

    for (var i = obstacles.length-1; i >= 0; i--) {
      obstacles[i].show();
      obstacles[i].update();

      if (obstacles[i].hits(spaceship)) {
        score = 0;
      }

      if (obstacles[i].offscreen()) {
        obstacles.splice(i, 1);
      }
    }

    if(keyIsDown(32) || keyIsDown(UP_ARROW) || mouseIsPressed === true){
     spaceship.up();
     
    }
    spaceship.update();
    spaceship.show();
    
    
    if (frameCount % 60 == 0) {
      obstacles.push(new Obstacle());
    }

    score++;
    text(`Score: ${score}`, width/100, height/200);
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
  resizeCanvas(w, h);
};