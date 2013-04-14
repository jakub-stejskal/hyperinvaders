function Shooter(hostile) {
  this.hostile = hostile;
  this.cooldown = 0;
  this.shouldShoot = false;
}

Shooter.prototype = new Entity();

Shooter.prototype.update = function(game) {
  Entity.prototype.update.call(this, game);

  if (this.cooldown > 0) {
    this.cooldown--;
  }
  else {
    if (this.shouldShoot) {
      this.shoot();
      this.shouldShoot = false;
    }
  }
};

Shooter.prototype.shoot = function() {
  var x = this.x + this.width / 2;
  var y = this.hostile ? this.bottom() : this.top();
  this.cooldown = Constants.cooldown;
  this.pubsub.publish(Events.SHOT, new Projectile(this.hostile, x, y).init(this.pubsub));
};
