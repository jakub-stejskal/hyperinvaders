var Projectile = function(hostile, x, y) {
  this.hostile = hostile;
  this.width = 5;
  this.height = 5;
  this.verticalStep  = 5;

  this.x = x;
  this.y = hostile ? y + this.height : y;
  this.color = "orange";
};

Projectile.prototype = new Entity();

Projectile.prototype.update = function(game) {
  if (this.isOutOfBounds()) {
    this.destroy();
  }
  if (this.hostile) {
    this.moveDown();
  }
  else {
    this.moveUp();
  }
};
