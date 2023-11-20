
function Obstacle() {
    if(mainmenu.difficulty == 1){
      this.spacing = height/2;
    } else if(mainmenu.difficulty == 2){
      this.spacing = height/3;
    } else if(mainmenu.difficulty == 3){
      this.spacing = height/4;
    }
    
    this.top = random(-height/10, 5 / 8 * height);
    this.bottom = height - (this.top + this.spacing);
    this.x = width;
    this.w = width/10;
    this.speed = width/96;
  
    this.highlight = false;
  
    this.hits = function(spaceship) {
      if (spaceship.y < this.top || spaceship.y > height - this.bottom) {
        if ((spaceship.x + width/80 > this.x && spaceship.x + width/80 < this.x + this.w) || (spaceship.x + width/10 > this.x && spaceship.x + width/10 < this.x + this.w)) {
          this.highlight = true;
          return true;
        }
      }
      this.highlight = false;
      return false;
    }
  
    this.show = function() {
      fill(255);
      if (this.highlight) {
        fill(255, 0, 0);
      }
      rect(this.x, 0, this.w, this.top);
      rect(this.x, height - this.bottom, this.w, this.bottom);
    }
  
    this.update = function() {
      this.x -= this.speed;
    }
  
    this.offscreen = function() {
      if (this.x < -this.w) {
        return true;
      } else {
        return false;
      }
    }
  
  
  }