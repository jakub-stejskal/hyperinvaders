  var Game = function(view) {
    this.view = view || new View();
    this.view.game = this;
    this.view.display();

    this.sound = new Sound();

    this.entities = {
      players: [],
      enemies: [],
      projectiles: []
    };

    this.commander = null;

    this.level = "first";
    this.paused = false;
  };

  Game.prototype.start = function() {
    this.entities.players.push(new Player());
    this.entities.enemies = Levels.initializeEnemies(this.level);
    this.commander = new Commander(this.entities.enemies, this);

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

  Game.prototype.pause = function() {
    this.paused = true;
  };

  Game.prototype.unpause = function() {
    this.paused = false;
  };

  Game.prototype.update = function() {
    if (!this.paused) {
      this.checkGameEvents();
      this.commander.command();
      var game = this;
      this.forEachEntity(function () { this.update(game); });
    }
  };

  Game.prototype.forEachOf = function (list, fn) {
    for (var i = list.length - 1; i >= 0; i--) {
      if (list[i].destroyed) {
        this.sound.playExplosion(list[i].hostile);
        list.splice(i, 1);
      }
      else {
        fn.call(list[i]);
      }
    }
  };

  Game.prototype.forEachEntity = function (fn) {
    this.forEachOf(this.entities.players, fn);
    this.forEachOf(this.entities.enemies, fn);
    this.forEachOf(this.entities.projectiles, fn);
  };

  Game.prototype.onShot = function(projectile) {
    if (projectile) {
      if (!projectile.hostile) this.sound.playShot();
      this.entities.projectiles.push(projectile);
    }
  };

  Game.prototype.checkGameEvents = function() {
    if (this.entities.enemies.length === 0) {
      this.handleVictory();
    }
    if (this.entities.players.length === 0){
      this.handleDefeat();
    }
  };

  Game.prototype.handleVictory = function() {
    this.paused = true;
    this.sound.playVictory();
    console.log("Game won.");
  };

  Game.prototype.handleDefeat = function() {
    this.paused = true;
    this.sound.playDefeat();
    console.log("Game lost.");
  };
