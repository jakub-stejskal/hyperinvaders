var Shooter = function(hostile) {
  this.hostile = hostile;
  this.cooldown = 0;
};

Shooter.prototype = new Entity();

Shooter.prototype.update = function(game) {
  if (this.cooldown > 0) this.cooldown--;
};

Shooter.prototype.shoot = function() {
  if (!this.cooldown) {
    var x = this.x + this.width / 2;
    var y = this.hostile ? this.y + this.height : this.y;
    this.cooldown = Constants.cooldown;
    return new Projectile(this.hostile, x, y);
  }
};
