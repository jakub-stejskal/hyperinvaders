var View = function(element, width, height, drawMode) {
	this.element = element || document.body;
	this.width = width || Constants.width;
	this.height = height || Constants.height;
	this.drawFunction = this.createDrawFunction(drawMode || "squares");
};

View.prototype.display = function() {
	this.canvas = document.createElement("canvas");
	this.canvas.width = this.width;
	this.canvas.height = this.height;

	this.context = this.canvas.getContext("2d");

	this.element.appendChild(this.canvas);
};

View.prototype.createDrawFunction = function(drawMode) {
	var view = this;
	switch (drawMode) {
		case "squares":
			return function () {
				view.drawRect(this.x, this.y, this.width, this.height, this.color);
			};
	}
};

View.prototype.draw = function() {
	this.context.clearRect(0, 0, this.width, this.height);

	this.game.forEachEntity(this.drawFunction);
};

View.prototype.drawRect = function(x, y, width, height, color) {
	this.context.fillStyle = color;
  this.context.fillRect(x, y, width, height);
};
