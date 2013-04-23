/**
  Dynamically loads sound library resources and starts playback
 */
Modernizr.load([{
  load: [
  "components/midijs/js/MIDI/AudioDetect.js",
  "components/midijs/js/MIDI/LoadPlugin.js",
  "components/midijs/js/MIDI/Plugin.js",
  "components/midijs/js/MIDI/Player.js",
  "components/midijs/js/Window/DOMLoader.XMLHttp.js",
  "components/midijs/js/Window/DOMLoader.script.js",
  "components/midijs/inc/WebMIDIAPI.js",
  "components/midijs/inc/Base64.js",
  "components/midijs/inc/base64binary.js"
  ],
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
