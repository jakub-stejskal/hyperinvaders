var Player = function() {
  this.x = Constants.width / 2 - this.width;
  this.y = Constants.height - this.height - 10;

  this.color = "green";
};

Player.prototype = new Shooter(false);

Player.prototype.update = function(game) {
  Shooter.prototype.update.call(this, game);

  if (Key.isDown(Key.UP)) {
    game.onShot(this.shoot());
  }
  if (Key.isDown(Key.LEFT) && this.left() > 2 * Constants.unit) {
    this.moveLeft();
  }
  if (Key.isDown(Key.RIGHT) && this.right() < Constants.width - 2 * Constants.unit ) {
    this.moveRight();
  }
};
