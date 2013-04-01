var Enemy = function(x, y) {
  this.x = (x || 0) * Constants.unit;
  this.y = (y || 0) * Constants.unit;
  this.horizontalStep = 0.25 * Constants.unit;
  this.verticalStep = 0.25 * Constants.unit;

  this.color = "red";
  this.shouldShoot = false;
};

Enemy.prototype = new Shooter(true);

Enemy.prototype.update = function(game) {
  // TODO: cooldown is hackish - change Enemy update cycle and call super instead
  this.cooldown = 0;

  if (this.bottom() > Constants.bottomBoundary) {
    game.handleDefeat();
  }
  else if (this.left() < Constants.leftBoundary ||
    this.right() > Constants.rightBoundary) {
    game.changeManeuver();
  }

  if (this.shouldShoot) {
    game.onShot(this.shoot());
    this.shouldShoot = false;
  }
};
