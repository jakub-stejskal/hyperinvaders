var Loader = {
  gameDeps: [
  "components/pubsubjs/pubsub.js",

  "js/events.js",
  "js/constants.js",
  "js/texts.js",
  "js/entities/entity.js",
  "js/entities/shooter.js",
  "js/entities/player.js",
  "js/entities/enemy.js",
  "js/entities/projectile.js",
  "js/commander.js",
  "js/levels.js",
  "js/controller.js",
  "js/canvasView.js",
  "js/svgView.js",
  "js/sound.js",
  "js/game.js",
  "js/settings.js"
  ]
};

yepnope([{
  load: Loader.gameDeps,
  complete: function () {
    Loader.pubsub = Pubsub.create();
    Loader.navigation = new Navigation(Loader.pubsub);
    Loader.sound = new Sound(Loader.pubsub);
    Loader.game = new Game(Loader.pubsub);
    Loader.controller = new Controller(Loader.pubsub);
    Loader.settings = new Settings(Loader.game, Loader.controller);
    Loader.settings.apply();
  }
}]);
