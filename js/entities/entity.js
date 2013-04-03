var Entity = function() {
  this.x = 0;
  this.y = 0;
  this.horizontalStep = 1;
  this.verticalStep = 1;

  this.width = 0.8 * Constants.unit;
  this.height = 0.8 * Constants.unit;
  this.color = "black";
  this.destroyed = false;
};

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
};

Entity.prototype.destroy = function() {
  this.destroyed = true;
};

Entity.prototype.isOutOfBounds = function() {
  return this.left() < 0 || this.right() > Constants.width ||
    this.top() < 0 || this.bottom() > Constants.height;
};
