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
  "js/commander.js",
  "js/levels.js",
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

yepnope({
  load: Loader.game,
  complete: function () {
    var view = new View(undefined, undefined, undefined, "both");
    Loader.gameInstance = new Game(view);
    Loader.gameInstance.start();
  }
});

yepnope({
  load: Loader.sound,
  complete: function () {
    MIDI.loadPlugin({
      soundfontUrl: "components/midijs/soundfont/",
      instrument: "acoustic_grand_piano",
      callback: function() {
        Loader.gameInstance.sound.setState("play");
      }
    });
  }
});
