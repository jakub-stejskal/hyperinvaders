/**
  Space invasion commander - controls behavior of enemy entities (invaders)
 */
function Commander(invaders, game) {
  this.invaders = invaders;
  this.invasionSize = this.invaders.length;
  this.game = game;

  this.tempo = Constants.fps / 2;
  this.speed = 1;
  this.beatTime = 0;
  this.beat = 0;
  this.shootTime = 0;
  this.maneuver = "turnRight";
}

/**
  Handles publish-subscribe
 */
Commander.prototype.init = function(pubsub) {
  this.publishBeat = function (beat) {
    pubsub.publish(Events.BEAT, null, beat);
  };
  return this;
};

/**
  Command invaders to shoot (at constant rate)
  and move (with speed proportional to invaders count)
 */
Commander.prototype.command = function() {
  this.shootTime++;
  if (this.shootTime >= 2 * this.tempo) {
    this.shootTime = 0;
    this._commandShoot();
  }

  this.beatTime++;
  if (this.beatTime >= Math.ceil(this.tempo * this.speed)) {
    this.beatTime = 0;
    this.beat = (this.beat % 4) + 1;

    this.publishBeat(this.beat);
    this._commandMove();
  }

  if (this.beat == 1) {
    this.speed = this.invaders.length / this.invasionSize;
  }
};

/**
  Called from invaders, changes movement direction
  when boundary is reached
 */
Commander.prototype.changeManeuver = function() {
  switch (this.maneuver) {
    case "left": this.maneuver = "leftDescent"; break;
    case "right": this.maneuver = "rightDescent"; break;
  }
};

/**
  Commands each invader to move in direction corresponding
  to current maneuver and changes maneuver
 */
Commander.prototype._commandMove = function() {
  switch (this.maneuver) {
    case "turnLeft":
    case "left":
    this._forEachOf(this.invaders, "moveLeft");
    this.maneuver = "left";
    break;
    case "leftDescent":
    this._forEachOf(this.invaders, "moveDown");
    this.maneuver = "turnRight";
    break;
    case "turnRight":
    case "right":
    this._forEachOf(this.invaders, "moveRight");
    this.maneuver = "right";
    break;
    case "rightDescent":
    this._forEachOf(this.invaders, "moveDown");
    this.maneuver = "turnLeft";
    break;
  }
};

/**
  Randomly chooses one invader and commands it to shoot
 */
Commander.prototype._commandShoot = function() {
  var shooterIndex = Math.floor(Math.random() * this.invaders.length);
  this.invaders[shooterIndex].shouldShoot = true;
};

/**
  Helper function - calls fn(arg) on each element of list
 */
Commander.prototype._forEachOf = function (list, fn, arg) {
  for (var i = list.length - 1; i >= 0; i--) {
    list[i][fn](arg);
  }
};
