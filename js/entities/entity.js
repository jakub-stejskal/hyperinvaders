var Entity = function() {
  this.x = 0;
  this.y = 0;
  this.horizontalStep = 1;
  this.verticalStep = 1;

  this.width = 1 * Constants.unit;
  this.height = 1 * Constants.unit;
  this.color = "black";
};

Entity.prototype.draw = function(view) {
  view.drawRect(this.x, this.y, this.width, this.height, this.color);
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

Entity.prototype.update = function() {
};
