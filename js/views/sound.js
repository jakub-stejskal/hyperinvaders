/**
  Handles sound playback
 */
function Sound() {
  this.playing = false;
}

/**
  Initiates playback and subscribe audible game events
 */
Sound.prototype.start = function(pubsub) {
  this.playing = true;
  MIDI.setVolume(0, 127);

  pubsub.subscribe(Events.BEAT, this.playBeat.bind(this));
  pubsub.subscribe(Events.EXPLOSION, this.playBeat.bind(this));
  pubsub.subscribe(Events.SHOT, this.playShot.bind(this));
  pubsub.subscribe(Events.VICTORY, this.playVictory.bind(this));
  pubsub.subscribe(Events.DEFEAT, this.playDefeat.bind(this));

  pubsub.subscribe(Events.INPUT.MUTE, function (isDown) {
    if (isDown) this.playing = !this.playing;
  }.bind(this));
};

Sound.prototype.playBeat = function(beat) {
  switch (beat) {
    case 1: this.playNote(24, 127, 0.1); break;
    case 2: this.playNote(23, 64, 0.1); break;
    case 3: this.playNote(22, 64, 0.1); break;
    case 4: this.playNote(21, 64, 0.1); break;
  }
};

Sound.prototype.playShot = function(projectile) {
  if (projectile.hostile === false)
    this.playNote(100, 127, 0.1);
};

Sound.prototype.playExplosion = function(hostile) {
  if (hostile === false)
    this.playNote(90, 127, 0.3);
};

Sound.prototype.playVictory = function() {
    this.playNote(50, 127, 1, 0);
    this.playNote(54, 127, 1, 0.1);
    this.playNote(57, 127, 1, 0.2);
    this.playNote(62, 127, 1, 0.3);
    this.playNote(66, 127, 1, 0.4);
};

Sound.prototype.playDefeat = function() {
  this.playNote(30, 127, 1);
  this.playNote(36, 127, 1);
  this.playNote(42, 127, 1);
};

Sound.prototype.playNote = function(note, velocity, time, delay) {
  delay = delay || 0;
  if (this.playing) {
    MIDI.noteOn(0, note, velocity, delay);
    MIDI.noteOff(0, note, time + delay);
  }
};
