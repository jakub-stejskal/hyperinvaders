var Commander = function (invaders, game) {
  this.invaders = invaders;
  this.invasionSize = this.invaders.length;
  this.game = game;

  this.tempo = Constants.fps / 2;
  this.speed = 1;
  this.beatTime = 0;
  this.beat = 0;
  this.shootTime = 0;
  this.maneuver = "turnRight";
};

Commander.prototype.command = function() {
  this.shootTime++;
  if (this.shootTime >= 2 * this.tempo) {
    this.shootTime = 0;
    this.commandShoot();
  }

  this.beatTime++;
  if (this.beatTime >= Math.ceil(this.tempo * this.speed)) {
    this.beatTime = 0;
    this.beat = (this.beat % 4) + 1;

    this.game.sound.playBeat(this.beat);
    this.commandMove();
  }

  if (this.beat == 1) {
    this.speed = this.invaders.length / this.invasionSize;
  }
};

Commander.prototype.commandMove = function() {
  console.log(this.maneuver);
  switch (this.maneuver) {
    case "turnLeft":
    case "left":
    this.forEachOf(this.invaders, "moveLeft");
    this.maneuver = "left";
    break;
    case "leftDescent":
    this.forEachOf(this.invaders, "moveDown");
    this.maneuver = "turnRight";
    break;
    case "turnRight":
    case "right":
    this.forEachOf(this.invaders, "moveRight");
    this.maneuver = "right";
    break;
    case "rightDescent":
    this.forEachOf(this.invaders, "moveDown");
    this.maneuver = "turnLeft";
    break;
  }
};

Commander.prototype.commandShoot = function() {
  var shooter = this.invaders[Math.floor(Math.random() * this.invaders.length)];
  shooter.shouldShoot = true;
};

Commander.prototype.changeManeuver = function() {
  switch (this.maneuver) {
    case "left": this.maneuver = "leftDescent"; break;
    case "right": this.maneuver = "rightDescent"; break;
  }
};

Commander.prototype.forEachOf = function (list, fn, arg) {
  for (var i = list.length - 1; i >= 0; i--) {
    list[i][fn](arg);
  }
};
