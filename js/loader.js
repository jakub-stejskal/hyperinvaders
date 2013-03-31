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
  "js/sound.js",
  "js/game.js"
  ],

  sound: [
  "js/lib/midi/MIDI/AudioDetect.js",
  "js/lib/midi/MIDI/LoadPlugin.js",
  "js/lib/midi/MIDI/Plugin.js",
  "js/lib/midi/MIDI/Player.js",
  "js/lib/midi/Window/DOMLoader.XMLHttp.js",
  "js/lib/midi/Window/DOMLoader.script.js",
  "js/lib/inc/WebMIDIAPI.js",
  "js/lib/inc/Base64.js",
  "js/lib/inc/base64binary.js"
  ]
};

yepnope({
  load: Loader.game,
  complete: function () {
    Loader.gameInstance = new Game();
    Loader.gameInstance.start();
  }
});

yepnope({
  load: Loader.sound,
  complete: function () {
    MIDI.loadPlugin({
      soundfontUrl: "soundfont/",
      instrument: "acoustic_grand_piano",
      callback: function() {
        Loader.gameInstance.sound.setState("play");
      }
    });
  }
});
