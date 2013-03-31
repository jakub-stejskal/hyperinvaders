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
    targets = game.entities.players;
    this.moveDown();
  }
  else {
    targets = game.entities.enemies;
    this.moveUp();
  }

  this.handleCollisionsWith(targets);
};

Projectile.prototype.handleCollisionsWith = function(targets) {
  for (var i = targets.length - 1; i >= 0; i--) {
    var target = targets[i];
    if (this.right() > target.left() && this.left() < target.right() &&
      this.top() < target.bottom() && this.bottom() > target.top()) {
      this.destroy();
      target.destroy();
    }
  }
};
