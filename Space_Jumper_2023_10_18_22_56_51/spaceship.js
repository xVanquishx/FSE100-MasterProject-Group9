function Spaceship() {
  this.y = height/2;
  this.x = 64;

  this.gravity = 0.7;
  this.lift = -1.5;
  this.velocity = 0;

  var img = loadImage("assets/spaceship.png");;

  this.show = function() {
    image(img, this.x, this.y);
    img.resize(width/7, height/12);
  }

  this.up = function() {
    this.velocity += this.lift;
  }

  this.update = function() {
    this.velocity += this.gravity;
    // this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }

  }

}
