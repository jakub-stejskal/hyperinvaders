function Enemy(x, y, type) {
  this.horizontalStep = 0.25 * Constants.unit;
  this.verticalStep = 0.25 * Constants.unit;

  switch (type) {
    case 1:
      this.color = ["#0F0", "#090","#999"];
      this.chars = ["C","B","S"]; break;
    case 2:
      this.color = ["#F00", "#900","#999"];
      this.chars = ["A","G","S"]; break;
    case 3:
      this.color = ["#00F", "#009","#999"];
      this.chars = ["L","K","S"]; break;
  }

  this.x = (x || 0) * 1.2 * Constants.unit;
  this.y = (y || 0) * Constants.unit;
}

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
