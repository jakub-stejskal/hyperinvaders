  var Game = function(view) {
    this.view = view || new View();
    this.view.game = this;
    this.sound = new Sound();

    this.entities = {
      players: [],
      enemies: [],
      projectiles: []
    };

    this.tempo = Constants.fps / 2;
    this.time = 0;
    this.beat = 0;
    this.paused = false;
  };

  Game.prototype.start = function() {
    this.view.display();

    this.entities.players.push(new Player());
    this.entities.enemies = Levels.initializeEnemies("first");
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
    if (!this.paused) {
      this.checkGameEvents();

      this.time++;
      if (this.time == this.tempo) {
        this.time = 0;
        this.beat = (this.beat % 4) + 1;

        this.sound.playBeat(this.beat);
        this.enemyShoot();
        this.forEachOf(this.entities.enemies, "update", this);
      }
      this.forEachOf(this.entities.players,"update", this);
      this.forEachOf(this.entities.projectiles,"update", this);
    }
  };

  Game.prototype.enemyShoot = function() {
    if (this.beat % 2 == 1) {
      var shooter = this.entities.enemies[Math.floor(Math.random() * this.entities.enemies.length)];
      shooter.shouldShoot = true;
    }
  };

  Game.prototype.forEachOf = function (list, fn, arg) {
    for (var i = list.length - 1; i >= 0; i--) {
      if (list[i].destroyed) {
        this.sound.playExplosion(list[i].hostile);
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
      if (!projectile.hostile) this.sound.playShot();
      this.entities.projectiles.push(projectile);
    }
  };

  Game.prototype.checkGameEvents = function() {
    if (this.entities.enemies.length === 0) {
      this.paused = true;
      this.sound.playVictory();
      console.log("Game won.");
    }
    if (this.entities.players.length === 0){
      this.paused = true;
      this.sound.playDefeat();
      console.log("Game lost.");
    }
  };
