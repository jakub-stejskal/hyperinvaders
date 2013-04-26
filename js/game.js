function Game(pubsub) {
  this.pubsub = pubsub;
  this.level = "first";
  this.playing = false;
  this.paused = true;

  this.pubsub.subscribe(Events.SHOT, function (ctx, projectile) {
    this.entities.projectiles.push(projectile);
  }.bind(this));
  this.pubsub.subscribe(Events.PLAY, function (ctx, play) {
    if (play && !this.playing) {
      this.start();
      window.location.hash = "play";
    }
    else {
      this.paused = !play;
    }
    }.bind(this));
  this.pubsub.subscribe(Events.INPUT.RESET, function (ctx, isDown) {
    if (isDown) this.start();
    window.location.hash = "play";
  }.bind(this));
}

Game.prototype.setView = function(view) {
  this.view = view;
  this.view.game = this;
  this.view.display();
  this.view.writeText(Texts.START);
};

Game.prototype.start = function() {
  this.entities = {
    players: [],
    enemies: [],
    projectiles: []
  };

  this.entities.players.push(new Player().init(this.pubsub));
  this.entities.enemies = Levels.initializeEnemies(this.level, this.pubsub);
  this.commander = new Commander(this.entities.enemies, this).init(this.pubsub);
  this.view.reset();

  this.paused = false;
  this.playing = true;

  this._onEachFrame(Game.prototype.run);
};

Game.prototype._onEachFrame = (function() {
  var requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

  if (requestAnimationFrame) {
    return function(callback) {
      var caller = this;
      var _cb = function() { callback.call(caller); requestAnimationFrame(_cb); };
      _cb();
    };
  } else {
    return function(callback) {
      setInterval(callback.bind(this), 1000 / Constants.fps);
    };
  }
})();

Game.prototype.run = (function() {
  var loops = 0,
  skipTicks = 1000 / Constants.fps,
  nextGameTick;

  return function() {
    loops = 0;
    while ((new Date()).getTime() > (nextGameTick = nextGameTick || (new Date()).getTime())) {
      this.update();
      nextGameTick += skipTicks;
      loops++;
    }

    if (loops && !this.paused) this.view.draw();
  };
})();

Game.prototype.update = function() {
  if (!this.paused) {
    this.checkGameEvents();
    this.commander.command();
    var game = this;
    this.forEachEntity(function () { this.update(game); });
  }
};

Game.prototype.forEachOf = function (list, fn) {
  for (var i = 0; i < list.length; i++) {
    if (list[i].state == 'disposed') {
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
  this.playing = false;
  this.view.writeText(Texts.VICTORY);
  this.pubsub.publish(Events.VICTORY, null);
};

Game.prototype.handleDefeat = function() {
  this.paused = true;
  this.playing = false;
  this.view.writeText(Texts.DEFEAT);
  this.pubsub.publish(Events.DEFEAT, null);
};
