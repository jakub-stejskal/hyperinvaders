function Settings(game, controller) {
  this.game = game;
  this.controller = controller;

  this.inputs = {
    left: $("#setup input[name=left]"),
    right: $("#setup input[name=right]"),
    shoot: $("#setup input[name=shoot]")
  };
  this.saveButton = $("#setup input[name=save]");
  this.saveButton.prop('disabled', true);

  this.loadFromStorage();
  this.bind();
}

Settings.prototype.loadFromStorage = function() {
  if (localStorage.keybinding !== undefined) {
    this.keybinding = JSON.parse(localStorage.keybinding);
  }
  else {
    this.keybinding = Constants.keybinding;
  }

  for (var key in this.inputs) {
    var keyname = this.keyCodeMap[this.keybinding.player[key.toUpperCase()]];
    this.inputs[key].val(keyname);
  }
};

Settings.prototype.bind = function() {

  var settings = this;
  var keyInputHandler = function (event) {
    event.preventDefault();
    event.target.value = settings.keyCodeMap[event.which];
    settings.keybinding.player[event.target.name.toUpperCase()] = event.which;
    if (settings.hasCollision(event.which)) {
      settings.saveButton.prop('disabled', true);
      $("#setup span").text("duplicate assignments");
    }
    else {
      settings.saveButton.prop('disabled', false);
      $("#setup span").text("");
    }
    $(this).nextAll("input").first().focus();
  };

  for (var key in this.inputs) {
    this.inputs[key].keydown(keyInputHandler);
  }

  this.saveButton.click(function (event) {
    event.preventDefault();
    this.save();
  }.bind(this));
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
     $("#setup span").text("Saved");
  };

Settings.prototype.apply = function() {
  this.controller.keybinding = this.keybinding;
};

