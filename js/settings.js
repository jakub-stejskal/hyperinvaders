function Settings(game, controller) {
  this.game = game;
  this.controller = controller;

  this.viewContainer = $("#play div");
  this.views = {
    svg: new SvgView(this.viewContainer, "chars"),
    canvas: new CanvasView(this.viewContainer, "chars")
  };

  this.controlInputs = {
    left: $("#setup input[name=left]"),
    right: $("#setup input[name=right]"),
    shoot: $("#setup input[name=shoot]")
  };
  this.drawMethodInputs = {
    svg: $("#setup input[name=drawMethod][value=svg]"),
    canvas: $("#setup input[name=drawMethod][value=canvas]")
  };
  this.saveButton = $("#setup input[name=save]");
  this.saveButton.prop('disabled', true);

  this.loadFromStorage();
  this.bind();
}

Settings.prototype.loadFromStorage = function() {
  if (localStorage.keybinding !== 'undefined') {
    this.keybinding = JSON.parse(localStorage.keybinding);
  }
  else {
    this.keybinding = Constants.defaultKeybinding;
  }

  if (localStorage.drawMethod !== 'undefined') {
    this.drawMethod = localStorage.drawMethod;
  }
  else {
    this.drawMethod = Constants.defaultDrawMethod;
  }
  console.log(this.drawMethod);
  this.drawMethodInputs[this.drawMethod].prop('disabled', true);

  for (var key in this.controlInputs) {
    var keyname = this.keyCodeMap[this.keybinding.player[key.toUpperCase()]];
    this.controlInputs[key].val(keyname);
  }
};

Settings.prototype.bind = function() {
  for (var key in this.controlInputs) {
    this.controlInputs[key].keydown(this.handleKeyInput.bind(this));
  }

  for (var method in this.drawMethodInputs) {
    this.drawMethodInputs[method].click(this.handleButtonClick.bind(this));
  }

  this.saveButton.click(function (event) {
    event.preventDefault();
    this.save();
  }.bind(this));
};

Settings.prototype.handleButtonClick = function (event) {
    for (var key in this.drawMethodInputs) {
      this.drawMethodInputs[key].prop('disabled', false);
    }
    this.drawMethodInputs[event.target.value].prop('disabled', true);
    this.drawMethod = event.target.value;

    if (!this.hasCollision()) {
      this.saveButton.prop('disabled', false);
      $("#setup #form-info").text("");
    }
  };

Settings.prototype.handleKeyInput = function (event) {
    event.preventDefault();
    event.target.value = this.keyCodeMap[event.which];
    this.keybinding.player[event.target.name.toUpperCase()] = event.which;
    if (this.hasCollision(event.which)) {
      this.saveButton.prop('disabled', true);
      $("#setup #form-info").text("duplicate assignments");
    }
    else {
      this.saveButton.prop('disabled', false);
      $("#setup #form-info").text("");
    }
    $(event.target).nextAll("input").first().focus();
  };

Settings.prototype.hasCollision = function(keyCode) {
  var codes = [];
  for (var code in this.keybinding.player) {
    if (codes.indexOf(this.keybinding.player[code]) == -1) {
      codes.push(this.keybinding.player[code]);
    }
    else {
      return true;
    }
  }
  console.log(codes);
  return false;
};

Settings.prototype.keyCodeMap = {
  8:"backspace", 9:"tab", 13:"return", 16:"shift", 17:"ctrl", 18:"alt", 19:"pausebreak", 20:"capslock", 27:"escape", 32:" ", 33:"pageup",
  34:"pagedown", 35:"end", 36:"home", 37:"left", 38:"up", 39:"right", 40:"down", 43:"+", 44:"printscreen", 45:"insert", 46:"delete",
  48:"0", 49:"1", 50:"2", 51:"3", 52:"4", 53:"5", 54:"6", 55:"7", 56:"8", 57:"9", 59:";",
  61:"=", 65:"a", 66:"b", 67:"c", 68:"d", 69:"e", 70:"f", 71:"g", 72:"h", 73:"i", 74:"j", 75:"k", 76:"l",
  77:"m", 78:"n", 79:"o", 80:"p", 81:"q", 82:"r", 83:"s", 84:"t", 85:"u", 86:"v", 87:"w", 88:"x", 89:"y", 90:"z",
  96:"0", 97:"1", 98:"2", 99:"3", 100:"4", 101:"5", 102:"6", 103:"7", 104:"8", 105:"9",
  106: "*", 107:"+", 109:"-", 110:".", 111: "/",
  112:"f1", 113:"f2", 114:"f3", 115:"f4", 116:"f5", 117:"f6", 118:"f7", 119:"f8", 120:"f9", 121:"f10", 122:"f11", 123:"f12",
  144:"numlock", 145:"scrolllock", 186:";", 187:"=", 188:",", 189:"-", 190:".", 191:"/", 192:"`", 219:"[", 220:"\\", 221:"]", 222:"'"
};

Settings.prototype.save = function() {
    this.apply();
    localStorage.keybinding = JSON.stringify(this.keybinding);
    localStorage.drawMethod = this.drawMethod;
     $("#setup #form-info").text("Saved");
     this.saveButton.prop('disabled', true);
  };

Settings.prototype.apply = function() {
  this.controller.keybinding = this.keybinding;
  if (this.game.view) this.game.view.hide();
  this.game.setView(this.views[this.drawMethod]);
};

