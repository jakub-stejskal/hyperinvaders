function Controller(pubsub, keybinding, element) {
  this.pubsub = pubsub;
  element = element || window;
  this._pressed = {};
  this.keybinding = keybinding;

  var controller = this;
  element.addEventListener('keyup', function(event) { controller.onKeyup(event); }, false);
  element.addEventListener('keydown', function(event) { controller.onKeydown(event); }, false);
}

Controller.prototype.isDown = function(keyCode) {
  return this._pressed[keyCode];
};

Controller.prototype.onKeydown = function(event) {
  if (!this.isDown(event.keyCode)) {
    this._pressed[event.keyCode] = true;
    this.onKeypress(event.keyCode, true);
  }
};

Controller.prototype.onKeyup = function(event) {
  delete this._pressed[event.keyCode];
  this.onKeypress(event.keyCode, false);
};

Controller.prototype.onKeypress = function(code, isDown) {
  switch (code) {
    case this.keybinding.player.LEFT: this.pubsub.publish(Events.INPUT.LEFT, isDown); break;
    case this.keybinding.player.RIGHT: this.pubsub.publish(Events.INPUT.RIGHT, isDown); break;
    case this.keybinding.player.SHOOT: this.pubsub.publish(Events.INPUT.SHOOT, isDown); break;
    case this.keybinding.MUTE: this.pubsub.publish(Events.INPUT.MUTE, isDown); break;
    case this.keybinding.PAUSE: this.pubsub.publish(Events.INPUT.PAUSE, isDown); break;
    case this.keybinding.RESET: this.pubsub.publish(Events.INPUT.RESET, isDown); break;
  }
};



