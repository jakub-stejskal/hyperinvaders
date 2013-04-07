var Player = function() {
  this.horizontalStep = 2;

  this.color = ["#0F0"];
  this.chars = ["Q"];

  this.x = Constants.width / 2 - this.width;
  this.y = Constants.height - this.height - 10;

  this.movingLeft = false;
  this.movingRight = false;
  this.shooting = false;
};

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
  if (this.shooting) {
    this.shouldShoot = true;
  }

  Shooter.prototype.update.call(this, game);

  if (this.movingLeft) this.moveLeft();
  if (this.movingRight) this.moveRight();
  // if (Key.isDown(Key.UP)) {
  //   this.shoot();
  // }
  // if (Key.isDown(Key.LEFT) && this.left() > Constants.leftBoundary) {
  //   this.moveLeft();
  // }
  // if (Key.isDown(Key.RIGHT) && this.right() < Constants.rightBoundary) {
  //   this.moveRight();
  // }
};
