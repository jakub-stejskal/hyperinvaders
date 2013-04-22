function Controller(pubsub) {
  this.pubsub = pubsub;
  this._pressed = {};
  this.keybinding = Constants.defaultKeybinding;

  var controller = this;
  $(window).keyup(function(event) { controller.onKeyup(event);});
  $(window).keydown(function(event) { controller.onKeydown(event);});
  $(window).keypress(function(event) { event.stopPropagation();});

  this.touchButtons = {
    left: $("#touchscreen button[name=left]"),
    right: $("#touchscreen button[name=right]"),
    shoot: $("#touchscreen button[name=shoot]")
  };

  for (var button in this.touchButtons) {
    this.touchButtons[button].on('mouseup mousedown touchstart touchend',controller.onButtonClick.bind(controller));
  }
}

Controller.prototype.isDown = function(keyCode) {
  return this._pressed[keyCode];
};

Controller.prototype.onKeydown = function(event) {
  if (!this.isDown(event.keyCode)) {
    this._pressed[event.keyCode] = true;
    var matched = this.onKeypress(event.keyCode, true);
    if (matched) event.preventDefault();
  }
};

Controller.prototype.onKeyup = function(event) {
  delete this._pressed[event.keyCode];
  var matched = this.onKeypress(event.keyCode, false);
  if (matched) event.preventDefault();
};

Controller.prototype.onKeypress = function(code, isDown) {
  switch (code) {
    case this.keybinding.player.LEFT: this.pubsub.publish(Events.INPUT.LEFT, isDown); break;
    case this.keybinding.player.RIGHT: this.pubsub.publish(Events.INPUT.RIGHT, isDown); break;
    case this.keybinding.player.SHOOT: this.pubsub.publish(Events.INPUT.SHOOT, isDown); break;
    case this.keybinding.MUTE: this.pubsub.publish(Events.INPUT.MUTE, isDown); break;
    case this.keybinding.PAUSE: this.pubsub.publish(Events.INPUT.PAUSE, isDown); break;
    case this.keybinding.RESET: this.pubsub.publish(Events.INPUT.RESET, isDown); break;
    default: return false;
  }
  return true;
};

Controller.prototype.onButtonClick = function(event) {
  var isDown = event.type == "mousedown" || event.type == "touchstart";
  this.pubsub.publish(Events.INPUT[event.target.name.toUpperCase()], isDown);
  event.preventDefault();
};
