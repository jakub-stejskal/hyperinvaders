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

    this.level = "first";
    this.tempo = Constants.fps / 2;
    this.speed = 1;
    this.beatTime = 0;
    this.beat = 0;
    this.shootTime = 0;
    this.paused = false;
  };

  Game.prototype.start = function() {
    this.entities.players.push(new Player());
    this.entities.enemies = Levels.initializeEnemies(this.level);
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

      this.shootTime++;
      if (this.shootTime >= 2 * this.tempo) {
        this.shootTime = 0;
        this.enemyShoot();
      }

      this.beatTime++;
      if (this.beatTime >= Math.ceil(this.tempo * this.speed)) {
        this.beatTime = 0;
        this.beat = (this.beat % 4) + 1;

        this.sound.playBeat(this.beat);
        this.forEachOf(this.entities.enemies, "update", this);
      }
      this.forEachOf(this.entities.players,"update", this);
      this.forEachOf(this.entities.projectiles,"update", this);

      if (this.beat == 1) {
        this.speed = this.entities.enemies.length / Levels[this.level].enemyCount;
      }
    }
  };

  Game.prototype.enemyShoot = function() {
    var shooter = this.entities.enemies[Math.floor(Math.random() * this.entities.enemies.length)];
    shooter.shouldShoot = true;
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
