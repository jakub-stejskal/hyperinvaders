var Loader = {
  gameDeps: [
  "components/pubsubjs/pubsub.js",

  "js/events.js",
  "js/constants.js",
  "js/texts.js",
  "js/key.js",
  "js/entities/entity.js",
  "js/entities/shooter.js",
  "js/entities/player.js",
  "js/entities/enemy.js",
  "js/entities/projectile.js",
  "js/commander.js",
  "js/levels.js",
  "js/controller.js",
  "js/view.js",
  "js/sound.js",
  "js/game.js",
  "js/settings.js"
  ],

  soundDeps: [
  "components/midijs/js/MIDI/AudioDetect.js",
  "components/midijs/js/MIDI/LoadPlugin.js",
  "components/midijs/js/MIDI/Plugin.js",
  "components/midijs/js/MIDI/Player.js",
  "components/midijs/js/Window/DOMLoader.XMLHttp.js",
  "components/midijs/js/Window/DOMLoader.script.js",
  "components/midijs/inc/WebMIDIAPI.js",
  "components/midijs/inc/Base64.js",
  "components/midijs/inc/base64binary.js"
  ]
};

yepnope([{
  load: Loader.gameDeps,
  complete: function () {
    var element = $("#gameboard");
    Loader.pubsub = Pubsub.create();
    Loader.sound = new Sound(Loader.pubsub);
    Loader.view = new View(element, "chars");
    Loader.game = new Game(Loader.pubsub, Loader.view);
    Loader.controller = new Controller(Loader.pubsub);
    Loader.settings = new Settings(Loader.game, Loader.controller);
    Loader.settings.apply();
  }
},
{
  load: Loader.soundDeps,
  complete: function () {
    MIDI.loadPlugin({
      soundfontUrl: "components/midijs/soundfont/",
      instrument: "acoustic_grand_piano",
      callback: function() {
        Loader.sound.start(Loader.pubsub);
      }
    });
  }
}]);
