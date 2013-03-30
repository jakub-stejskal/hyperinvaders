var Game = function(view) {
  this.view = view || new View();
  this.view.game = this;
  this.entities = {
    player: null,
    enemies: []
  };

  this.tempo = Constants.fps / 2;
  this.time = 0;
  this.beat = 0;
};

Game.prototype.start = function() {
  this.view.display();
  this.entities.player = new Player(); //TODO array of entities
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
    this.forEachEnemy("update", this.beat);
  }
  this.entities.player.update();
};

Game.prototype.forEachEnemy = function (fn, arg) {
  for (var i = this.entities.enemies.length - 1; i >= 0; i--) {
    this.entities.enemies[i][fn](arg);
  }
};

Game.prototype.forEachEntity = function (fn, arg) {
  this.entities.player[fn](arg);
  this.forEachEnemy(fn, arg);
};
