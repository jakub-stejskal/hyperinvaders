var Game = function(view) {
  this.view = view || new View();
  this.view.game = this;
  this.entities = {
    players: [],
    enemies: [],
    projectiles: []
  };

  this.tempo = Constants.fps / 2;
  this.time = 0;
  this.beat = 0;
};

Game.prototype.start = function() {
  this.view.display();
  this.entities.players.push(new Player());
  this.entities.enemies.push(new Enemy(1,1));
  this.entities.enemies.push(new Enemy(3,1));
  this._onEachFrame(Game.prototype.run);
};

Game.prototype._onEachFrame = (function() {
  var requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

  if (requestAnimationFrame) {
    return function(callback) {
      var caller = this;
      var _cb = function() { callback.call(caller); requestAnimationFrame(_cb); };
      _cb();
    };
  } else {
    return function(callback) {
      setInterval(callback, 1000 / Constants.fps);
    };
  }
})();

Game.prototype.run = (function() {
  var loops = 0,
  skipTicks = 1000 / Constants.fps,
  maxFrameSkip = 10,
  nextGameTick = (new Date()).getTime(),
  lastGameTick;

  return function() {
    loops = 0;
    while ((new Date()).getTime() > nextGameTick) {
      this.update();
      nextGameTick += skipTicks;
      loops++;
    }

    if (loops) this.view.draw();
  };
})();

Game.prototype.update = function() {
  this.time++;
  if (this.time == this.tempo) {
    this.time = 0;
    this.beat = (this.beat % 4) + 1;

    var shooter = this.entities.enemies[Math.floor(Math.random() * this.entities.enemies.length)];
    shooter.shouldShoot = true;
    this.forEachOf(this.entities.enemies, "update", this);
  }
  this.forEachOf(this.entities.players,"update", this);
  this.forEachOf(this.entities.projectiles,"update", this);
};

Game.prototype.forEachOf = function (list, fn, arg) {
  for (var i = list.length - 1; i >= 0; i--) {
    if (list[i].destroyed) {
      list.splice(i, 1);
    }
    else {
      list[i][fn](arg);
    }
  }
};

Game.prototype.forEachEntity = function (fn, arg) {
  this.forEachOf(this.entities.players, fn, arg);
  this.forEachOf(this.entities.enemies, fn, arg);
  this.forEachOf(this.entities.projectiles, fn, arg);
};

Game.prototype.onShot = function(projectile) {
  if (projectile) {
    this.entities.projectiles.push(projectile);
  }
};
