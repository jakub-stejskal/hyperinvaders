var Player = function() {
  this.x = Constants.width / 2 - this.width;
  this.y = Constants.height - this.width - 10;

  this.color = "green";
};

Player.prototype = new Entity();

Player.prototype.update = function() {
  // if (Key.isDown(Key.UP)) this.moveUp();
  // if (Key.isDown(Key.DOWN)) this.moveDown();
  if (Key.isDown(Key.LEFT)) this.moveLeft();
  if (Key.isDown(Key.RIGHT)) this.moveRight();
};
