function spring() {
    let springImage;
  
    this.setup = function() { 
      springImage = loadImage("assets/spaceship.png");
    }
  
    this.draw = function() {
        background(0);
        fill(255);
      image(springImage,0,0);
      textAlign(CENTER, CENTER);
      textSize(h/15);
      text("Press any key to go to main menu", w / 2, h / 8);
    }
  
    this.keyPressed = function() {
      this.sceneManager.showScene(mainmenu);
    }
}