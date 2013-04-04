var Sound = function (pubsub) {
  this.state = "loading";
  this.playing = false;
  this.pubsub = pubsub;
};

Sound.prototype.setState = function(state) {
  if (state == "play") {
    this.start();
  }
  else if (state == "mute") {
    this.stop();
  }
};

Sound.prototype.start = function() {
  this.playing = true;
  MIDI.setVolume(0, 127);

  this.pubsub.subscribe(Events.BEAT, this.playBeat.bind(this));
  this.pubsub.subscribe(Events.EXPLOSION, this.playBeat.bind(this));
  this.pubsub.subscribe(Events.SHOT, this.playShot.bind(this));
};

Sound.prototype.stop = function() {
  this.playing = false;
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
    this.playNote(50, 127, 1);
    this.playNote(54, 127, 1);
    this.playNote(57, 127, 1);
    this.playNote(61, 127, 1);
};

Sound.prototype.playDefeat = function() {
  this.playNote(30, 127, 1);
  this.playNote(36, 127, 1);
  this.playNote(42, 127, 1);
};

Sound.prototype.playNote = function(note, velocity, time) {
  if (this.playing) {
    MIDI.noteOn(0, note, velocity, 0);
    MIDI.noteOff(0, note, time);
  }
};
