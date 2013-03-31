var Enemy = function(x, y) {
  this.x = (x || 0) * Constants.unit;
  this.y = (y || 0) * Constants.unit;
  this.horizontalStep = 0.25 * Constants.unit;
  this.verticalStep = 1 * Constants.unit;

  this.color = "red";
  this.position = 1;
};

Enemy.prototype = new Shooter();

Enemy.prototype.update = function(beat) {
    if (Math.abs(this.position) == 17) {
    this.position = this.position / -17;
    this.moveDown();
  }

  if (this.position < 0) {
    this.moveLeft();
  }
  else {
    this.moveRight();
  }

  this.position = this.position + (this.position>0 ? 1: -1);
};
