var Loader = {
  game: [
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
  "js/game.js"
  ],

  sound: [
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
  load: Loader.game,
  complete: function () {
    var element = $("#gameboard")[0];
    Loader.pubsub = Pubsub.create();
    Loader.controller = new Controller(Loader.pubsub);
    Loader.sound = new Sound(Loader.pubsub);
    var view = new View(element, "chars");
    var game = new Game(Loader.pubsub, view);
  }
},
{
  load: Loader.sound,
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
