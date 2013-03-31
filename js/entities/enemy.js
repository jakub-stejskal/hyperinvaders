var Enemy = function(x, y) {
  this.x = (x || 0) * Constants.unit;
  this.y = (y || 0) * Constants.unit;
  this.horizontalStep = 0.25 * Constants.unit;
  this.verticalStep = 1 * Constants.unit;

  this.color = "red";
  this.position = 1;
  this.shouldShoot = false;
};

Enemy.prototype = new Shooter(true);

Enemy.prototype.update = function(game) {
  // TODO: cooldown is hackish - change Enemy update cycle and call super instead
  this.cooldown = 0;

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

  if (this.shouldShoot) {
    game.onShot(this.shoot());
    this.shouldShoot = false;
  }

  this.position = this.position + (this.position>0 ? 1: -1);
};
