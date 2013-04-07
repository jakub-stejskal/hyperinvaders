var Enemy = function(x, y) {
  this.horizontalStep = 0.25 * Constants.unit;
  this.verticalStep = 0.25 * Constants.unit;

  this.color = ["#F00", "#900"];
  this.chars = ["A","G"];

  this.x = (x || 0) * 1.2 * Constants.unit;
  this.y = (y || 0) * Constants.unit;
};

Enemy.prototype = new Shooter(true);

Enemy.prototype.init = function(pubsub) {
  Shooter.prototype.init.call(this, pubsub);
  pubsub.subscribe(Events.BEAT, function(beat){
    this.appearenceIndex = beat;
  }.bind(this));
  return this;
};

Enemy.prototype.update = function(game) {
  Shooter.prototype.update.call(this, game);

  if (this.bottom() > Constants.bottomBoundary) {
    game.handleDefeat();
  }
  else if (this.left() < Constants.leftBoundary ||
    this.right() > Constants.rightBoundary) {
    game.commander.changeManeuver();
  }
};
