var Loader = {
  gameInstance: null,

  game: [
  "js/constants.js",
  "js/key.js",
  "js/entities/entity.js",
  "js/entities/shooter.js",
  "js/entities/player.js",
  "js/entities/enemy.js",
  "js/entities/projectile.js",
  "js/levels.js",
  "js/view.js",
  "js/game.js"
  ]
};

yepnope({
  load: Loader.game,
  complete: function () {
    Loader.gameInstance = new Game(new View());
    Loader.gameInstance.start();
  }
});
