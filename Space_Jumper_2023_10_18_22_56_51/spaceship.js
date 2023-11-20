function Spaceship() {
  this.y = height/2;
  this.x = 64;

  this.gravity = 0.6*(height/480);
  this.lift = -1.2*(height/480) ;
  this.velocity = 0;

  var img = loadImage("assets/spaceship2.png");;

  this.show = function() {
    image(img, this.x, this.y);
    img.resize(width/7, height/8);
  }

  this.up = function() {
    this.velocity += this.lift;
    if(this.velocity > 0){
      this.velocity += this.lift*1.5;
    }
  }

  this.update = function() {
    this.velocity += this.gravity;
    // this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height - height/8) {
      this.y = height - height/8;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }

  }

}
