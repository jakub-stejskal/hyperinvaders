var Loader = {
  navDeps: [
  "components/pubsubjs/pubsub.js",
  "js/events.js",
  "js/navigation.js"
  ],

  gameDeps: [
  "js/constants.js",
  "js/texts.js",
  "js/levels.js",

  "js/entities/entity.js",
  "js/entities/shooter.js",
  "js/entities/player.js",
  "js/entities/enemy.js",
  "js/entities/projectile.js",

  "js/commander.js",
  "js/canvasView.js",
  "js/svgView.js",
  "js/sound.js",
  "js/game.js",
  "js/controller.js",
  "js/settings.js"
  ]
};

Modernizr.load([{
//   test: Modernizr.csstransforms3d,
//   yep: "screen.css",
//   complete: function () {
//     console.log("screen loaded");
//   }
// },
// {
  load: "components/jquery/jquery.js"
},
{
  load: Loader.navDeps,
  complete: function () {
    Loader.pubsub = Pubsub.create();
    Loader.navigation = new Navigation(Loader.pubsub);
  }
},
{
  test: Modernizr.canvas || Modernizr.inlinesvg,
  yep: Loader.gameDeps,
  callback: {
    "js/sound.js": function() { Loader.sound = new Sound(Loader.pubsub); },
    "js/game.js": function() { Loader.game = new Game(Loader.pubsub); },
    "js/controller.js": function() {
      $( document ).ready(function() {
        Loader.controller = new Controller(Loader.pubsub);
      });
    },
    "js/settings.js": function() {
      $( document ).ready(function() {
          Loader.settings = new Settings(Loader.game, Loader.controller);
          Loader.settings.apply();
        });
    }
  }
}]);
