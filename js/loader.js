/**
  Dynamically loads dependencies and initializes the application
 */
var Loader = {
  navDeps: [
  "components/pubsubjs/pubsub.js",
  "js/constants/events.js",
  "js/controllers/navigation.js"
  ],

  gameDeps: [
  "js/constants/constants.js",
  "js/constants/texts.js",
  "js/constants/levels.js",

  "js/entities/entity.js",
  "js/entities/shooter.js",
  "js/entities/player.js",
  "js/entities/enemy.js",
  "js/entities/projectile.js",

  "js/commander.js",
  "js/views/canvasView.js",
  "js/views/svgView.js",
  "js/views/sound.js",
  "js/game.js",
  "js/controllers/controller.js",
  "js/controllers/settings.js"
  ]
};

yepnope([
{
  test: Modernizr.csstransforms3d && !$('html').is('.-ms-'),
  yep: "screen.css"
},
{
  load: Loader.navDeps,
  callback: {
    "components/pubsubjs/pubsub.js": function () { Loader.pubsub = Pubsub.create(); },
    "js/controllers/navigation.js": function () { Loader.navigation = new Navigation(Loader.pubsub); }
  }
},
{
  test: Modernizr.canvas || Modernizr.inlinesvg,
  yep: Loader.gameDeps,
  callback: {
    "js/views/sound.js": function() { Loader.sound = new Sound(Loader.pubsub); },
    "js/game.js": function() { Loader.game = new Game(Loader.pubsub); },
    "js/controllers/controller.js": function() {
      $( document ).ready(function() {
        Loader.controller = new Controller(Loader.pubsub);
      });
    },
    "js/controllers/settings.js": function() {
      $( document ).ready(function() {
          Loader.settings = new Settings(Loader.game, Loader.controller);
        });
    }
  }
}]);
