/**
  Abstract game entity.
  Has position, speed, size and appearence.
 */
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
  this.hasChanged = false;
}

Entity.prototype.init = function(pubsub) {
  this.pubsub = pubsub;
  return this;
};

/**
  returns appearence according to drawing mode (chars, color)
  and entity state (ok, destroyed)
 */
Entity.prototype.getAppearence = function(mode, index) {
  switch (this.state) {
    case 'ok': return this[mode][(index || this.appearenceIndex) % (this[mode].length - 1)];
    case 'destroyed': return this[mode][this[mode].length - 1];
    default: return '';
  }
};

Entity.prototype.setAppearence = function(index) {
  this.prevAppearence = this.appearenceIndex;
  this.appearenceIndex = index;
  this.hasChanged = true;
};

/**
  Unique identification of entity
 */
Entity.prototype.getId = function() {
  var __next_objid=1;
  return function () {
      if (this.__obj_id===undefined)
        this.__obj_id= __next_objid++;
      return this.__obj_id;
  };
}();

Entity.prototype.moveLeft = function() {
  this.setPosition(this.x - this.horizontalStep, this.y);
};

Entity.prototype.moveRight = function() {
  this.setPosition(this.x + this.horizontalStep, this.y);
};

Entity.prototype.moveUp = function() {
  this.setPosition(this.x, this.y - this.verticalStep);
};

Entity.prototype.moveDown = function() {
  this.setPosition(this.x, this.y + this.verticalStep);
};

Entity.prototype.setPosition = function(x, y) {
  if (this.state == 'ok') {
    this.prevX = this.x;
    this.prevY = this.y;
    this.x = x;
    this.y = y;
    this.hasChanged = true;
  }
};

Entity.prototype.top = function() { return this.y; };
Entity.prototype.bottom = function() { return this.y + this.height; };
Entity.prototype.left = function() { return this.x; };
Entity.prototype.right = function() { return this.x + this.width; };

/**
  Decrements expiration of temporary states,
  changes states upon expiration
 */
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
        this.stateExpiration = 5; break;
      case 'disposing':
        this.state = 'disposed';
        this.stateExpiration = 5; break;
      case 'disposed':
        break;
    }
    this.hasChanged = true;
  }
};

Entity.prototype.destroy = function() {
  this.state = 'destroyed';
  this.stateExpiration = Constants.fps / 2;
  this.prevX = this.x;
  this.prevY = this.y;
  this.hasChanged = true;
};

Entity.prototype.isOutOfBounds = function() {
  return this.left() < 0 || this.right() > Constants.width ||
    this.top() < 0 || this.bottom() > Constants.height;
};
