var View = function(element, width, height) {
	this.element = element || document.body;
	this.width = width || Constants.width;
	this.height = height ||Constants.height;
};

View.prototype.display = function() {
	this.canvas = document.createElement("canvas");
	this.canvas.width = this.width;
	this.canvas.height = this.height;

	this.context = this.canvas.getContext("2d");

	this.element.appendChild(this.canvas);
};

View.prototype.draw = function() {
	this.context.clearRect(0, 0, this.width, this.height);
	this.game.forEachEntity("draw",this);
};

View.prototype.drawRect = function(x, y, width, height, color) {
	this.context.fillStyle = color;
  this.context.fillRect(x, y, width, height);
};
