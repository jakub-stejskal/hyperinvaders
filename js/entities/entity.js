function Entity() {
  this.width = 0.7 * Constants.unit;
  this.height = 0.6 * Constants.unit;
  this.horizontalStep = 1;
  this.verticalStep = 1;

  this.color = ["#FFF", "#999"];
  this.chars = ["@", "S"];
  this.appearenceIndex = 0;

  this.x = 0;
  this.y = 0;
  this.state = 'ok';
  this.stateExpiration = 0;
}

Entity.prototype.init = function(pubsub) {
  this.pubsub = pubsub;
  return this;
};

Entity.prototype.getAppearence = function(mode) {
  // console.log(mode, this.appearenceIndex, this[mode], this[mode] - 1, this[mode][this.appearenceIndex % (this[mode].length - 1]);
  switch (this.state) {
    case 'ok': return this[mode][this.appearenceIndex % (this[mode].length - 1)];
    case 'destroyed': return this[mode][this[mode].length - 1];
    default: return '';
  }
};

Entity.prototype.getId = function() {
  var __next_objid=1;
  return function () {
      if (this.__obj_id===undefined)
        this.__obj_id= __next_objid++;
      return this.__obj_id;
  };
}();

Entity.prototype.moveLeft = function() {
  this.x -= this.horizontalStep;
};

Entity.prototype.moveRight = function() {
  this.x += this.horizontalStep;
};

Entity.prototype.moveUp = function() {
  this.y -= this.verticalStep;
};

Entity.prototype.moveDown = function() {
  this.y += this.verticalStep;
};

Entity.prototype.top = function() { return this.y; };
Entity.prototype.bottom = function() { return this.y + this.height; };
Entity.prototype.left = function() { return this.x; };
Entity.prototype.right = function() { return this.x + this.width; };


Entity.prototype.update = function(game) {
  if (this.stateExpiration > 0) {
    this.stateExpiration--;
  }
  else {
    var oldState = this.state;
    switch (this.state) {
      case 'ok': break;
      case 'destroyed':
        this.state = 'disposing';
        // console.log("Update %o -> %o, %o", oldState, this.state, this);
        this.stateExpiration = Constants.fps; break;
      case 'disposing':
        this.state = 'disposed';
        // console.log("Update %o -> %o, %o", oldState, this.state, this);
        this.stateExpiration = Constants.fps; break;
      case 'disposed':
        // console.log("Update %o -> %o, %o", oldState, this.state, this);
        break;
    }
  }
};

Entity.prototype.destroy = function() {
  this.state = 'destroyed';
  this.stateExpiration = Constants.fps;
};

Entity.prototype.isOutOfBounds = function() {
  return this.left() < 0 || this.right() > Constants.width ||
    this.top() < 0 || this.bottom() > Constants.height;
};
