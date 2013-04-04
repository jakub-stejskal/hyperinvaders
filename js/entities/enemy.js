var Enemy = function(x, y) {
  this.horizontalStep = 0.25 * Constants.unit;
  this.verticalStep = 0.25 * Constants.unit;

  this.color = ["#F00", "#900"];
  this.chars = ["A","G"];

  this.x = (x || 0) * 1.2 * Constants.unit;
  this.y = (y || 0) * Constants.unit;
  this.shouldShoot = false;
};

Enemy.prototype = new Shooter(true);

Enemy.prototype.update = function(game) {
  Shooter.prototype.update.call(this, game);

  if (this.bottom() > Constants.bottomBoundary) {
    game.handleDefeat();
  }
  else if (this.left() < Constants.leftBoundary ||
    this.right() > Constants.rightBoundary) {
    game.commander.changeManeuver();
  }

  if (this.shouldShoot) {
    game.onShot(this.shoot());
    this.shouldShoot = false;
  }
};
