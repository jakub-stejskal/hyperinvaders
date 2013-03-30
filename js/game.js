var Game = function(view) {
  this.view = view || new View();
  this.view.game = this;
  this.entities = {
    player: null,
    enemies: []
  };
};

Game.prototype.start = function(view) {
  this.view.display();
  this.entities.player = new Player(); //TODO array of entities
  this._onEachFrame(Game.prototype.run);
};

Game.prototype._onEachFrame = (function() {
  var requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

  if (requestAnimationFrame) {
    return function(cb) {
      var t = this;
      var _cb = function() { cb.call(t); requestAnimationFrame(_cb); };
      _cb();
    };
  } else {
    return function(cb) {
      setInterval(cb, 1000 / Constants.fps);
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
  this.forEachEntity("update");
};

Game.prototype.forEachEntity = function (fn, arg) {
  this.entities.player[fn](arg);

  for (var i = this.entities.enemies.length - 1; i >= 0; i--) {
    this.entities.enemies[i][fn](arg);
  }
};
