function spacegame() {
  
  let obstacles = [];
  let tscore = 0;
  let spaceship;

  let img;
  let bg;
  let obstacleFrequency;


  this.setup = function() {
    img = loadImage("./assets/spaceship.png");
    bg = loadImage('./assets/SpaceBackground2.jpg');
    spaceship = new Spaceship;
    if(difficulty == 1){
      obstacleFrequency = 75;
    } else if (difficulty == 2){
      obstacleFrequency = 60;
    } else if (difficulty == 3){
      obstacleFrequency = 45;
    }
  }

  this.draw = function() {
    background(bg);

    for (var i = obstacles.length-1; i >= 0; i--) {
      obstacles[i].show();
      obstacles[i].update();

      if (obstacles[i].hits(spaceship)) {
        score = tscore;
        tscore = 0;
        mgr.showScene(spacegameover);
        obstacles.splice(i, 1);
        obstacles[i].update();
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
    
    
    if (frameCount % obstacleFrequency == 0) {
      obstacles.push(new Obstacle());
    }

    tscore++;
    text(`Score: ${tscore}`, width - width/12, height/20);
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