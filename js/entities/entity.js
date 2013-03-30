var Entity = function() {
  this.x = 0;
  this.y = 0;
  this.step = 1;

  this.width = 32;
  this.height = 32;
  this.color = "black";
};

Entity.prototype.draw = function(view) {
  view.drawRect(this.x, this.y, this.width, this.height, this.color);
};

Entity.prototype.moveLeft = function() {
  this.x -= this.step;
};

Entity.prototype.moveRight = function() {
  this.x += this.step;
};

Entity.prototype.moveUp = function() {
  this.y -= this.step;
};

Entity.prototype.moveDown = function() {
  this.y += this.step;
};

Entity.prototype.update = function() {
};
