function Player() {
  this.horizontalStep = 2;

  this.color = ["#0F0", "#565"];
  this.chars = ["Q", "R"];

  this.x = Constants.width / 2 - this.width;
  this.y = Constants.height - this.height - 1 * Constants.unit;

  this.movingLeft = false;
  this.movingRight = false;
  this.shooting = false;
}

Player.prototype = new Shooter(false);

Player.prototype.init = function(pubsub) {
  Shooter.prototype.init.call(this, pubsub);

  this.pubsub.subscribe(Events.INPUT.SHOOT, function (isDown) {
    this.shooting = isDown;
  }.bind(this));
  this.pubsub.subscribe(Events.INPUT.LEFT, function (isDown) {
    this.movingLeft = isDown;
  }.bind(this));
  this.pubsub.subscribe(Events.INPUT.RIGHT, function (isDown) {
    this.movingRight = isDown;
  }.bind(this));

  return this;
};

Player.prototype.update = function(game) {
  Shooter.prototype.update.call(this, game);
  this.shouldShoot = this.shooting;
  if (this.movingLeft && this.left() > Constants.leftBoundary) this.moveLeft();
  if (this.movingRight && this.right() < Constants.rightBoundary) this.moveRight();
};
