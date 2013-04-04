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
    var y = this.hostile ? this.bottom() : this.top();
    this.cooldown = Constants.cooldown;
    this.pubsub.publish(Events.SHOT, new Projectile(this.hostile, x, y).init(this.pubsub));
  }
};
